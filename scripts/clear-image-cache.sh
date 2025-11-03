#!/bin/bash
# Clear image cache on Fly.io machines
# Usage: ./scripts/clear-image-cache.sh [machine-id]

set -e

APP_NAME="cheryo"
CACHE_PATH="/app/build/cache/images"

if [ -z "$1" ]; then
  echo "🚀 Clearing cache on all machines..."
  
  # Get all machine IDs
  MACHINES=$(flyctl machines list --app "$APP_NAME" --json | jq -r '.[].id')
  
  for MACHINE_ID in $MACHINES; do
    echo ""
    echo "📦 Clearing cache on machine: $MACHINE_ID"
    
    # SSH into machine and clear cache using -C flag to run command directly
    flyctl ssh console --app "$APP_NAME" --machine "$MACHINE_ID" -C "sh -c 'rm -rf /app/build/cache/images/* && echo \"✅ Cache cleared!\" && echo \"📊 Cache directory now contains:\" && find /app/build/cache/images -type f | wc -l | xargs echo \"  Files:\"'"
  done
  
  echo ""
  echo "✅ All caches cleared!"
else
  # Clear specific machine
  MACHINE_ID="$1"
  echo "📦 Clearing cache on machine: $MACHINE_ID"
  
  flyctl ssh console --app "$APP_NAME" --machine "$MACHINE_ID" -C "sh -c 'rm -rf /app/build/cache/images/* && echo \"✅ Cache cleared!\" && echo \"📊 Cache directory now contains:\" && find /app/build/cache/images -type f | wc -l | xargs echo \"  Files:\"'"
fi


#!/bin/bash
# Check image pre-generation logs on Fly.io machines
# Usage: ./scripts/check-pregen-logs.sh [machine_id]
#   If machine_id is provided, check that machine only
#   Otherwise, check all machines

set -e

APP_NAME="cheryo"
LOG_PATH="/tmp/image-pregen.log"

if [ -n "$1" ]; then
  # Check specific machine
  MACHINE_ID="$1"
  echo "📋 Checking pre-generation logs on machine: $MACHINE_ID"
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fly ssh console --app "$APP_NAME" --machine "$MACHINE_ID" --command "tail -100 $LOG_PATH" 2>/dev/null || echo "⚠️  Log file not found or empty"
else
  # Check all machines
  echo "🔍 Checking pre-generation logs on all machines..."
  echo ""
  
  # Get all machines (all should be app machines for this app)
  MACHINES=$(fly machines list --app "$APP_NAME" --json | jq -r '.[] | .id')
  
  for MACHINE_ID in $MACHINES; do
    MACHINE_NAME=$(fly machines list --app "$APP_NAME" --json | jq -r ".[] | select(.id == \"$MACHINE_ID\") | .name")
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "📦 Machine: $MACHINE_NAME ($MACHINE_ID)"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    fly ssh console --app "$APP_NAME" --machine "$MACHINE_ID" --command "tail -100 $LOG_PATH" 2>/dev/null || echo "⚠️  Log file not found or empty"
    echo ""
    echo ""
  done
fi


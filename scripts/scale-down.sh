#!/bin/bash
# Scale down Fly.io machines back to free tier
# Usage: ./scripts/scale-down.sh

set -e

APP_NAME="cheryo"

echo "📉 Scaling down machines to free tier (1 CPU, 1GB RAM)..."

# Scale back to free tier
fly scale vm shared-cpu-1x --app "$APP_NAME"

echo ""
echo "✅ Machines scaled down. Current resources:"
fly scale show --app "$APP_NAME"


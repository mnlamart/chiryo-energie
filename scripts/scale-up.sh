#!/bin/bash
# Temporarily scale up Fly.io machines for image generation
# Usage: ./scripts/scale-up.sh [duration_minutes]

set -e

APP_NAME="cheryo"
DURATION=${1:-30} # Default 30 minutes

echo "🚀 Scaling up machines for ${DURATION} minutes..."
echo "📈 Scaling to performance-4x (4 CPUs, 8GB RAM)..."

# Scale up
fly scale vm performance-4x --app "$APP_NAME"

echo ""
echo "⏰ Machines scaled up. They will automatically scale back down after you run:"
echo "   fly scale vm shared-cpu-1x --app $APP_NAME"
echo ""
echo "💡 Or wait ${DURATION} minutes and run: ./scripts/scale-down.sh"
echo ""
echo "✅ Current resources:"
fly scale show --app "$APP_NAME"


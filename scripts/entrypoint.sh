#!/bin/bash
# Entrypoint script that starts the server and pre-generates images in the background
# This runs on each machine on every deploy

set -e

echo "🚀 Starting application..."

# Start the server in the background
echo "📡 Starting server..."
npx tsx server.ts &
SERVER_PID=$!

# Wait for server to be ready (check health endpoint)
# Using /health is faster than checking the homepage as it doesn't require SSR
echo "⏳ Waiting for server to be ready..."
SERVER_READY=false
for i in {1..30}; do
  if curl -f http://localhost:3000/health 2>/dev/null || curl -f http://localhost:3000/ 2>/dev/null; then
    echo "✅ Server is ready!"
    SERVER_READY=true
    break
  fi
  sleep 1
done

if [ "$SERVER_READY" = false ]; then
  echo "⚠️  Server did not become ready within 30 seconds, starting pre-generation anyway..."
fi

# Run pre-generation in the background (non-blocking)
# This warms the cache for this machine's volume
echo "🖼️  Starting image pre-generation in background..."
echo "📝 Logs will be written to /tmp/image-pregen.log"
(node /app/scripts/pre-generate-all-images.mjs http://localhost:3000 > /tmp/image-pregen.log 2>&1 && echo "✅ Image pre-generation completed successfully" >> /tmp/image-pregen.log || echo "⚠️  Image pre-generation failed (check /tmp/image-pregen.log for details)" >> /tmp/image-pregen.log) &
PREGEN_PID=$!

# Wait for server process (main process)
wait $SERVER_PID
EXIT_CODE=$?

# Cleanup: kill pre-generation if server exits
kill $PREGEN_PID 2>/dev/null || true

exit $EXIT_CODE


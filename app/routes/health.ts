import type { LoaderFunctionArgs } from "react-router";

/**
 * Health check endpoint for monitoring and load balancer integration
 * Returns a simple JSON response indicating server status
 * 
 * This endpoint is used by:
 * - Fly.io health checks to determine machine readiness
 * - Entrypoint script to verify server startup
 * - Monitoring tools for uptime checks
 * 
 * Returns 200 OK with status information if server is healthy
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function loader(_args: LoaderFunctionArgs) {
  // Basic health check - server is responding
  // Can be extended to check:
  // - Database connectivity
  // - Cache availability
  // - Critical services
  
  const healthStatus = {
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  // Use compact JSON (no pretty printing) for faster response
  return new Response(JSON.stringify(healthStatus), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

import type { IncomingMessage, ServerResponse } from 'node:http';
import { type Plugin, type ViteDevServer } from 'vite';

/**
 * Custom Vite plugin that provides a mock Server-Sent Events (SSE) stream at `/api/sse` for live testing.
 */
export function ssePlugin(): Plugin {
  return {
    name: 'sse-plugin',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/sse', (req: IncomingMessage, res: ServerResponse) => {
        res.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Access-Control-Allow-Origin': '*',
        });

        res.write(
          `data: ${JSON.stringify({ event: 'connected', message: 'SSE Stream Active', timestamp: new Date().toISOString() })}\n\n`
        );

        const timer = setInterval(() => {
          const payload = JSON.stringify({
            event: 'ticker',
            timestamp: new Date().toISOString(),
            status: 'online',
          });
          res.write(`data: ${payload}\n\n`);
        }, 3000);

        req.on('close', () => {
          clearInterval(timer);
        });
      });
    },
  };
}

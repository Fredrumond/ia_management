import { buildApp } from './app';
import { FastifyAdapter } from './adapters/fastify/fastify.adapter';

const start = async () => {
  const httpServer = new FastifyAdapter();
  
  const app = buildApp(httpServer);
  const port = 3000;
  const host = '0.0.0.0';

  try {
    await app.listen(port, host);
    console.log(`Server running on http://localhost:${port}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

start();
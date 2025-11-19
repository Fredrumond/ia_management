import Fastify from 'fastify'
import healthRoute from './routes/health.route'
import userRoute from './routes/user.route'
import prisma from './lib/prisma'

export async function buildApp() {
  const app = Fastify({
    logger: true,
  })

app.register(healthRoute, { prefix: '/health' });
app.register(userRoute, { prefix: '/users', prisma });

  return app
}

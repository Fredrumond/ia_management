import Fastify from 'fastify'
import healthRoute from './routes/health.route'
import userRoute from './routes/user.route'

export async function buildApp() {
  const app = Fastify({
    logger: true,
  })

app.register(healthRoute, { prefix: '/health' });
app.register(userRoute, { prefix: '/users' });

  return app
}

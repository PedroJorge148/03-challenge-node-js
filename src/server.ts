import fastify from 'fastify'

const app = fastify()

app.get('/', (_,reply) => {
  return reply.send({ message: 'Hello World '})
})

app.listen({
  port: 3333,
}).then(() => {
  console.log('HTTP Server Running!')
})
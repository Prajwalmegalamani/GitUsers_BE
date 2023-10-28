const fastify = require('fastify')();

// Register the fastify-cors plugin
fastify.register(require('fastify-cors'), {
  origin: true, // You can set this to specific origins or 'true' to allow all origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type, Authorization',
  preflightContinue: false,
  optionsSuccessStatus: 204,
});

// Your routes and other application logic
fastify.get('/', (request, reply) => {
  reply.send({ hello: 'world' });
});

// Run the server
fastify.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});

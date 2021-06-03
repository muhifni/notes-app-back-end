// Membuat HTTP Server

// mengimport module hapi dan routes
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5500,
    // eslint-disable-next-line max-len
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.18.179',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

console.log(`Mode environment ${process.env.NODE_ENV}`);
init();

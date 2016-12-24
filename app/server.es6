import Hapi from 'hapi';
import Hoek from 'hoek';

import Database from './Database';
import endpoints from './endpoints';

const options = require('../config.json');

let server = new Hapi.Server();

let front = server.connection({
  port: process.env.PORT || '3000',
  host: '0.0.0.0',
  labels: 'front',
});

let back = server.connection({
  port: '3001',
  host: '0.0.0.0',
  labels: 'back'
});


front.route({
  path: '/',
  method: ['GET', 'POST'],
  handler: (request, reply) => {
    return reply(request.headers);
  }
});

server.register([
  {
    register: require('blipp')
  },
  {
    register: Database,
    options
  }, {
    register: endpoints,
    options
  }
], (err) => {
  Hoek.assert(!err, console.log(err));
  server.start((err) => {
    Hoek.assert(!err, console.log(err));
  });
});

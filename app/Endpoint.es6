'use strict';

import Joi from 'joi';

export default class Endpoint {
  constructor(config) {
    this._name = config.name;
    this._schema = config.schema;
  }

  register(server) {
    server.plugins.db.loki.addCollection(this._name);
    this.registerFind(server);
    this.registerGet(server);
    this.registerDelete(server);
    this.registerPost(server);
  }

  registerFind(server) {
    server.route({
      method: 'GET',
      path: `/${this._name}`,
      handler: (request, reply) => {
        let collection = server.plugins.db.loki.getCollection(this._name);
        return reply(collection.find(request.params));
      }
    });
  }

  registerGet(server) {
    server.route({
      method: 'GET',
      path: `/${this._name}/{id}`,
      config: {
        validate: {
          params: {
            id: Joi.string()
          }
        }
      },
      handler: (request, reply) => {
        let collection = server.plugins.db.loki.getCollection(this._name);
        return reply(collection.findOne({$id: request.params.id}));
      }
    });
  }

  registerPost(server) {
    server.route({
      method: 'POST',
      path: `/${this._name}`,
      handler: (request, reply) => {
        let collection = server.plugins.db.loki.getCollection(this._name);
        return reply(collection.insert(request.payload));
      }
    });
  }

  registerDelete(server) {
    server.route({
      method: 'DELETE',
      path: `/${this._name}/{id}`,
      handler: (request, reply) => {
        let collection = server.plugins.db.loki.getCollection(this._name);
        return reply(collection.findAndRemove({$id: request.params.id}));
      }
    })
  }
}

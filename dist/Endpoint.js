'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Endpoint = function () {
  function Endpoint(config) {
    _classCallCheck(this, Endpoint);

    this._name = config.name;
    this._schema = config.schema;
  }

  _createClass(Endpoint, [{
    key: 'register',
    value: function register(server) {
      server.plugins.db.loki.addCollection(this._name);
      this.registerFind(server);
      this.registerGet(server);
      this.registerDelete(server);
      this.registerPost(server);
    }
  }, {
    key: 'registerFind',
    value: function registerFind(server) {
      var _this = this;

      server.route({
        method: 'GET',
        path: '/' + this._name,
        handler: function handler(request, reply) {
          var collection = server.plugins.db.loki.getCollection(_this._name);
          return reply(collection.find(request.params));
        }
      });
    }
  }, {
    key: 'registerGet',
    value: function registerGet(server) {
      var _this2 = this;

      server.route({
        method: 'GET',
        path: '/' + this._name + '/{id}',
        config: {
          validate: {
            params: {
              id: Joi.string()
            }
          }
        },
        handler: function handler(request, reply) {
          var collection = server.plugins.db.loki.getCollection(_this2._name);
          return reply(collection.findOne({ $id: request.params.id }));
        }
      });
    }
  }, {
    key: 'registerPost',
    value: function registerPost(server) {
      var _this3 = this;

      server.route({
        method: 'POST',
        path: '/' + this._name,
        handler: function handler(request, reply) {
          var collection = server.plugins.db.loki.getCollection(_this3._name);
          return reply(collection.insert(request.payload));
        }
      });
    }
  }, {
    key: 'registerDelete',
    value: function registerDelete(server) {
      var _this4 = this;

      server.route({
        method: 'DELETE',
        path: '/' + this._name + '/{id}',
        handler: function handler(request, reply) {
          var collection = server.plugins.db.loki.getCollection(_this4._name);
          return reply(collection.findAndRemove({ $id: request.params.id }));
        }
      });
    }
  }]);

  return Endpoint;
}();

exports.default = Endpoint;
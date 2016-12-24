'use strict';

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _hoek = require('hoek');

var _hoek2 = _interopRequireDefault(_hoek);

var _Database = require('./Database');

var _Database2 = _interopRequireDefault(_Database);

var _endpoints = require('./endpoints');

var _endpoints2 = _interopRequireDefault(_endpoints);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var options = require('../config.json');

var server = new _hapi2.default.Server();

server.connection({
  port: 8000,
  host: 'localhost'
});

server.route({
  path: '/',
  method: ['GET', 'POST'],
  handler: function handler(request, reply) {
    return reply(request.headers);
  }
});

server.register([{
  register: require('blipp')
}, {
  register: _Database2.default,
  options: options
}, {
  register: _endpoints2.default,
  options: options
}], function (err) {
  _hoek2.default.assert(!err, console.log(err));
  server.start(function (err) {
    _hoek2.default.assert(!err, console.log(err));
  });
});
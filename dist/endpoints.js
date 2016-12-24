'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Endpoint = require('./Endpoint');

var _Endpoint2 = _interopRequireDefault(_Endpoint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var endpoints = {
  register: function register(server, options, next) {
    _fs2.default.readdir(_path2.default.join(__dirname, '../', options.entities_path), function (err, files) {
      files.forEach(function (file) {
        var endpoint = new _Endpoint2.default(require(_path2.default.join(__dirname, '../', options.entities_path, file)));
        endpoint.register(server);
      });

      return next();
    });
  }
};

endpoints.register.attributes = {
  name: 'endpoints'
};

exports.default = endpoints;
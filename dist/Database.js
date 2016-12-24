'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lokijs = require('lokijs');

var _lokijs2 = _interopRequireDefault(_lokijs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Database = {
  register: function register(server, options, next) {
    var loki = new _lokijs2.default(options.db_file);
    server.expose('loki', loki);
    return next();
  }
};

Database.register.attributes = {
  name: "db",
  version: "0.0.1"
};

exports.default = Database;
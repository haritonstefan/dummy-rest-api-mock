'use strict';

import fs from 'fs';
import path from 'path';

import Endpoint from './Endpoint';

const endpoints = {
  register: (server, options, next) => {
    fs.readdir(path.join(__dirname, '../', options.entities_path), (err, files) => {
      files.forEach(file => {
        let endpoint = new Endpoint(require(path.join(__dirname, '../', options.entities_path, file)));
        endpoint.register(server);
      });

      return next();
    });
  },
};

endpoints.register.attributes = {
  name: 'endpoints'
};

export default endpoints;

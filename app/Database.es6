'use strict';

import Loki from 'lokijs';

const Database = {
  register: (server, options, next) => {
    let loki = new Loki(options.db_file, {verbose: true, autosave: true, autosaveInterval: 36000, serializationMethod: 'pretty'});
    loki.loadDatabase(options.db_file);
    server.expose('loki', loki);
    return next();
  },
};

Database.register.attributes = {
  name: "db",
  version: "0.0.1"
};

export default Database;

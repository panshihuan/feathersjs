// Initializes the `ousideconnection-config` service on path `/ousideconnection-config`
const createService = require('feathers-nedb');
const createModel = require('../../models/ousideconnection-config.model');
const hooks = require('./ousideconnection-config.hooks');
const filters = require('./ousideconnection-config.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'ousideconnection-config',
    Model,
    paginate
  };

  const options2 = {
    name: 'ousideconnection-config',
    Model
  };


  // Initialize our service with any options it requires
  app.use('/ousideconnection-config', createService(options));


  app.use('/ousideconnection-config2', createService(options2));


  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ousideconnection-config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

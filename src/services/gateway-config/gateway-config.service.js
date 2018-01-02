// Initializes the `gateway-config` service on path `/gateway-config`
const createService = require('feathers-nedb');
const createModel = require('../../models/gateway-config.model');
const hooks = require('./gateway-config.hooks');
const filters = require('./gateway-config.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'gateway-config',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/gateway-config', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('gateway-config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

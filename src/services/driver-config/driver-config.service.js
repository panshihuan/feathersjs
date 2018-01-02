// Initializes the `driverConfig` service on path `/driver-config`
const createService = require('feathers-nedb');
const createModel = require('../../models/driver-config.model');
const hooks = require('./driver-config.hooks');
const filters = require('./driver-config.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);

  const options = {
    name: 'driver-config',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/driver-config', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('driver-config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `groupConfig` service on path `/group-config`
const createService = require('feathers-nedb');
const createModel = require('../../models/group-config.model');
const hooks = require('./group-config.hooks');
const filters = require('./group-config.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'group-config',
    Model
  };

  // Initialize our service with any options it requires
  app.use('/group-config', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('group-config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

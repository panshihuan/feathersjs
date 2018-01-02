// Initializes the `itemConfig` service on path `/item-config`
const createService = require('feathers-nedb');
const createModel = require('../../models/item-config.model');
const hooks = require('./item-config.hooks');
const filters = require('./item-config.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'item-config',
    Model,
  };

  // Initialize our service with any options it requires
  app.use('/item-config', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('item-config');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

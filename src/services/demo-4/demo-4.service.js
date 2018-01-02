// Initializes the `demo4` service on path `/demo-4`
const createService = require('feathers-nedb');
const createModel = require('../../models/demo-4.model');
const hooks = require('./demo-4.hooks');
const filters = require('./demo-4.filters');

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'demo-4',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/demo-4', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('demo-4');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `demo2` service on path `/demo-2`
const createService = require('./demo-2.class.js');
const hooks = require('./demo-2.hooks');
const filters = require('./demo-2.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'demo-2',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/demo-2', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('demo-2');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

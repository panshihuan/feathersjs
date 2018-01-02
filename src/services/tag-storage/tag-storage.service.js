// Initializes the `tagStorage` service on path `/tag-storage`
const createService = require('feathers-memory');
const hooks = require('./tag-storage.hooks');
const filters = require('./tag-storage.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'tag-storage',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/tag-storage', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tag-storage');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

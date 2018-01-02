// Initializes the `classes` service on path `/classes`
const createService = require('feathers-mongodb');
const hooks = require('./classes.hooks');
const filters = require('./classes.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/classes', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('classes');

  mongoClient.then(db => {
    service.Model = db.collection('classes');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

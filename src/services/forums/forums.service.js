// Initializes the `forums` service on path `/forums`
const createService = require('feathers-mongodb');
const hooks = require('./forums.hooks');
const filters = require('./forums.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/forums', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('forums');

  mongoClient.then(db => {
    service.Model = db.collection('forums');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

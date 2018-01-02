// Initializes the `schools` service on path `/schools`
const createService = require('feathers-mongodb');
const hooks = require('./schools.hooks');
const filters = require('./schools.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/schools', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('schools');

  mongoClient.then(db => {
    service.Model = db.collection('schools');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `getClass` service on path `/get-class`
const createService = require('feathers-mongodb');
const hooks = require('./get-class.hooks');
const filters = require('./get-class.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/get-class', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('get-class');

  mongoClient.then(db => {
    service.Model = db.collection('get-class');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

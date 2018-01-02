// Initializes the `ssaa` service on path `/ssaa`
const createService = require('feathers-mongodb');
const hooks = require('./ssaa.hooks');
const filters = require('./ssaa.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/ssaa', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('ssaa');

  mongoClient.then(db => {
    service.Model = db.collection('ssaa');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

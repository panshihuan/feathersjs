// Initializes the `forums-detai` service on path `/forums-detai`
const createService = require('feathers-mongodb');
const hooks = require('./forums-detai.hooks');
const filters = require('./forums-detai.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/forums-detai', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('forums-detai');

  mongoClient.then(db => {
    service.Model = db.collection('forums-detai');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `news` service on path `/news`
const createService = require('feathers-mongodb');
const hooks = require('./news.hooks');
const filters = require('./news.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/news', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('news');

  mongoClient.then(db => {
    service.Model = db.collection('news');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

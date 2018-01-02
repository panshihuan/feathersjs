// Initializes the `news-detail` service on path `/news-detail`
const createService = require('feathers-mongodb');
const hooks = require('./news-detail.hooks');
const filters = require('./news-detail.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');
  const mongoClient = app.get('mongoClient');
  const options = { paginate };

  // Initialize our service with any options it requires
  app.use('/news-detail', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('news-detail');

  mongoClient.then(db => {
    service.Model = db.collection('news-detail');
  });

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

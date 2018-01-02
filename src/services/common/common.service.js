// Initializes the `common` service on path `/common`
//枚举、固定配置信息
const createService = require('./common.class.js');
const hooks = require('./common.hooks');
const filters = require('./common.filters');


module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'common',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/common', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('common');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

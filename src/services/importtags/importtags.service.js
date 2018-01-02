// Initializes the `importtags` service on path `/importtags`
const createService = require('./importtags.class.js');
const hooks = require('./importtags.hooks');
const filters = require('./importtags.filters');

const multer = require('multer');
const multipartMiddleware = multer();



module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'importtags',
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/importtags',
    multipartMiddleware.single('uri'),
    function(req,res,next){
      req.feathers.file = req.file;
      next();
    },
    createService(options)
  );

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('importtags');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `demo` service on path `/demo`
const createService = require('feathers-nedb');
const createModel = require('../../models/demo.model');
const hooks = require('./demo.hooks');
const filters = require('./demo.filters');
//
// class MyService  {
//
//   constructor(props) {
//     this.find=function () {
//       console.log("ff")
//       return new Promise(function () {
//
//         return {"dd":"dd"}
//       })
//     }
//
//   }
//
// }

class MessageService {
  find(params) {
    console.log('11111:::',params)



    return Promise.resolve({
      read: false,
      text: `Feathers is great!`,
    });
  }
}

module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'demo',
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/demo', new MessageService());

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('demo');

  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

// Initializes the `tag` service on path `/tag`
const createService = require('feathers-nedb');
const createModel = require('../../models/tag.model');
const hooks = require('./tag.hooks');
const filters = require('./tag.filters');

// class myService {
//
//   find(params) {
//     console.log(params)
//     return Promise.resolve(
//       {
//         sex: 1
//       }
//     )
//   }
// }


module.exports = function () {
  const app = this;
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    name: 'tag',
    Model,
    paginate,
    events:['onXX']
  };

  // Initialize our service with any options it requires
  app.use('/tag', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('tag');

 // setInterval(()=>{  console.log("dd");  service.emit("onXX",{mm:1})},100)


  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  }
};

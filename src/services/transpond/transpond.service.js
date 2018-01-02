// Initializes the `Transpond` service on path `/transpond`
const createService = require('./transpond.class.js');
const hooks = require('./transpond.hooks');
const filters = require('./transpond.filters');

module.exports = function () {
  const app = this;
  const paginate = app.get('paginate');

  const options = {
    name: 'transpond',
    paginate,
    app: app
  };

  // Initialize our service with any options it requires
  app.use('/transpond', createService(options));

  // Get our initialized service so that we can register hooks and filters
  const service = app.service('transpond');

  // service.emit('onxxx',{xxx:1234});
  service.hooks(hooks);

  if (service.filter) {
    service.filter(filters);
  } // console.log(service.alarm)

  setInterval(() => {
    service.emit('onData', service.items);
  }, 20);
  //
  setInterval(() => {
    service.emit('onAlarm', service.alarm);
  }, 20);



   // setInterval(() => {
  //   service.emit('onItemsConfig', service.ItemsConfig);
  // }, 1000);


};

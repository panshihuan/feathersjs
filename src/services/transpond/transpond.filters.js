/* eslint no-console: 1 */
console.warn('You are using the default filter for the Transpond service. For more information about event filters see https://docs.feathersjs.com/api/events.html#event-filtering'); // eslint-disable-line no-console

module.exports = function (data, connection, hook) { // eslint-disable-line no-unused-vars

  if(hook&&hook.method&&hook.method=="update")  return false
  return data;
};

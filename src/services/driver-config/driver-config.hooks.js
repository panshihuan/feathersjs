const request = require("../../request")
const uuidv4 = require('uuid/v4');
const {setCreatedAt, populate} = require('feathers-hooks-common');
const search = require('feathers-nedb-fuzzy-search')
const driverGroupSchema = {
  include: {
    service: 'group-config',
    nameAs: 'group',
    asArray: true,
    parentField: '_id',
    childField: 'driverId'
  }
};

module.exports = {
  before: {
    all: [],
    find: [search()],
    get: [],
    create: [connectionServer(), setCreatedAt()],
    update: [],
    patch: [],
    remove: [removeServer(),removeGroup(),removeItem()]
  },

  after: {
    all: [],
    find: [populate({schema: driverGroupSchema})],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};


function connectionServer() {

  return function (hook) {
    let _id = uuidv4();

    return new Promise((resolve, reject) => {
      hook.data._id = _id;
      let ss = request(`${hook.app.get("daCollectorUrl")}/ConnectionServer`, {
        method: 'POST',
        body: JSON.stringify(hook.data)
      }).then((d) => {
        if (d.err) {
          reject(d.err)
        }
        if (d.data == true) {

          resolve(hook)
        }
        else {
          reject("error")
        }

      }, (e) => {
        reject(e)
      })


    })
  };
};


function removeServer() {
  return function (hook) {
    return new Promise((resolve, reject) => {
      let ss = request(`${hook.app.get("daCollectorUrl")}/removeServer`, {
        method: 'DELETE',
        body: JSON.stringify({_id: hook.id})
      }).then((d) => {
        if (d.err) {
          reject(d.err)
        }
        if (d.data == true) {

          resolve(hook)
        }
        else {
          return reject("error")
        }

      }, (e) => {
        reject(e)
      })
    })
  }
};


function removeGroup()
{
  return function (hook) {
    const id = hook.id;
    return hook.app.service('group-config').remove(null, { query: { driverId: id } }).then(function () {
      return hook;
    }).catch( function (err) {
      console.log(err);
    } )
  }
};

function removeItem()
{
  return function (hook) {
    const id = hook.id;
    return hook.app.service('item-config').remove(null, { query: { serverid: id } }).then(function () {
      return hook;
    }).catch( function (err) {
      console.log(err);
    } )
  }
};



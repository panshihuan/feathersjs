const {setCreatedAt, populate} = require('feathers-hooks-common');
const request = require("../../request");
const uuidv4 = require('uuid/v4');

const _ = require('lodash')
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [setCreatedAt(), addItem()],
    update: [],
    patch: [],
    remove: [delItem()]
  },

  after: {
    all: [],
    find: [findvalue()],
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


function addItem() {
  return function (hook) {

    if (hook.params.type == "import") {
      return hook
    }
    else {
      let _id = uuidv4();
      return new Promise((resolve, reject) => {
        hook.data._id = _id;
        let ss = request(`${hook.app.get("daCollectorUrl")}/createItem`, {
          method: 'POST',
          body: JSON.stringify(hook.data)
        }).then((d) => {
          if (d.err) {
            return reject(d.err)
          }
          if (d.data == true) {
            resolve(hook)
          }
          else {
            console.log(d.err)
            return reject(d.data)
          }
        }, (e) => {
          return reject(e)
        })
      })

    }
  }
};


function delItem() {
  return function (hook) {
    //如果hook.id 为 null 则代表批量删除，不去调用后端代码
    if (hook.id == null) {
      return hook;
    }
    else {
      return new Promise((resolve, reject) => {
        let ss = request(`${hook.app.get("daCollectorUrl")}/removeItem`, {
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
  }
};


function findvalue() {
  return function (hook) {
    var statusList = hook.app.service('transpond').items;

    // let arr1 = _.clone(hook.data)
    let arr1 = hook.result;
    mergeByProperty(arr1, statusList, '_id');
    hook.result = arr1;
    //console.log(arr1);
    return hook;
    // this.setState({"tableData": arr1})
  }
};


function mergeByProperty(arr1, arr2, prop) {
  _.each(arr2, function (arr2obj) {
    var arr1obj = _.find(arr1, function (arr1obj) {
      return arr1obj[prop] === arr2obj[prop];
    });
    arr1obj && _.extend(arr1obj, arr2obj)
  });
}


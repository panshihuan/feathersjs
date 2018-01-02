const request = require("../../request")
const uuidv4 = require('uuid/v4');
const { setCreatedAt,client } = require('feathers-hooks-common');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addGroup(),setCreatedAt()],
    update: [],
    patch: [],
    remove: [client("serverId"),removeGroup(),removeItem()]
  },

  after: {
    all: [],
    find: [],
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


function addGroup() {
  return function (hook) {
    let _id = uuidv4();
    return new Promise((resolve, reject) => {
      hook.data._id = _id;
      let ss = request(`${hook.app.get("daCollectorUrl")}/createGroup`, {
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
          return reject("error")
        }
      }, (e) => {
        reject(e)
      })
    })
  }
};



function removeGroup() {
  return function (hook) {

    //如果hook.id 为 null 则代表批量删除，不去调用后端代码
    if(hook.id==null)
    {
      return hook;
    }
    else {

      return new Promise((resolve, reject) => {
        let ss = request(`${hook.app.get("daCollectorUrl")}/removeGroup`, {
          method: 'DELETE',
          body: JSON.stringify({_id: hook.id, driverId: hook.params.serverId})
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
    }
  }
};


function removeItem()
{
  return function (hook) {
    const id = hook.id;
    return hook.app.service('item-config').remove(null, { query: { groupid: id } }).then(function () {
      return hook;
    }).catch( function (err) {
      console.log(err);
    } )
  }
};

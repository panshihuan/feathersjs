
const moment = require('moment');
const uuidv4 = require('uuid/v4');

function addItem() {
  return function (hook) {
    var gid=uuidv4()
    let res={
      "CreateTime":moment().format('YYYY-MM-DD hh:mm:ss'),//创建时间
      "gid":""+gid,
      "classId":gid
    }
    hook.data=Object.assign({},hook.data,res)
    return hook;
  }
};

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [addItem()],
    update: [],
    patch: [],
    remove: []
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

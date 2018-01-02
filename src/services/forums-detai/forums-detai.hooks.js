
const moment = require('moment');
const uuidv4 = require('uuid/v4');

function addItem() {
  return function (hook) {
    var gid=uuidv4()
    hook.data=Object.assign({},hook.data,{"time":moment().format('YYYY-MM-DD hh:mm:ss'),"gid":gid})
    let res={
      "type":hook.data.type||0,
      "url":hook.data.url||[],
      "zanCount":hook.data.zanCount||0,
      "readCount":hook.data.readCount||0,
      "content":hook.data.content||'',
      "time":moment().format('YYYY-MM-DD hh:mm:ss'),
      "gid":""+gid
    }
      hook.app.service("forums").create(res)
      return hook;
  }
};

function beforeFindItem(){
  return function(hook){
    if(hook.params.query.type&&hook.params.query.type==0){
        delete hook.params.query.type
    }
     return hook; 
  }
}

function findItem(){
  return function(hook){
    hook.result.data=hook.result.data[0]
    console.log('hook:::',hook)
     return hook; 
  }
}

module.exports = {
  before: {
    all: [],
    find: [beforeFindItem()],
    get: [],
    create: [addItem()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [findItem()],
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

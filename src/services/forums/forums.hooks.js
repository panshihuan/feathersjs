

function beforeFindItem(){
  return function(hook){
    if(hook.params.query.type&&hook.params.query.type==0){
        delete hook.params.query.type
    }
     return hook; 
  }
}

module.exports = {
  before: {
    all: [],
    find: [beforeFindItem()],
    get: [],
    create: [],
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

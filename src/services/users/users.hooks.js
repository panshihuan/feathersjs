const moment = require('moment');
const uuidv4 = require('uuid/v4');

function addItem() {
  return function (hook) {
    var gid=uuidv4()
    let token;
    // 身份区分：position 或者 token前缀
    if(hook.data.position){
      let position=hook.data.position; 
      if(position==1){  //普通教师
          token=`common${gid}`
      }else if(position==2){  //家长  
          token=`parent${gid}`
      }else if(position==3){  //管理员
          token=`admin${gid}`
      }else if(position==4){  //超级管理员
          token=`super${gid}`
      }
    }
    
    let res={
      "createTime":moment().format('YYYY-MM-DD hh:mm:ss'),
      "gid":""+gid,
      "token":token
    }

      hook.data=Object.assign({},hook.data,res)
      return hook;
  }
};

// function findItem(){
//   return function(hook){
//     console.log('hook:::',hook.params.headers)
//     if(!hook.params.headers.token){ //请求头 如果没token，return false
//       hook.result={"noToken":"无token","result":false}
//     }
//     return hook;
//   }
// }


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

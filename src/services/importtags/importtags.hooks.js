const xlsx = require('node-xlsx')
const _ = require('lodash');
const request = require("../../request")

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [removeItem(),getfile()],
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


function removeItem()
{
  return function (hook) {
    const id = hook.id;
    return hook.app.service('item-config').remove(null).then(function () {
      return hook;
    }).catch( function (err) {
      console.log(err);
    } )
  }
};


function getfile() {

  return function (hook) {

    return new Promise((resolve, reject) => {

      if (!hook.data.uri && hook.params.file) {
        const bufferfile = hook.params.file;
        //将buffer 转换成xlsx 对象的第一个excel表
        let xlsxObj = (xlsx.parse(bufferfile.buffer))[0].data;


        // 获取所有group用于比较
        hook.app.service('group-config').find({})
          .then(function (result, err) {

            //定义数组
            var tagArray = new Array();

            //循环excel
            for (let i = 1; i < xlsxObj.length; i++) {
              let rowdata = xlsxObj[i]

              let serverid, groupid

              let selectresult = _.find(result, {'name': rowdata[1].toString()});

              groupid = selectresult._id

              serverid = selectresult.driverId

              var tag = {
                "serverid": serverid,
                "serverName": rowdata[0],
                "groupid": groupid,
                "groupName": rowdata[1],
                "address": rowdata[2],//地址：Channel1.Device1.Tag1
                "name": rowdata[3],//点名：例如机械手（不可重复）
                "des": rowdata[4],//描述
                "analog_or_digital": rowdata[5],//模拟量还是数字量判断：analog或digital
                "e_isactive": rowdata[6],//开启工程量转换
                "e_hi": rowdata[7],//工程量高限
                "e_low": rowdata[8],// 工程量低限
                "e_z_hi": rowdata[9],//缩放后高限
                "e_z_low": rowdata[10],//缩放后低限
                "e_a_config": rowdata[11],//数字量报警配置
                "a_hi": rowdata[12],//报警高限
                "a_low": rowdata[13],//报警低限
                "a_isactive": rowdata[14],//启用报警
              };
              tagArray.push(tag);
            }

            hook.app.service('item-config').create([tagArray],{type: "import"}).then(function (result, err) {

              let ss = request(`${hook.app.get("daCollectorUrl")}/importItems`, {
                method: 'DELETE'
              }).then((d) => {
                if (d.err) {
                  return reject(d.err)
                }
                if (d.data == true) {

                  resolve(hook)
                }
                else {
                  return reject("error")
                }

              }, (e) => {
                return reject(e)
              })

            })


          })


      }


    });
  }
};

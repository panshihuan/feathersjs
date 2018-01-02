/* eslint-disable no-unused-vars */
// const apps = require('../../app');
const tool = require("./tool.js");

const logger = require('winston');
const uuidv4 = require('uuid/v4');
const moment = require('moment');

class Service {

  constructor(options) {
    this.options = options || {};
    this.events = ["onData", "onAlarm", "onItemsConfig"];
    this.itemsConfig = [];//点配置信息
    this.items = [];//工程量转化后的数据
    this.alarm = [];//报警数据信息
    //  this.findElem = this.findElem.bind(this);
  }

  setup(app) {
    this.app = app;
    this.tagDataService = this.app.service('tag-storage');
    this.itemConfigService = this.app.service('item-config');
  }


  //转发调用接口
  find(params) {
    // logger.info(params);
    // return this.tagDataService.find(params);

    // setInterval(() => {
    //   this.app.service('transpond').emit('onData', {id:"123",value:"123123",quality:"Good",st:"2017-08-16"});
    // }, 1000);
    //
    // this.app.service('transpond').emit('onAlarm', {id:"123",value:"123123",quality:"Good",st:"2017-08-16"});
    //
    //
    // setInterval(() => {
    //   this.app.service('transpond').emit('onTest', {id: "123", value: "123123", quality: "Good"});
    // }, 1000);

    //this.doTranspond(data);

    let result = this.items;
    //let result = {state: "OK"};
    return Promise.resolve(result);
  }


  get (id, params) {
    return Promise.resolve({
      id, text: `A new message with ID: ${id}!` + uuidv4()
    });
    // logger.info(id);
    // return this.tagDataService.get(id, params);
  }

  create(data, params) {

    if (Array.isArray(data)) {

      return Promise.all(data.map(current => this.create(current))
      )
        ;
    }

    return Promise.resolve(data);
    // logger.info(data);
    // return this.tagDataService.create(data, params);
  }

  doTranspond(data) {

    if (data != null && data != undefined) {

      let toole = new tool();

      //判断点的配置信息是否为空，如果为空就从新加载
      if (this.ItemsConfig == null || this.ItemsConfig == undefined || this.ItemsConfig.length <= 0) {
        // this.app.service('item-config').find().then(data => this.ItemsConfig = data);
        this.itemConfigService.find().then(data => this.ItemsConfig = data);

      } else {

        this.itemConfigService.find().then(data => this.ItemsConfig = data);

        //循环Data做工程量转化
        for (let i = 0; i < data.length; i++) {

          //实时数据
          let value;

          if (data[i].value != null && data[i].value != undefined) {
            value = data[i].value;//实时数据tag值
          } else {
            value = "";
          }

          let quality;
          if (data[i].quality != null && data[i].quality != undefined) {
            quality = data[i].quality;
          } else {
            value = "???";
          }


          let _id = data[i]._id;


          //配置数据

          //  logger.info("this.ItemsConfig:" + this.ItemsConfig);

          let itemConfig = this.ItemsConfig.find(da => da._id == data[i]._id);

          //   logger.info("this.itemConfig:" + itemConfig);

          if (itemConfig != null && itemConfig != undefined) {

            let e_isactive = itemConfig.e_isactive;//判断是否工程量转化
            let e_z_hi = itemConfig.e_z_hi;
            let e_z_low = itemConfig.e_z_low;
            let e_low = itemConfig.e_low;
            let e_hi = itemConfig.e_hi;
            let a_isactive = itemConfig.a_isactive;//判断是否报警
            let a_hi = itemConfig.a_hi;//报警最高值
            let a_low = itemConfig.a_low;//报警最低值
            let name = itemConfig.name;//点名
            let describe = itemConfig.des;//描述
            // logger.info("data[i].value:" + data[i].value);
            // logger.info("e_isactive:" + e_isactive);
            // logger.info("e_z_hi:" + e_z_hi);
            // logger.info("e_z_low:" + e_z_low);
            // logger.info("e_low:" + e_low);
            // logger.info("e_hi:" + e_hi);
            // logger.info("a_isactive:" + a_isactive);
            // logger.info("a_hi:" + a_hi);
            // logger.info("a_low:" + a_low);

            //gejing 2017-09-06 不报警
            // if (a_isactive == true) {
            //   let isAlarm = (parseFloat(value) > parseFloat(a_hi)) || (parseFloat(value) < parseFloat(a_low));
            //   if (isAlarm) {
            //
            //     let success = false;
            //
            //     if (this.alarm.length <= 0) {
            //       success = true;
            //     }
            //     for (let i = 0; i < this.alarm.length; i++) {
            //       if (this.alarm[i]["name"] === name) {
            //         if (this.alarm[i]["endTime"] != "") {
            //           success = true;
            //         } else {
            //           success = false;
            //         }
            //       } else {
            //         success = true;
            //       }
            //     }
            //
            //     if (success) {
            //       //添加到报警数据组中
            //       let alarmItem = {};
            //       // alarmItem._id = uuidv4();
            //       alarmItem.name = name;
            //       alarmItem.describe = describe;
            //       alarmItem.value = value;
            //       alarmItem.quality = quality;
            //       alarmItem.startTime = moment().format('YYYY-MM-DD hh:mm:ss.ms');
            //       alarmItem.endTime = "";
            //       this.alarm.push(alarmItem);
            //     }
            //   } else {
            //     this.alarm.forEach(function (_alarmItem) {
            //       if (_alarmItem["name"] === name && _alarmItem["endTime"] == "") {
            //         _alarmItem.endTime = moment().format('YYYY-MM-DD hh:mm:ss.ms');
            //       }
            //     });
            //   }
            // }
            //gejing 2017-09-06 不报警 end

            //工程量转化后的Value
            let tooleValue;
            if (e_isactive == true) {
              tooleValue = this.quantities(e_z_hi, e_z_low, e_hi, e_low, value);
            } else {
              tooleValue = value;
            }




            if (this.findElem(this.items, "_id", _id) < 0) {
              let item = {};
              item._id = _id;
              item.name = name;
              item.quality = quality;
              item.value = tooleValue;
              this.items.push(item);
            } else {
              this.items.forEach(function (_item) {
                if (_item._id === _id) {
                  _item.name = name;
                  _item.quality = quality;
                  _item.value = tooleValue;
                }
              });
            }
          }
        }
// //循环Alarm删除
// for (let i = 0; i < this.alarm.length; i++) {
//   if (this.findElem(this.data, "id", this.alarm[i].id) < 0) {
//     this.alarm.splice(this.alarm[i]);
//     break;
//   }
// }
//
// //循环items删除
// for (let i = 0; i < this.items.length; i++) {
//   if (this.findElem(this.data, "id", this.items[i].id) < 0) {
//     this.items.splice(this.items[i]);
//     break;
//   }
// }
      }
    }
  }


  quantities(E_Z_HI, E_Z_LOW, E_HI, E_LOW, Value) {

    let e_z_hi = parseFloat(E_Z_HI);
    let e_z_low = parseFloat(E_Z_LOW);
    let e_hi = parseFloat(E_HI);
    let e_low = parseFloat(E_LOW);
    let value = parseFloat(Value);


    let tagValue = (e_z_hi - e_z_low) * (value - e_low) / (e_hi - e_low) + e_z_low;
    // console.log("工程量:++++++++++++++++++++++++++++++++++++++"+tagValue);
    return tagValue;
  }

  findElem(arrayObject, attr, val) {
    for (let i = 0; i < arrayObject.length; i++) {
      if (arrayObject[i][attr] === val) {
        return i;
      }
    }
    return -1;
  }

//使用update方法或者patch方法接收数据
//将data实时数据传入方法体
  update(id, data, params) {

    // logger.info("获取的数据:" + data);

    this.doTranspond(data);

    return Promise.resolve(data);
  }

  patch(id, data, params) {
    let success = this.tagDataService.patch(id, data, params);
    return success;
    // return Promise.resolve(data);
  }

  remove(id, params) {

    let success = this.tagDataService.remove(id, params);
    return success;
    // return Promise.resolve({ id });
  }

}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

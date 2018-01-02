/* eslint-disable no-unused-vars */
const request = require("../../request")
const uuidv4 = require('uuid/v4');

class Service {
  constructor(options) {
    this.options = options || {};
    this.events = ['fetchServerListRequest']
  }

  setup(app) {
    this.app = app;
  }

  find(params) {


    //获取服务器列表
    if (params.type == "fetchServerList") {
      return request(`${this.app.get("daCollectorUrl")}/fetchServerList?ip=` + params.query.ip)
    }
    //获取服务器状态
    else if (params.type == "fetchServerStatus") {
      return request(`${this.app.get("daCollectorUrl")}/fetchServerStatus`)
    }
    //获取OPC服务器Browser 内容
    else if (params.type=="fetchOpcBrower")
    {
      return request(`${this.app.get("daCollectorUrl")}/fetchOpcBrower?id=${params.query.id}&type=${params.query.type}`)
    }
  }

  get(id, params) {

    return Promise.resolve({
      id, text: `A new message with ID: ${id}!`
    });
  }

  create(data, params) {



  }

  update(id, data, params) {
    return Promise.resolve(data);
  }

  patch(id, data, params) {
    return Promise.resolve(data);
  }

  remove(id, params) {
    return Promise.resolve({id});
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;

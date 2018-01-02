const {setCreatedAt, populate} = require('feathers-hooks-common');
const request = require("../../request");
const uuidv4 = require('uuid/v4');

const _ = require('lodash')

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

function addItem() {
  return function (hook) {
      hook.app.service("news").create(hook.data)
      return hook;
  }
};

const users = require('./users/users.service.js');
const demo = require('./demo/demo.service.js');
const tag = require('./tag/tag.service.js');
const demo2 = require('./demo-2/demo-2.service.js');
const common = require('./common/common.service.js');
const driverConfig = require('./driver-config/driver-config.service.js');
const tagStorage = require('./tag-storage/tag-storage.service.js');
const groupConfig = require('./group-config/group-config.service.js');
const itemConfig = require('./item-config/item-config.service.js');
const transpond = require('./transpond/transpond.service.js');
const gatewayConfig = require('./gateway-config/gateway-config.service.js');
const ousideconnectionConfig = require('./ousideconnection-config/ousideconnection-config.service.js');
const importtags = require('./importtags/importtags.service.js')
const demo4 = require('./demo-4/demo-4.service.js');
const ssaa = require('./ssaa/ssaa.service.js');
const news = require('./news/news.service.js');
const newsDetail = require('./news-detail/news-detail.service.js');
const forums = require('./forums/forums.service.js');
const forumsDetai = require('./forums-detai/forums-detai.service.js');
const schools = require('./schools/schools.service.js');
const classes = require('./classes/classes.service.js');
const getClass = require('./get-class/get-class.service.js');
module.exports = function () {
  const app = this; // eslint-disable-line no-unused-vars
  app.configure(users);
  app.configure(demo);
  app.configure(tag);
  app.configure(demo2);
  app.configure(common);
  app.configure(driverConfig);
  app.configure(tagStorage);
  app.configure(groupConfig);
  app.configure(itemConfig);
  app.configure(transpond);
  app.configure(gatewayConfig);
  app.configure(ousideconnectionConfig);
  app.configure(importtags);
  app.configure(demo4);
  app.configure(ssaa);
  app.configure(news);
  app.configure(newsDetail);
  app.configure(forums);
  app.configure(forumsDetai);
  app.configure(schools);
  app.configure(classes);
  app.configure(getClass);
};

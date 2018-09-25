const built    = require('built-extension-sdk');
const constant = require('./constant');

const app      = built.App(constant.BUILT_IO_API_KEY).setMasterKey('bltd072083817c5c506')
                
let ext = app.Extension({
  extension_key: constant.BUILT_IO_EXTENTION_KEY,
  secret_key   : constant.BUILT_IO_SECRET_KEY,
  static       : __dirname+'/client',
  routes       : require('./server/route')
});

return ext.start(9090)
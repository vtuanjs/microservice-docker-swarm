require('../src/configurator').load();
process.appConfig.appName = 'API Gateway';

const application = require('../src/application');

module.exports = application.start()
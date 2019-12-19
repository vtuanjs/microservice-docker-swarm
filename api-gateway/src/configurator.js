const fs = require('fs');
const path = require('path');

const defaultConfigPath = path.join(__dirname, '../configs/default.json');
const customConfigPath = path.join(__dirname, '../configs/config.json');

exports.load = () => {
  let appConfig = {};

  if (fs.existsSync(defaultConfigPath)) {
    appConfig = JSON.parse(fs.readFileSync(defaultConfigPath, { encoding: 'utf-8' }));
  }

  if (fs.existsSync(customConfigPath)) {
    let customConfig = JSON.parse(fs.readFileSync(customConfigPath, { encoding: 'utf-8' }));
    appConfig = Object.assign(appConfig, customConfig);
  }

  /**
   *
   * # port
   * type: number
   * default: 3000
   *
   * # debug
   * type: boolean
   * default: false
   *
   */
  process.appConfig = appConfig;
}
const fs = require('fs');
const path = require('path');

const defaultConfigPath = path.join(__dirname, '../configs/default.json');
const customConfigPath = path.join(__dirname, '../configs/config.json');

exports.load = () => {
  let appConfig = {};

  if (fs.existsSync(defaultConfigPath)) {
    appConfig = JSON.parse(fs.readFileSync(defaultConfigPath, { encoding: 'utf-8' }));
  }

  // Configure when run Docker
  if (process.env.MONGODB_SERVICE_NAME){
    let envConfig = {
      mongodb_user_name : process.env.MONGODB_USER_NAME,
      mongodb_password : process.env.MONGODB_PASSWORD,
      mongodb_connection_string : `mongodb://${process.env.MONGODB_SERVICE_NAME}:27017/product`,
      port: 3001,
    }

    appConfig = Object.assign(appConfig, envConfig);
  }

  if (fs.existsSync(customConfigPath)) {
    let customConfig = JSON.parse(fs.readFileSync(customConfigPath, { encoding: 'utf-8' }));
    appConfig = Object.assign(appConfig, customConfig);
  }

  /**
   *
   * # address
   * type: string
   * default: '0.0.0.0'
   *
   * # port
   * type: number
   * default: 3000
   *
   * # debug
   * type: boolean
   * default: false
   *
   * # mongodb_connection_string
   * type: string
   * ex: mmongodb://localhost/db
   *
   * # mongodb_user_name
   * type: string
   *
   * # mongodb_password
   * type: string
   */
  process.appConfig = appConfig;
}
import mci from './services/mci'

import yargs from './services/yargs'


(function init() {
  // 参数获取
  yargs.init()
  // ci初始化
  mci.init()
})()
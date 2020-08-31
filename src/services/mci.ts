// util
const mci = require('miniprogram-ci')
const fs = require('fs')
const path = require('path')
// shell
import { execAsync } from '../util/exec'
// debug
import createDebug from '../util/debug'
// const
import { yargsObject, enumDirectory, oldEnumDirectory, enumWarehouse, enumWarehouseKey, enumDirectorys } from '../consts'
// 日志
let debug = createDebug('miniprogram-ci')

class MiniprogramCi{
  async init(): Promise<void>{
    // 环境变量
    let { branch, env, appid, desc, version } = yargsObject 
    // 拉取代码
    await this.pullMiniProgram(branch, env)
    // 打包代码
    await this.packMiniProgram(env)
    // 获取项目属性
    let project = await this.project(appid)
    // 上传代码
    await this.upload(project, desc, version)
  }

  async pullMiniProgram(branch: string | undefined, env?: string | undefined){
    // clone仓库
    try{
      fs.statSync(enumDirectory);
    }catch(e){  
      let cmdOne = `git clone ${enumWarehouse}`;
      await execAsync(cmdOne);
      fs.renameSync(oldEnumDirectory, enumDirectory)
      debug('clone完成', {})
    }  
    // 获取远程分支
    try{
      let cmdTwo = `cd ${enumDirectory} && git fetch origin ${branch} && git reset --hard --quiet && git checkout -b ${branch} origin/${branch}`;
      // 执行初次获取shell
      await execAsync(cmdTwo);  
    }catch(e){
      debug('本地已有远程分支', {})
    }
    // 拉取小程序代码
    let cmdThree = `cd ${enumDirectory} && git reset --hard --quiet && git checkout ${branch} --quiet && git fetch --tags && git pull origin ${branch} --quiet`;
    // && npm i
    // 执行拉取shell
    await execAsync(cmdThree);  
    // 日志 
    debug('拉取完成', {
      env 
    })
  }

  async packMiniProgram(env: string = 'dev'){
    // 打包小程序代码
    let packCmd = `cd ${enumDirectory} && npm run build:weapp:${env}`;
    // 打包shell
    await execAsync(packCmd); 
    // 日志 
    debug('打包完成', {
      env
    })
  }

  async project(appid: string): Promise<object>{
    const project = new mci.Project({
      appid,
      type: 'miniProgram',
      projectPath: `${enumDirectory}/dist/weapp`,
      privateKeyPath: `${enumWarehouseKey}`,
    })
    debug('获取项目属性', project)
    return project
  }

  async upload(project: object, desc: string, version: string): Promise<void>{        
    let { subPackageInfo } = await mci.upload({
      project,
      version,
      desc,
      setting: {
        minify: true,
      },
      onProgressUpdate: console.log,
    })
    debug('小程序包信息', subPackageInfo)
  }
}

export default new MiniprogramCi()
// util
const mci = require('miniprogram-ci')
// shell
import { execAsync } from '../util/exec'
// debug
import createDebug from '../util/debug'
// const
import { TargetBaseDir, yargsObject, enumDirectory, enumWarehouse, enumWarehouseKey } from '../consts'
// 日志
let debug = createDebug('miniprogram-ci')

class MiniprogramCi{
  async init(): Promise<void>{
    // 环境变量
    let { branch, env, appid, desc, version } = yargsObject 
    // 拉取代码
    await this.pullMiniProgram(branch, env)
    // 打包代码
    // await this.packMiniProgram(env)
    // 获取项目属性
    // let project = await this.project(appid)
    // 上传代码
    // await this.upload(project, desc, version)
  }

  async pullMiniProgram(branch: string | undefined, env?: string | undefined){
    // 初次获取远程分支
    try{
      let cmdOne = `cd ${TargetBaseDir} && git fetch origin ${branch} && git reset --hard --quiet && git checkout -b ${branch} origin/${branch}`;
      // 执行初次获取shell
      await execAsync(cmdOne);  
    }catch(e){
      debug('本地已有远程分支', {})
    }
    // 拉取小程序代码
    let cmdTwo = `cd ${TargetBaseDir} && git reset --hard --quiet && git checkout ${branch} --quiet && git fetch --tags && git pull origin ${branch} --quiet && npm i`;
    // 执行拉取shell
    await execAsync(cmdTwo);  
    // 日志 
    debug('拉取完成', {
      env 
    })
  }

  async packMiniProgram(env: string = 'dev'){
    // 打包小程序代码
    let packCmd = `cd ${TargetBaseDir} && npm run build:weapp:${env}`;
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
      projectPath: './miniprogram/dist/weapp',
      privateKeyPath: './src/key/private.wx27a2f9c4826c1e12.key',
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
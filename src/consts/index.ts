import * as yargs from "yargs";

export let TargetBaseDir = ''

export let enumDirectory: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': './miniprogram'
}

export let enumWarehouse: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': 'git@tp-git.shopex.cn:shopex/watsons-mystore/ba-taro.git'
}

export let enumWarehouseKey: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': 'private.wx27a2f9c4826c1e12.key'
}

export let yargsObject: {
  env: string,
  branch: string,
  appid: string,
  desc: string, 
  version: string
} = {
  env: 'dev',
  branch: '',
  desc: '', 
  version: '',
  appid: ''
}

export function init(): void{
  let { argv } = yargs;    
  yargsObject.env = argv.env
  yargsObject.branch = argv.branch
  yargsObject.desc = argv.desc
  yargsObject.appid = argv.appid
  yargsObject.version = argv.v
  TargetBaseDir = enumDirectory[argv.appid]
}


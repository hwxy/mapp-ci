const path = require('path')
import * as yargs from "yargs";

export let enumDirectorys: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': './miniprogram'
} 

export let oldEnumDirectorys: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': './ba-taro'
} 

export let enumDirectory: string = ''

export let oldEnumDirectory: string = ''

export let enumWarehouses: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': 'git@tp-git.shopex.cn:shopex/watsons-mystore/ba-taro.git'
}

export let enumWarehouse: string = ''

export let enumWarehouseKeys: {
  [propName: string]: string
} = {
  'wx27a2f9c4826c1e12': 'private.wx27a2f9c4826c1e12.key'
}

export let enumWarehouseKey: string = ''

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
  enumDirectory = path.join(__dirname, `../../${enumDirectorys[argv.appid]}`)
  oldEnumDirectory = path.join(__dirname, `../../${oldEnumDirectorys[argv.appid]}`)
  enumWarehouse = enumWarehouses[argv.appid]
  enumWarehouseKey = path.join(__dirname, `../key/${enumWarehouseKeys[argv.appid]}`)  
}


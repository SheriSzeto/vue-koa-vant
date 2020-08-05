const mongoose = require('mongoose')
const db = 'mongodb://localhost/vue-koa'
const glob = require('glob')
const { resolve } = require('path') // 将一系列路径或路径段解析为绝对路径


mongoose.Promise = global.Promise

exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)
  let maxConnectTimes = 0 // 数据库最大连接数

  return new Promise((resolve, reject) => {

    // 增加数据库连接的事件监听
    mongoose.connection.on('disconnected', () => {
      console.log('数据库断开！！！！');
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题了。。。')
      }
    })

    // 数据库出现错误的时候
    mongoose.connection.on('error', (err) => {
      console.log('数据库出现错误：', err);
      if (maxConnectTimes < 3) {
        maxConnectTimes++
        mongoose.connect(db)
      } else {
        reject()
        throw new Error('数据库出现问题了。。。')
      }
    })

    //链接打开的时候
    mongoose.connection.once('open', () => {
      console.log('MongoDB Connected successfully!')
      resolve()
    })
  })

}

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema/', '**/*.js')).forEach(require) // 引入所有的schema
}
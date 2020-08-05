const Koa = require('koa')
const app = new Koa()
// 引入connect
const { connect, initSchemas } = require('./database/init.js')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')

let user = require('./appApi/user')
let goods = require('./appApi/goods')

let router = new Router()
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 支持跨域，一定要定义在中间件前面，不然还是会报错
app.use(cors())

// bodyparser()会解析路由和请求体的参数，在注册路由前引入则无法解析之后的路由参数和请求体，所以就得不到请求体参数
app.use(bodyParser())

// 加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())


  // 立即执行函数
  ; const mongoose = require('mongoose');
(async () => {
  await connect()
  initSchemas()
})()

app.use(async (ctx) => {
  ctx.body = '<h1>hello koa2</h1>'
})

app.listen(3000, () => {
  console.log('[server] starting at port 3000');
})
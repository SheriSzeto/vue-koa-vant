const Router = require('koa-router')
const mongoose = require('mongoose')
let router = new Router()

router.get('/', async(ctx) => {
  ctx.body = '这是用户操作首页'
})
router.post('/register', async(ctx) => {
  // 取得model
  const User = mongoose.model('User')
  // 把从前端接收的POST数据封装成一个新的user对象
  let newUser = new User(ctx.request.body)
  // 用mongoose的save方法直接存储，然后判断是否成功，返回相应的结果
  await newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  })
  .catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

router.post('/login', async(ctx) => {
  let { userName, password } = ctx.request.body

  // 取得model
  const User = mongoose.model('User')
  // 查找用户名是否存在，存在再比对密码
  await User.findOne({userName}).exec().then(async (result) => {
    if (result) {
      let newUser = new User()
      try {
        const isMatch = await newUser.comparePassword(password, result.password)
        ctx.body = {
          code: 200,
          message: isMatch
        }
      } catch (err) {
        ctx.body = {
          code: 500,
          message: err
        }
      }
    } else {
      ctx.body = {
        code: -1,
        message: '用户名不存在'
      }
    }
  })
  .catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

module.exports = router;
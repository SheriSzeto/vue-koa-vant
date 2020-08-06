const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
let router = new Router()

const mongoose = require('mongoose')
const fs = require('fs')

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./dataJson/goods.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newGoods = new Goods(value)
      newGoods.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })
  })
  ctx.body = '开始导入数据'
})

router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./dataJson/category.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategory = new Category(value)
      newCategory.save().then(() => {
        saveCount++
        console.log('成功' + saveCount)
      }).catch(error => {
        console.log('失败：' + error)
      })
    })


  })
  ctx.body = "开始导入数据"

})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./dataJson/category_sub.json', 'utf8', (err, data) => {
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map((value, index) => {
      console.log(value)
      let newCategorySub = new CategorySub(value)
      newCategorySub.save().then(() => {
        saveCount++
        console.log('成功插入' + saveCount)
      }).catch(error => {
        console.log('插入失败:' + error)
      })
    })
  })
  ctx.body = "开始导入数据"
})

// 获取商品详情
router.post('/getDetailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  await Goods.findOne({ ID: goodsId }).exec()
    .then(result => {
      ctx.body = {
        code: 200,
        data: result,
        message: '查询成功'
      }
    })
    .catch(err => {
      console.log(err);
      ctx.body = {
        code: 500,
        message: error
      }
    })
})

// 获取大类别
router.get('/getCategoryList', async (ctx) => {
  try {
    const Category = mongoose.model('Category')
    let result = await Category.find().exec()
    ctx.body = { code: 200, data: result, message: '查询成功' }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }

})

// 获取小类别
router.post('/getCategorySubList', async (ctx) => {
  try {
    let categoryId = ctx.request.body.categoryId
    const CategorySub = mongoose.model('CategorySub')
    let result = await CategorySub.find({ MALL_CATEGORY_ID: categoryId }).exec()
    ctx.body = { code: 200, data: result, message: '查询成功' }
  } catch (err) {
    ctx.body = { code: 500, message: err }
  }

})

// 根据类别获取商品列表
router.post('/getGoodsListByCategorySubID',async(ctx)=>{
  try{
      let categorySubId = ctx.request.body.categorySubId
      let page = ctx.request.body.page
      let num = 10
      let start = (page - 1) * num
      const Goods = mongoose.model('Goods')
      let result = await Goods.find({SUB_ID:categorySubId}).skip(start).limit(num).exec()
      ctx.body = { code: 200, data: result, message: '查询成功' }
    }catch(err){
      ctx.body={code:500,message:err}
  }

})

module.exports = router
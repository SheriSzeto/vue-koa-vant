const BASEURL = 'https://www.fastmock.site/mock/dd889443fc031b270adaff65651158e6/vue-koa/api/v1/';
const LOCALURL = 'http://localhost:3000/'

const URL = {
  getShoppingMallInfo: BASEURL+'index',
  getGoodsInfo: BASEURL+'getGoodsInfo',
  registerUser: LOCALURL+'user/register',
  login: LOCALURL+'user/login',
  getDetailGoodsInfo: LOCALURL+'goods/getDetailGoodsInfo',
  getCategoryList: LOCALURL+'goods/getCategoryList',
  getCategorySubList: LOCALURL+'goods/getCategorySubList',
  getGoodsListByCategorySubID: LOCALURL+'goods/getGoodsListByCategorySubID', // 小类商品信息
}

module.exports = URL
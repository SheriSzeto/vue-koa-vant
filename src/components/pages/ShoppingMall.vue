<template>
  <div>
    <!-- search bar -->
    <div class="search-bar">
      <van-row gutter="5">
        <van-col span="3">
          <img :src="locationIcon" class="location-icon" width="80%">
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input">
        </van-col>
        <van-col span="5">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- swiper area -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner, index) in bannerPicArray" :key="index">
          <img :src="banner.image" lazy-load width="100%">
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- type bar -->
    <div class="type-bar">
      <div class="type-item" v-for="(cate,index) in category" :key="index">
        <img :src="cate.image" lazy-load width="90%">
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- adbanner area -->
    <div class="ad-banner">
      <img :scr="adBanner" lazy-load width="100%">
    </div>
    <!-- recommend goods area -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for=" (item ,index) in recommendGoods" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="80%">
              <div>{{item.goodsName}}</div>
              <div>￥{{item.price | moneyFilter}} (￥{{item.mallPrice | moneyFilter}})</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!--Hot Area-->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <!--这里需要一个list组件-->
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="( item, index) in hotGoods" :key="index">
              <goods-info :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price"></goods-info>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/swiper-bundle.css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import floorComponent from "../component/floorComponent";
import goodsInfo from "../component/goodsInfoComponent";
import { toMoney } from "@/filter/moneyFilter.js";
import url from "@/serviceAPI.config.js";
import {
  Row,
  Col,
  Button,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
} from 'vant'

export default {
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Lazyload.name]: Lazyload,
    [List.name]: List,
    Swiper,
    SwiperSlide,
    floorComponent,
    goodsInfo
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3
      },
      locationIcon: require("../../assets/images/location.png"),
      bannerPicArray: [],
      category: [],
      adBanner: "",
      recommendGoods: [],
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: {}, //楼层名称
      hotGoods: []
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "GET"
    })
      .then(res => {
        console.log(res);
        this.category = res.data.data.category;
        this.adBanner = res.data.data.advertesPicture.PICTURE_ADDRESS;
        this.bannerPicArray = res.data.data.slides;
        this.recommendGoods = res.data.data.recommend;
        this.floor1 = res.data.data.floor1;
        this.floor2 = res.data.data.floor2;
        this.floor3 = res.data.data.floor3;
        this.floorName = res.data.data.floorName;
        this.hotGoods = res.data.data.hotGoods;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped>
@import "~swiper/swiper-bundle.css";

.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
  line-height: 2.2rem;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid 1px !important ;
  background-color: #e5017d;
  color: #fff;
}
.location-icon {
  padding-top: 0.2rem;
  padding-left: 0.3rem;
}
.swiper-area {
  width: 20rem;
  clear: both;
  overflow: hidden;
}
.type-bar {
  background-color: #fff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-item {
  flex: 1;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #fff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eee;
}

.recommend-item {
  width: 99%;
  border-right: 1px solid #eee;
  font-size: 12px;
  text-align: center;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>

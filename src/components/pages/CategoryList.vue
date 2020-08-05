<template>
  <div>
    <div class="navbar-div">
      <van-nav-bar title="类别列表"/>
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                @click="clickCategory(index, item.ID)"
                :class="{categoryActive: categoryIndex == index}"
                v-for="(item,index) in category"
                :key="index"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab v-for="(item,index) in categorySub" :key="index" :title="item.MALL_SUB_NAME"></van-tab>
            </van-tabs>
          </div>
          <div id="list-div">
            <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
              <van-list v-model="loading" :finished="finished" @load="onLoad">
                <div
                  class="list-item"
                  @click="goGoodsInfo(item.ID)"
                  v-for="(item,index) in goodList"
                  :key="index"
                >
                  <div class="list-item-img">
                    <img :src="item.IMAGE1" width="100%" :onerror="errorImg">
                  </div>
                  <div class="list-item-text">
                    <div>{{item.NAME}}</div>
                    <div class="">￥{{item.ORI_PRICE | moneyFilter}}</div>
                  </div>
                </div>
              </van-list>
            </van-pull-refresh>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { toMoney } from "@/filter/moneyFilter.js";
import {
  NavBar,
  Row,
  Col,
  Tabs,
  Tab,
  PullRefresh,
  List,
  Toast
} from 'vant'

export default {
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tabs.name]: Tabs,
    [Tab.name]: Tab,
    [PullRefresh.name]: PullRefresh,
    [List.name]: List,
  },
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categorySub: [],
      active: 0, //激活标签的值
      categorySubId: "",
      loading: false, //上拉加载使用
      finished: false, //下拉加载是否没有数据了
      isRefresh: false, //下拉加载
      page: 1,
      goodList: [],
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  },
  methods: {
    goGoodsInfo(id) {
      this.$router.push({ name: "Goods", params: { goodsId: id } });
    },
    clickCategory(index, categoryId) {
      this.categoryIndex = index;
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(categoryId);
    },
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.data) {
            this.category = response.data.data;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    //根据大类ID读取小类类别列表
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: { categoryId }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.data) {
            this.categorySub = response.data.data;
            this.active = 0;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log(error);
        });
    },
    onClickCategorySub(index) {
      this.categorySubId = this.categorySub[index].ID;
      console.log("categorySubId:" + this.categorySubId);
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.finished = false;
        this.goodList = [];
        this.page = 1;
        this.onLoad();
      }, 500);
    },
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          console.log(response);
          if (response.data.code == 200 && response.data.data.length) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.data);
          } else {
            this.finished = true;
          }
          this.loading = false;
          console.log(this.finished);
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  created() {
    this.getCategory();
  },
  mounted() {
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 - 50 + "px";
    document.getElementById("list-div").style.height = winHeight - 90 - 50 + "px";
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #fff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
}
#list-div {
  overflow: scroll;
}
.list-item {
  display: flex;
  flex-direction: row;
  font-size: 0.8rem;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fff;
  padding: 5px;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
</style>
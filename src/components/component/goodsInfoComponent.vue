<template>
  <div class="goods-info">
    <div class="goods-image">
      <img :src="goodsImage" lazy-load width="90%">
    </div>
    <div class="goods-name">{{goodsName}}</div>
    <div class="goods-price">￥{{goodsPrice | moneyFilter }}</div>
  </div>
</template>
<script>
import { toMoney } from "@/filter/moneyFilter.js";
import {
  Lazyload
} from 'vant'

export default {
  props: ["goodsImage", "goodsName", "goodsPrice"],
  components: {
    [Lazyload.name]: Lazyload
  },
  filters: {
    moneyFilter(money) {
      return toMoney(money);
    }
  }
};
</script>

<style scoped>
.goods-name {
  padding: 0 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// import "swiper/swiper-bundle.css";

// import VueAwesomeSwiper from 'vue-awesome-swiper'
// import 'swiper/swiper-bundle.css'

// Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

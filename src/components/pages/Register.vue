<template>
  <div>
    <van-nav-bar title="用户注册" left-text="返回" left-arrow @click-left="goBack"/>
    <div class="register-panel">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="userName = ''"
      />
      <van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required/>
      <div class="register-button">
        <van-button type="primary" size="large" @click="register" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/serviceAPI.config.js";
import { 
  Toast,
  Button,
  Field,
  NavBar 
} from "vant";

export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [NavBar.name]: NavBar,
  },
  data() {
    return {
      userName: "",
      password: "",
      openLoading: false,
      userNameErrorMsg: "",
      passwordErrorMsg: ""
    };
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    register() {
      this.checkForm() && this.registerUser()
    },
    registerUser() {
      this.openLoading = true;
      axios({
        url: url.registerUser,
        method: "POST",
        data: {
          userName: this.userName,
          password: this.password
        }
      })
        .then(res => {
          console.log(res);
          if (res.data.code == 200) {
            Toast.success(res.data.message);
            this.$router.push("/");
          } else {
            Toast.fail("注册失败");
            this.openLoading = false;
          }
        })
        .catch(() => {
          Toast.fail("注册失败");
          this.openLoading = false;
        });
    },
    checkForm() {
      let isOk = true;
      if (this.userName.length < 5) {
        this.userNameErrorMsg = "用户名不能小于5位";
        isOk = false;
      } else {
        this.userNameErrorMsg = "";
      }

      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能少于6位";
        isOk = false;
      } else {
        this.passwordErrorMsg = "";
      }
      return isOk
    }
  }
};
</script>

<style scoped>
.register-panel {
  width: 96%;
  border-radius: 5px;
  margin: 20px auto;
  padding-bottom: 50px;
}
.register-button {
  padding-top: 10px;
}
</style>
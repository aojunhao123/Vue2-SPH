<template>
  <!-- 注册内容 -->
  <div class="register">
    <h3>注册新用户
      <span class="go">我有账号，去 <router-link to="/login">登陆</router-link>
      </span>
    </h3>
    <div class="content">
      <label>手机号:</label>
      <input type="text" v-model="phone" placeholder="请输入你的手机号">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>验证码:</label>
      <input type="text" v-model="code" placeholder="请输入验证码">
      <button class="verifyBtn" @click="getCode" :disabled="isDisabled" :class="{ disabled: isDisabled }">
        <span v-if="!isDisabled">获取验证码</span>
        <span v-else>{{ countdown }}s后重新获取</span>
      </button>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>登录密码:</label>
      <input type="password" placeholder="请输入你的登录密码" v-model="password">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="content">
      <label>确认密码:</label>
      <input type="password" placeholder="请输入确认密码" v-model="confirmPw">
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="controls">
      <input name="m1" type="checkbox" v-model="agreementChecked">
      <span>同意协议并注册《尚品汇用户协议》</span>
      <span class="error-msg">错误提示信息</span>
    </div>
    <div class="btn">
      <button @click="userRegister">完成注册</button>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
  name: 'Register',
  data() {
    return {
      // 获取验证码按钮是否可点击
      isDisabled: false,
      // 验证码重新获取倒计时
      countdown: 0,
      // 收集手机号
      phone: '',
      // 验证码
      code: '',
      // 密码
      password: '',
      // 确认密码
      confirmPw: '',
      // 是否同意协议
      agreementChecked: false
    }
  },
  methods: {
    // 获取验证码
    async getCode() {
      try {
        // 简单判断一下手机号是否存在
        const { phone } = this
        if (phone) {
          await this.$store.dispatch('getCode', this.phone)
          this.code = this.$store.state.user.code
          // 禁用按钮
          this.isDisabled = true
          // 设置60s倒计时
          this.countdown = 60
          const timer = setInterval(() => {
            this.countdown--
            if (this.countdown === 0) {
              clearInterval(timer)
              // 倒计时结束按钮重新启用
              this.isDisabled = false
            }
          }, 1000);
        }
        else alert('请输入手机号!!!')
      } catch (error) {
        alert(error.message)
      }
    },
    // 用户注册
    async userRegister() {
      try {
        // 解构出需要的参数
        const { phone, password, code, confirmPw, agreementChecked } = this
        if (password === confirmPw && phone && code) {
          // 检查是否同意协议
          if (!agreementChecked)
            return alert('请先勾选协议!')
          await this.$store.dispatch('userRegister', { phone, code, password })
          // 跳转到登录路由
          this.$router.push('/login')
        }
      } catch (error) {
        alert(error.message)
      }

    }
  }
};
</script>

<style lang="less" scoped>
.register {
  width: 1200px;
  height: 445px;
  border: 1px solid rgb(223, 223, 223);
  margin: 0 auto;

  h3 {
    background: #ececec;
    margin: 0;
    padding: 6px 15px;
    color: #333;
    border-bottom: 1px solid #dfdfdf;
    font-size: 20.04px;
    line-height: 30.06px;

    span {
      font-size: 14px;
      float: right;

      a {
        color: #e1251b;
      }
    }
  }

  div:nth-of-type(1) {
    margin-top: 40px;
  }

  .content {
    padding-left: 390px;
    margin-bottom: 18px;
    position: relative;

    label {
      font-size: 14px;
      width: 96px;
      text-align: right;
      display: inline-block;
    }

    input {
      width: 270px;
      height: 38px;
      padding-left: 8px;
      box-sizing: border-box;
      margin-left: 5px;
      outline: none;
      border: 1px solid #999;
    }

    img {
      vertical-align: sub;
    }

    .verifyBtn {
      background-color: #336699;
      border: none;
      border-radius: 4px;
      color: #ffffff;
      cursor: pointer;
      font-size: 14px;
      padding: 8px 16px;
      margin-left: 5px;

      &:hover {
        background-color: #225577;
      }
    }

    button.disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .controls {
    text-align: center;
    position: relative;

    input {
      vertical-align: middle;
    }

    .error-msg {
      position: absolute;
      top: 100%;
      left: 495px;
      color: red;
    }
  }

  .btn {
    text-align: center;
    line-height: 36px;
    margin: 17px 0 0 55px;

    button {
      outline: none;
      width: 270px;
      height: 36px;
      background: #e1251b;
      color: #fff !important;
      display: inline-block;
      font-size: 16px;
    }
  }
}
</style>
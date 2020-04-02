<template>
  <div class="login-container">
    <div class="xylogo">
      <img alt="xiyou logo" src="../../assets/logo/xiyoulogo.jpeg">
      <p class="xyname">西安邮电大学</p>
    </div>
    <div class="sxtitle">本科生与导师双选系统</div>
    <div class="notice">
        <h2 class="notice-title">通知信息:</h2>
        <ul class="notice-body">
          <li>本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至
            本系统现已升级至本系统现已升级至本系统现已升级至</li>
          <li>本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至
            本系统现已升级至本系统现已升级至本系统现已升级至</li>
          <li>本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至
            本系统现已升级至本系统现已升级至本系统现已升级至</li>
          <li>本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至本系统现已升级至
            本系统现已升级至</li>
          </ul>
      </div>
    <div class="loginform-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on" label-position="left">

        <div class="title-container">
          <h3 class="title">账号密码登录</h3>
        </div>

        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input
            ref="username"
            v-model="loginForm.username"
            placeholder="账号"
            name="username"
            type="text"
            tabindex="1"
            autocomplete="on"
          />
          <!-- autocomplete 自动补全 让浏览器自动记录之前输入的值 ！-->
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <!--tooltip文字提示，placement出现的位置，manual手动控制模式，设置为 true 后，mouseenter 和 mouseleave 事件将不会生效-->
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="password" />
            </span>
            <el-input
              :key="passwordType"
              ref="password"
              v-model="loginForm.password"
              :type="passwordType"
              placeholder="密码"
              name="password"
              tabindex="2"
              autocomplete="on"
              @keyup.native="checkCapslock"
              @blur="capsTooltip = false"
              @keyup.enter.native="handleLogin"
            />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:15px;" @click.native.prevent="handleLogin">登录</el-button>
        <!-- 给vue组件绑定事件的时候必须加上native,否则会认为监听的是来自item组件自定义的事件/ prevent是用来阻止默认事件的 !-->
      </el-form>
      <div class="forgive">
        <a href="#">忘记密码?</a>
      </div>
    </div>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import SocialSign from './components/SocialSignin'

export default {
  name: 'Login',
  components: { SocialSign },
  data() {
    // 前端校验密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error('密码不能少于3个字符'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      // 表单规则
      loginRules: {
        password: [{ required: true, trigger: 'blur', validator: validatePassword }]
      },
      passwordType: 'password',
      capsTooltip: false,
      loading: false,
      showDialog: false,
      redirect: undefined,
      otherQuery: {}
    }
  },
  // ?watch没看懂
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    // 检查大写锁是否开启
    checkCapslock(e) {
      const { key } = e
      this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
    },

    //展示密码
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    
    // 登录
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push({ path: this.redirect || '/', query: this.otherQuery })
              this.loading = false
            })
            .catch(() => {
              this.loading = false
            }) 
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    }
    // afterQRScan() {
    //   if (e.key === 'x-admin-oauth-code') {
    //     const code = getQueryObject(e.newValue)
    //     const codeMap = {
    //       wechat: 'code',
    //       tencent: 'code'
    //     }
    //     const type = codeMap[this.auth_type]
    //     const codeName = code[type]
    //     if (codeName) {
    //       this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //         this.$router.push({ path: this.redirect || '/' })
    //       })
    //     } else {
    //       alert('第三方登录失败')
    //     }
    //   }
    // }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 52px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin: 40px 0;
  }

  .el-form-item__label{
    margin-left:2px;
    font-size:16px;
    color:white;
  }
  .el-radio{
    color:white;
  }

  .el-button {
    height: 52px;
    font-size: 20px;
  };

}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  position: relative;
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  padding:8px;

  .sxtitle {
    font-size: 60px;
    font-weight: bold;
    color:white;
    position: absolute;
    left: 160px;
    top: 250px;
  }

  .notice{
    position: absolute;
    left: 100px;
    top: 380px;
    width:700px;
    height:450px;
    border:1px solid gray;
    border-radius: 10px;
    padding: 20px;
    .notice-title{
      color: white;
      margin-left: 20px;
    }
    ul li{
      font-size: 20px;
      line-height: 30px;
      color: white;

    }
  }

  .xylogo {
      display:flex;
      height: 50px;
      align-items: center;
        img{
            width:50px;
            height:50px;
        }
        p{
          margin-left: 10px;
          color:white;
          font-size: 30px;
          font-weight: bold;
        }
    }

  .loginform-container {
    position: relative;
    width: 480px;
    max-width: 100%;
    padding: 245px 35px 0;
    margin-left:1050px;
    overflow: hidden;
  }
  
  .forgive {
    display: flex;
    flex-direction: row-reverse;
    margin-top: 10px;
    a {
      color:white;
    }
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 33px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>

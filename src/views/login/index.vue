<template>
  <div class="login-wrap">
    <!-- 给组件加 class， 会把这个 class 作用到组建的根元素上 -->
    <div class="form-wrap">
      <div class="form-head">
        <img src="./logo_index.png" alt="黑马头条号">
      </div>
      <el-form
       class="form-content"
       ref="form"
       :model="form"
       :rules="rules">
        <el-form-item prop="mobile">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <!-- el-col 栅格布局 -->
            <el-col :span="14">
              <el-input v-model="form.code" placeholder="验证码">验证码</el-input>
            </el-col>
             <el-col :offset="1" :span="9">
            <el-button  @click="handleSendCode">获取验证码</el-button>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import '@/vendor/gt' // 引入极验 JavaScript SDK 文件， 通过 window.initGeetest 使用

export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '' // 后台数据名称
      },
      rules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { len: 11, message: '长度必须为11位', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { len: 6, message: '长度必须为6位', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleLogin () {
      // console.log('handleLogin!')
      // const { mobile, code } = this.form
      // 使用 form 组件的validate 方法触发校验，获取校验的结果状态
      this.$refs['form'].validate(valid => {
        if (!valid) {
          return
        }
        // 表单验证通过，提交登录请求
        this.submitLogin()
      })
    },

    submitLogin () {
      axios({
        method: 'POST',
        url: 'http://ttapi.research.itcast.cn/mp/v1_0/authorizations',
        data: this.form
      }).then(res => { // >=200 && < 400的状态码会进入 then 成功
        // console.log(res.data)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        this.$router.push({
          name: 'home'
        })
      })
        .catch((e) => [
          this.$message.error('登录失败，手机号或验证码错误')
        ])
    },

    handleSendCode () {
      const { mobile } = this.form
      axios({
        method: 'GET',
        url: `http://ttapi.research.itcast.cn/mp/v1_0/captchas/${mobile}`
      }).then(res => {
        const { data } = res.data
        window.initGeetest({
          gt: data.gt,
          challenge: data.challenge,
          offline: !data.success,
          new_captcha: data.new_captcha,
          product: 'bind' // 隐藏，直接弹出
        }, function (captchaObj) {
          captchaObj.onReady(function () {
            // 验证ready之后才能调用verify方法显示验证码
            captchaObj.verify() // 弹出验证码内容框
          }).onSuccess(function () {
            const {
              geetest_challenge: challenge,
              geetest_validate: validate,
              geetest_seccode: seccode } = captchaObj.getValidate()
            axios({
              method: 'GET',
              url: `http://ttapi.research.itcast.cn/mp/v1_0/sms/codes/${mobile}`,
              params: {
                challenge,
                validate,
                seccode
              }
            }).then(res => {
              console.log(res.data)
            })
          }).onError(function () {
          })
          // 在这里注册“发送验证码” 按钮的点击事件，然后验证用户是否用户是否输入手机号及手机格式是否正确
          // captchaObj.verify
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-wrap {
  height: 100%;
  background-color: blueviolet;
  display: flex;
  justify-content: center;
  align-items: center;
  .form-head {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    img {
      width: 200px;
    }
  }
  .form-wrap {
    width: 400px;
    // height: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    .btn-radius {
      width: 100%;
    }
  }
}
</style>

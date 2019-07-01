<template>
  <div class="login-wrap">
    <!-- 给组件加 class， 会把这个 class 作用到组建的根元素上 -->
    <el-form class="login-from" ref="form" :model="form">
      <el-form-item>
        <el-input v-model="form.mobile" placeholder="手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.code" placeholder="验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'AppLogin',
  data () {
    return {
      form: {
        mobile: '',
        code: '' // 后台数据名称
      }
    }
  },
  methods: {
    onSubmit () {
      console.log('submit!')
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
}
</style>

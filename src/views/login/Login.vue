<template>
  <div class="login">
    <div class="content">
      <el-row type="flex" justify="center" class="loCont">
        <el-form ref="loginForm" :model="user" :rules="rules" status-icon label-width="80px">
          <el-form-item label="用户名" prop="name">
            <el-input v-model="user.name"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input v-model="user.pass" type="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-row>
    </div>

  </div>
</template>

<script>
  import { Login } from "../../api/login.js"
  export default {
    methods: {
      login () {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            Login({
              data:({
                userName:this.user.name,
                password:this.user.pass
              }) })
              .then(res => {
                if (res.data.code === 200) {
                  console.log(res)
                  let u = res.data
                  let key = "userName"
                  let value = this.user.name
                  u[key] = value
                  this.$message.success(res.data.message)
                  this.$store.commit("ADD_COUNT", true)
                  this.$store.commit("ADD_USER", u)
                  this.$router.push("/")
                } else {
                  this.$message.error(res.data.message)
                }
              })
              .catch()
          } else {
            return false
          }
        })
      }
    },
    data () {
      return {
        user: {},
        rules: {
          name: [
            { required: true, message: "用户名不能为空", trigger: "blur" }
          ],
          pass: [
            { required: true, message: "密码不能为空", trigger: "blur" }
          ]
        }
      }
    }
  }
</script>
<style scoped lang="less">
  .login{
    width: 100%;
    height: 100%;
    background-color: cornflowerblue;
    position: relative;
    .content{
      position: absolute;
      top: 20%;
      right: 30%;
      width: 400px;
      height: 400px;
      background-color: wheat;
      border: 1px solid #333333;
      box-shadow: 1px 1px 20px #333333;
      .loCont{
        padding: 40px;
      }
    }
  }
</style>

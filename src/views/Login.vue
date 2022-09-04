<template>
  <div class="flex flex-center flex-verticle login" style="height: 100vh;">
    <div class="show ">
      <span class="margin-top-25 title">后台管理系统</span>

      <div class="padding-lr-10">
        <el-input class="input margin-top-20 padding-lr-15" v-model="loginUserName" placeholder="请输入6-20位用户名"
          maxlength="20" minlength="6" />
        <el-input class="input margin-top-15 padding-lr-15" show-password type="password" v-model="loginPassword"
          placeholder="请输入6-20位密码" maxlength="20" minlength="6" />
      </div>

      <div class="flex flex-between padding-lr-15 margin-top-10">
        <div>
          <el-radio-group v-model="radio" class="ml-4 padding-lr-10">
            <el-radio label="0" size="large">管理员</el-radio>
            <el-radio label="1" size="large">用户</el-radio>
          </el-radio-group>
        </div>
        <div class="noaccount animate__animated padding-lr-10" :class="{ 'animate__pulse': animate }"
          @mouseleave="HideAnimate()" @mouseover="ShowAnimate()" @click="ShowRegistry()">无账号，请先注册</div>
      </div>

      <div class="input margin-top-30">
        <el-button class="button" type="primary" @click="Login()">登录</el-button>
        <!-- <el-button class="button">取消</el-button> -->
      </div>
    </div>

    <!-- 注册页面 -->
    <div>
      <el-dialog v-model="dialogVisible" title="注册" width="40%">
        <div class="flex flex-around">
          <div class="" style="width:80px">用户名:</div>
          <el-input class=" padding-lr-15" v-model="registryUserName" placeholder="请输入6-20位用户名" maxlength="20"
            minlength="6" />
        </div>
        <div class="flex flex-around margin-top-20">
          <div style="width:80px">密码:</div>
          <el-input class=" padding-lr-15" show-password type="password" v-model="registryPassword"
            placeholder="请输入6-20位密码" maxlength="20" minlength="6" />
        </div>
        <div class="flex flex-around margin-top-20">
          <div style="width:80px">确认密码:</div>
          <el-input class=" padding-lr-15" show-password type="password" v-model="registryConfirmPassword"
            placeholder="请输入6-20位确认密码" maxlength="20" minlength="6" />
        </div>

        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessageBox } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import http from '../http/http'

const router = useRouter()

// 登录用户名
const loginUserName = ref<string>('')
// 登录密码
const loginPassword = ref<string>('')
// 注册用户名
const registryUserName = ref<string>('')
// 注册密码
const registryPassword = ref<string>('')
// 注册确认密码
const registryConfirmPassword = ref<string>('')

const radio = ref<string>('0')
// 控制动画是否显示
const animate = ref<boolean>(false)

// 展示动画
const ShowAnimate = (): void => {
  animate.value = true
}
// 隐藏动画
const HideAnimate = (): void => {
  animate.value = false
}


// 是否展示注册框
const dialogVisible = ref<boolean>(false)
// 展示对话框
const ShowRegistry = (): void => {
  dialogVisible.value = true
}

// 登录
const Login = (): void => {
  if (loginUserName.value === '' || loginPassword.value === '') {
    ElMessage({
      type: 'error',
      message: `信息不能为空！`,
    })
    return
  }
  

  http.post('/loginUsers/login', {
    name: loginUserName.value,
    password: loginPassword.value,
    permissions:radio.value
  }).then(res => {
    console.log(res)
    if(res.data.code===1){
      localStorage.setItem('userInfo',JSON.stringify(res.data.data))
      router.push('/index')
    }else{
      ElMessage({
      type: 'error',
      message: res.data.msg,
    })
    }
  })
}


</script>

<style lang="scss" scoped>
@import url('../assets/css/flex.scss');
@import url('../assets/css/position.scss');

.login {
  background-image: url('../assets/img/background.jpg');
  background-repeat: no-repeat;
  background-size: 100%;
  background-attachment: fixed;
}


.show {
  background: #ffffff;
  height: 300px;
  width: 400px;
  border-radius: 12px;
  text-align: center;

  .title {
    color: #35a7c7e8;
    display: block;
    font-size: 24px;
    font-weight: bolder;
  }

  .noaccount {
    cursor: pointer;
    color: #35a7c7e8;
    font-size: 14px;
  }

  .button {
    width: 170px;
  }
}
</style>
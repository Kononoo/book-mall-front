<script setup>
import { reactive, ref, watch } from 'vue'
import { Lock, User } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { userLoginAPI, userRegisterAPI } from '@/api/user'

// 测验代码
// const open = () => {
//   ElMessage.success('this is a successful message')
//   ElMessage({
//     type: 'warning',
//     message: 'this is a message',
//     showClose: true,
//     center: true
//   })
//   ElMessage.closeAll() // 关闭所有实例
// }

const form = ref() // 通过ref获取组件实例，然后获取Expose暴露出去的方法
const isRegister = ref(false)
const formModel = reactive({
  username: '',
  password: '',
  repassword: ''
})

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '用户名必须是3-10位的字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{3,15}$/, message: '密码必须是3-15位的非空字符', trigger: 'blur' }
    // \S表示非空字符
  ],
  repassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{3,15}$/, message: '密码必须是6-15位的非空字符', trigger: 'blur' },
    {
      validator: (rules, value, callback) => {
        if (value !== formModel.password) {
          callback(new Error('两次输入的密码不一样'))
        } else {
          callback()
        }
      },
      trigger: 'blur' // 默认change
    }
  ]
}
const register = async () => {
  await form.value.validate() // 等待成功结果
  console.log('开始注册请求')
  await userRegisterAPI(formModel)
  ElMessage({ type: 'success', message: '注册成功' })
  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  console.log('开始登录')
  const res = await userLoginAPI(formModel)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功')
  await router.push('/')
}
// 切换页面时清空数据
watch(isRegister, () => {
  formModel.username = ''
  formModel.password = ''
  formModel.repassword = ''
})
</script>

<template>
  <div class="login-page">
    <div class="login-box form">
      <!--注册相关表单-->
      <el-form ref="form" :model="formModel" :rules="rules" size="large" autocomplete="off" v-if="isRegister">
        <el-form-item>
          <h1 style="text-align: center">注册</h1>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" type="password" />
        </el-form-item>
        <el-form-item label="密码：" prop="repassword">
          <el-input v-model="formModel.repassword" :prefix-icon="Lock" placeholder="请再次输入密码" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="register" class="button" auto-insert-space>注册</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="primary" @click="isRegister = false" :underline="true"> ← 返回 </el-link>
        </el-form-item>
      </el-form>
      <!--登录相关组件-->
      <el-form ref="form" :model="formModel" :rules="rules" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1 style="text-align: center">登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input v-model="formModel.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="formModel.password" :prefix-icon="Lock" placeholder="请输入密码" name="password" type="password" />
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link ref="" type="primary" :underline="true">忘记密码</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="button" auto-insert-space @click="login">登录</el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="success" :underline="true" @click="isRegister = true">注册 →</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-page {
  height: 100vh;
  width: 100%;
  position: fixed;
  background-size: 100% 100%;
  background: url('@/assets/image/attack2.png') center / cover;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 100px 30%;

  .bg {
    background:
      url('@/assets/image/login_bg.jpg') no-repeat 60% center / 240px auto,
      url('@/assets/image/logo2.png') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }

  .login-box {
    border: 1px solid #f8f8f8;
    width: 420px;
    //margin: 180px auto;
    padding: 35px 30px 15px 35px;
    border-radius: 10px;
    box-shadow: 0 0 20px #e8dddd;
    background-color: rgba(255, 255, 255, 0.5);
  }
}
</style>

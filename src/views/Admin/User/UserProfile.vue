<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { userUpdateInfoAPI } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'

const {
  user: { id, username, phone, sex, role, address }
} = useUserStore()

// 表单数据
const formRef = ref()
const form = ref({
  id,
  username,
  phone,
  address,
  sex,
  role
})
const rules = {
  username: [
    { required: true, message: '请输入用户昵称', trigger: 'blur' },
    { pattern: /^\S{1,20}$/, message: '昵称长度需要在1-20个非空字符内', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入用户电话', trigger: 'blur' },
    { type: 'phone', message: '请输入正确的邮电话格式', trigger: ['blur', 'change'] }
  ]
}

const submitForm = async () => {
  // 等待检验效果
  await formRef.value.validate()
  // 提交修改
  await userUpdateInfoAPI(form.value)
  ElMessage.success('修改成功')
  // 更新用户数据
  const userStore = useUserStore()
  await userStore.getUserInfo()
  form.value = { ...userStore.user }
}
</script>

<template>
  <el-card title="基本资料">
    <template #header>
      <div class="header">
        <span>基本资料</span>
      </div>
    </template>
    <!-- 表单部分 -->
    <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
      <el-form-item label="用户Id">
        <el-input size="large" v-model="form.id" disabled style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="用户昵称" prop="username">
        <el-input size="large" v-model="form.username" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="用户电话" prop="phone">
        <el-input size="large" v-model="form.phone" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="用户地址" prop="address">
        <el-input size="large" v-model="form.address" clearable style="width: 500px"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-select v-model="form.sex" placeholder="请选择你的性别">
          <el-option label="中性" value="2" />
          <el-option label="男" value="1" />
          <el-option label="女" value="0" />
        </el-select>
        <!--   <el-input size="large" v-model="form.phone" clearable style="width: 500px"></el-input>-->
      </el-form-item>
      <el-form-item label="角色权限" prop="role">
        <el-select v-model="form.role" placeholder="你的身份权限">
          <el-option label="管理员" value="1" />
          <el-option label="普通用户" value="0" />
        </el-select>
        <!-- <el-input size="large" v-model="form.phone" clearable style="width: 500px"></el-input>-->
      </el-form-item>
      <el-form-item>
        <el-button color="#626AEF" size="large" @click="submitForm">提交修改</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style scoped>
.el-card {
  min-height: 100%;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

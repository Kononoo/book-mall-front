<script setup>
// 弹窗可见性  表单数据获取、校验
import { ref } from 'vue'
import { categoryAddAPI, categoryUpdateAPI } from '@/api/category.js'
import { ElMessage } from 'element-plus'

const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({
  name: '',
  description: ''
})
const rules = {
  name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,20}$/,
      message: '分类名必须是 1-20 位的非空字符',
      trigger: 'blur'
    }
  ],
  description: [{ required: true, message: '请输入分类描述', trigger: 'blur' }]
}

// 提交表单，发送请求  通知父组件
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formData.value.id
  if (isEdit) {
    await categoryUpdateAPI(formData.value)
  } else {
    await categoryAddAPI(formData.value)
  }
  ElMessage({
    type: 'success',
    message: formData.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

// 对外暴露方法open，父组件通过open传递数据，区分编辑还是添加
const open = (row) => {
  dialogVisible.value = true
  formData.value = { ...row }
}
defineExpose({ open })
</script>

<template>
  <el-dialog :title="formData.id ? '编辑分类' : '添加分类'" v-model="dialogVisible" width="30%">
    <el-form :model="formData" ref="formRef" :rules="rules" class="demo-form-inline" label-width="100px">
      <el-form-item label="分类名称" prop="name">
        <el-input v-model="formData.name" placeholder="请输入分类名称" minlength="1" />
      </el-form-item>
      <el-form-item label="分类描述" prop="description">
        <el-input v-model="formData.description" placeholder="请输入分类描述" minlength="1" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" @click="dialogVisible = false">取 消</el-button>
        <el-button size="large" type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>

<script setup>
import { ref, defineEmits, onMounted } from 'vue'
import { ElForm, ElFormItem, ElInput, ElButton, ElDialog } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { bookAddAPI, bookUpdateAPI } from '@/api/book.js'
import { ElMessage } from 'element-plus'
import { categoryListAPI } from '@/api/category.js'

const categoryList = ref([])
const getCategoryList = async () => {
  const res = await categoryListAPI()
  categoryList.value = res.data.data
  console.log(categoryList)
}
onMounted(() => {
  getCategoryList()
})

const dialogVisible = ref(false)
const formRef = ref()
const formData = ref({
  name: '',
  image: '',
  categoryId: '',
  author: '',
  price: '',
  status: 0,
  description: ''
})
const rules = {
  name: [
    { required: true, message: '请输入图书名称', trigger: 'blur' },
    {
      pattern: /^\S{1,100}$/,
      message: '图书名必须是 1-100 位的非空字符',
      trigger: 'blur'
    }
  ],
  categoryId: [{ required: true, message: '请选择图书种类', trigger: 'change' }],
  author: [{ required: true, message: '请输入图书作者', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入图书价格', trigger: 'blur' },
    {
      pattern: /^\d+(\.\d{1,2})?$/,
      message: '请输入正确的图书价格',
      trigger: 'blur'
    }
  ],
  stock: [
    { required: true, message: '请输入图书库存', trigger: 'blur' },
    { type: 'number', min: 0, message: '图书库存必须大于等于0', trigger: 'blur' }
  ],
  description: [{ required: true, message: '请输入图书描述', trigger: 'blur' }]
}

// 提交上传图书
const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formData.value.id
  if (isEdit) {
    await bookUpdateAPI(formData.value)
  } else {
    console.log(formData.value)
    await bookAddAPI(formData.value)
  }
  ElMessage({
    type: 'success',
    message: formData.value.id ? '编辑成功' : '添加成功'
  })
  dialogVisible.value = false
  emit('success')
}

// 上传图片
// const uploadUrl = `${import.meta.env.BASE_URL}api1/common/upload`     // import.meta.env.BASE_URL = /
const uploadUrl = `/common/upload` /*/api/common/upload*/
const beforeUpload = () => {
  // if(file){
  //   const suffix = file.name.split('.')[1]
  //   const size = file.size / 1024 / 1024 < 2
  //   if(['png','jpeg','jpg'].indexOf(suffix) < 0){
  //     this.$message.error('上传图片只支持 png、jpeg、jpg 格式！')
  //     this.$refs.upload.clearFiles()
  //     return false
  //   }
  //   if(!size){
  //     this.$message.error('上传文件大小不能超过 2MB!')
  //     return false
  //   }
  //   return file
  // }
}
const handleUploadSuccess = (response) => {
  // 获取文件url
  formData.value.image = response.data
  console.log(response)
}

// 打开编辑框
const open = (row) => {
  console.log(row)
  dialogVisible.value = true
  formData.value = { ...row } // 将字符串转换为数字}
  console.log(formData.value)
}
defineExpose({ open })
</script>

<template>
  <el-dialog :title="formData.id ? '编辑图书' : '添加图书'" v-model="dialogVisible" width="70%">
    <el-form :model="formData" ref="formRef" :rules="rules" class="demo-form-inline" label-width="100px">
      <el-row :gutter="20" justify="space-between">
        <el-col :span="12">
          <el-form-item label="图书名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入图书名称" minlength="1" />
          </el-form-item>
          <el-form-item label="图书作者" prop="author">
            <el-input v-model="formData.author" placeholder="请输入图书作者" />
          </el-form-item>
          <el-form-item label="图书价格" prop="price">
            <el-input v-model="formData.price" placeholder="请输入图书价格" />
          </el-form-item>
          <el-form-item label="图书图片" prop="image">
            <!-- Add an image upload component -->
            <el-upload :action="uploadUrl" class="avatar-uploader" :show-file-list="false" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
              <img v-if="formData.image" :src="formData.image" class="avatar" />
              <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>

        <el-col :span="12">
          <el-form-item label="图书种类" prop="categoryId">
            <el-select v-model="formData.categoryId" placeholder="请选择图书种类">
              <el-option v-for="category in categoryList" :key="category.id" :label="category.name" :value="category.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="售卖状态" prop="status">
            <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
          </el-form-item>
          <el-form-item label="图书库存" prop="stock">
            <el-input v-model.number="formData.stock" placeholder="请输入图书库存" />
          </el-form-item>
          <el-form-item label="图书描述" prop="description">
            <el-input v-model="formData.description" type="textarea" :rows="10" placeholder="请输入图书描述" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button size="large" type="info" @click="dialogVisible = false">取消</el-button>
        <el-button size="large" type="primary" color="#1dc779" @click="onSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.book-form {
  margin-top: 20px;
  display: flex;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  .avatar {
    width: 278px;
    height: 278px;
    display: block;
    border-radius: 5px;
  }
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 278px;
  height: 278px;
  text-align: center;
}
</style>

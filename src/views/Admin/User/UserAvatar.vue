<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { useUserStore } from '@/stores'
import { Plus, Upload } from '@element-plus/icons-vue'
import { userUpdateInfoAPI } from '@/api/user.js'
import { ElMessage } from 'element-plus'

const uploadRef = ref()
// 更新用户头像
const onUpdateAvatar = async () => {
  // 提交修改
  console.log(avatar)
  await userUpdateInfoAPI({ avatar: avatar.value })
  ElMessage.success('更新头像成功')
  // 更新用户数据
  const userStore = useUserStore()
  await userStore.getUserInfo()
  avatar.value = userStore.user.avatar
}

// 上传图片
// const uploadUrl = `${import.meta.env.BASE_URL}api1/common/upload`     // import.meta.env.BASE_URL = /
const uploadUrl = `/api/common/upload`
const userStore = useUserStore()
userStore.getUserInfo()
const avatar = ref(userStore.user.avatar)
const handleUploadSuccess = (response) => {
  // 获取文件url
  avatar.value = response.data
  console.log(response)
}
</script>

<template>
  <PageContainer title="更换头像">
    <!-- Add an image upload component -->
    <el-upload ref="uploadRef" :action="uploadUrl" class="avatar-uploader" :autofocus="false" :show-file-list="false" :on-success="handleUploadSuccess" style="margin-bottom: 10px">
      <img v-if="avatar" :src="avatar" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

    <el-button color="#27ba9b" :icon="Plus" size="large" @click="uploadRef.$el.querySelector('input').click()" style="margin-left: 150px">选择图片</el-button>
    <el-button color="#ffb302" :icon="Upload" size="large" @click="onUpdateAvatar" style="margin-left: 40px">上传头像</el-button>
  </PageContainer>
</template>

<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
  .avatar {
    width: 600px;
    height: 400px;
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

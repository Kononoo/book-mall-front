<script setup>
import { ElMessage, ElMessageBox } from 'element-plus'

const trigger = () => {
  ElMessage.success('点击成功')
  ElMessageBox.alert('hello world')
}
</script>

<template>
  <header>
    I am APP
    <el-container>
      <el-button type="primary" @click="trigger">点我</el-button>
    </el-container>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </header>

  <!--  <RouterView />-->
</template>

<style scoped></style>

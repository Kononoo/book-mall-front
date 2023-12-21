<script setup>
import { Management, Tickets, Histogram, UserFilled, User, Crop, EditPen, CaretBottom, SwitchButton } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import avatar from '@/assets/image/avatar.jpg'

const userStore = useUserStore()
const router = useRouter()

const onCommand = async (command) => {
  console.log(router)
  console.log(command)
  if (command === 'logout') {
    await ElMessageBox.confirm('你确认退出管理系统吗？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    userStore.removeToken()
    userStore.setUserInfo({})
    await router.push('/login')
  } else {
    await router.push(`admin//user/${command}`)
  }
}

// const onClick = () => {
//   console.log(router)
// }
</script>

<template>
  <el-container class="layout-container">
    <el-aside width="180px">
      <div class="el-aside__logo"></div>
      <el-menu background-color="#343744" text-color="#bfcbd9" active-text-color="#27ba9b" :default-active="$route.path" router>
        <el-menu-item index="/admin/category">
          <el-icon>
            <Management />
          </el-icon>
          <span>图书分类</span>
        </el-menu-item>
        <el-menu-item index="/admin/book">
          <el-icon>
            <Histogram />
          </el-icon>
          <span>图书管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/order">
          <el-icon>
            <Tickets />
          </el-icon>
          <span>订单管理</span>
        </el-menu-item>
        <el-sub-menu index="/admin/user">
          <template #title>
            <el-icon>
              <UserFilled />
            </el-icon>
            <span>用户管理</span>
          </template>
          <el-menu-item index="/admin/user/profile">
            <el-icon>
              <User />
            </el-icon>
            <span>基本资料</span>
          </el-menu-item>
          <el-menu-item index="/admin/user/avatar">
            <el-icon>
              <Crop />
            </el-icon>
            <span>更换头像</span>
          </el-menu-item>
          <el-menu-item index="/admin/user/password">
            <el-icon>
              <EditPen />
            </el-icon>
            <span>重置密码</span>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <strong>{{ $route.meta.title }} </strong>
        </div>
        <!-- 用户头像 -->
        <el-dropdown placement="bottom-end" @command="onCommand">
          <span class="el-dropdown__box">
            <el-avatar :src="userStore.user.avatar || avatar" />
            <el-icon><CaretBottom /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile" :icon="User"> 基本资料</el-dropdown-item>
              <el-dropdown-item command="avatar" :icon="Crop"> 更换头像</el-dropdown-item>
              <el-dropdown-item command="password" :icon="EditPen"> 重置密码</el-dropdown-item>
              <el-dropdown-item command="logout" :icon="SwitchButton"> 退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>图书管理系统 ©2023 Created by Ronan</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
.layout-container {
  height: 100vh;
  margin: 0;
  font-size: 18px;
  .el-aside {
    background-color: #343744;

    &__logo {
      height: 100px;
      width: 100%;
      background: url('@/assets/image/logo.png') no-repeat center / 100px auto;
    }

    .el-menu {
      border-right: none;
    }
  }

  .el-header {
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .el-dropdown__box {
      display: flex;
      align-items: center;

      .el-icon {
        color: #999;
        margin-left: 10px;
      }

      &:active,
      &:focus {
        outline: none;
      }
    }
  }

  .el-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    color: #666;
  }
}
</style>

<script setup>
import { useUserStore } from '@/stores/index.js'
import { ChromeFilled } from '@element-plus/icons-vue'
import avatar from '@/assets/image/avatar.jpg'
import router from '@/router'
const userStore = useUserStore()

const confirm = () => {
  console.log('用户退出登录')
  // 1 清除用户信息
  userStore.removeToken()
  userStore.setUserInfo({})

  // 2 返回到登录页
  // router.replace({path: '/login'})
  setTimeout(() => {
    router.push('/login')
  }, 500)
}
</script>

<template>
  <nav class="app-topNav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 区分登录状态和非登录状态 userStore.userInfo.token-->
        <template v-if="userStore.token">
          <li>
            <a href="javascript:;" @click="router.push('/admin')"
              ><el-icon><ChromeFilled /></el-icon>进入后台</a
            >
          </li>
          <li>
            <a href=""><i class="iconfont icon-user"></i> {{ userStore.user.username }} </a>
          </li>
          <li>
            <el-popconfirm @confirm="confirm" title="确认退出吗？" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;" @click="router.push('/order')">我的订单</a></li>
          <li><a href="javascript:;" @click="router.push('/')">会员中心</a></li>
          <li style="margin-left: 5px">
            <a href="javascript:;"><el-avatar :src="userStore.user.avatar || avatar"></el-avatar></a>
          </li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <!--                    <router-link to="/login">-->
          <!--                      <a href="javascript:;">退出登录</a>-->
          <!--                    </router-link>-->
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>

<style scoped lang="scss">
.app-topNav {
  background: #544e4e;
  min-width: 1240px;
  ul {
    display: flex;
    height: 43px;
    justify-content: flex-end;
    align-items: center;
  }
  li {
    a {
      padding: 0 15px;
      color: #cdcdcd;
      line-height: 1;
      display: inline-block;
    }
    i {
      font-size: 14px;
      margin-right: 2px;
    }
    &:hover a {
      color: $xtxColor;
    }

    ~ li {
      a {
        border-left: 2px solid #666;
      }
    }
  }
}
</style>

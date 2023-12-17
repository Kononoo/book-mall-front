<script setup></script>

<template>
  <div class="navigation container">
    <el-menu class="" mode="horizontal" :default-active="activeIndex" :ellipsis="false" unique-opened router @select="pageChangeHandler">
      <!-- 主菜单 -->
      <el-menu-item class="logo" disabled>
        <span>米莉在线书城</span>
      </el-menu-item>
      <el-menu-item index="/">首页</el-menu-item>
      <el-sub-menu index="/category">
        <template #title>图书类别</template>
        <el-menu-item v-for="item in categoryList" :key="item" :index="'/category?categoryID=' + item.categoryID + '&category=' + item.category">
          {{ item.category }}
        </el-menu-item>
      </el-sub-menu>
      <el-menu-item index="/cart">购物车</el-menu-item>
      <el-menu-item index="/order">我的订单</el-menu-item>
      <el-menu-item index="/address">收货地址 </el-menu-item>
      <!-- 搜索框 -->
      <div style="flex-grow: 1"></div>
      <div class="searchInput">
        <el-autocomplete
          placeholder="搜索"
          :suffix-icon="searchIcon"
          v-model="searchText"
          :fetch-suggestions="fetchSuggestionsHandler"
          :trigger-on-focus="true"
          @select="detailHandler"
        />
      </div>
      <!-- 用户菜单 -->
      <div style="flex-grow: 1"></div>
      <!-- <el-menu-item index="/user/register" v-if="!isLogin">注册</el-menu-item> -->
      <el-menu-item index="/user/login" v-if="!isLogin">登录 / 注册</el-menu-item>
      <el-dropdown v-else class="loginUser">
        <div>
          您好，<span style="color: #1d2731; margin-right: 0.4rem; font-weight: bold">{{ username }}</span>
          <el-icon><arrow-down /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item v-for="item in userMenu" @click="userMenuHandler(item)" :key="item">
              {{ item.title }}
            </el-dropdown-item>
            <el-dropdown-item @click="logoutHandler">注销</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.navigation {
  min-width: 1240px;
  //--el-menu-bg-color: #90caf9;
  --el-menu-active-color: $xtxColor;
  box-shadow: 0 2px 10px lightgray;

  .logo {
    cursor: default;

    span {
      font-size: 1.2rem;
      font-weight: bold;
    }
  }

  .el-menu-item.is-disabled {
    opacity: 1;
  }

  .user {
    display: flex;
    flex-direction: row;
  }

  .loginUser {
    position: relative;
    align-items: center;
    cursor: default;
    margin-right: 0.5rem;
  }

  .searchInput {
    position: relative;
    width: 40rem;
    margin-top: 14px;
    height: 50%;
    align-items: center;
  }
}
</style>

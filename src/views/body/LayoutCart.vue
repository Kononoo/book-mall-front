<script setup>
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
</script>
<template>
  <LayoutHeader />
  <LayoutNav />
  <div class="cartContainer">
    <el-table :data="cartList" v-loading="isLoading" @selection-change="selectionChange" @select-all="selectAll" ref="table">
      <template #empty>
        <div class="empty">
          <span>购物车空空的，快去添加商品吧</span>
          <el-button type="primary" @click="$router.replace({ name: 'home' })">回到首页</el-button>
        </div>
      </template>
      <el-table-column type="selection" width="60" />
      <el-table-column type="index" label="序号" width="60" />
      <el-table-column prop="coverImg" label="图片">
        <template #default="scope">
          <el-image :src="scope.row.coverImg" style="width: 80px"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="title" label="书名"></el-table-column>
      <el-table-column prop="author" label="作者"></el-table-column>
      <el-table-column label="单价">
        <template #default="scope">
          <span>{{ scope.row.price.toFixed(2) }}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="number" label="数量">
        <template #default="scope">
          <el-button @click="decrementQuantity(scope.row)">-</el-button>
          <el-input style="width: 50px" v-model="scope.row.number" @change="handleQuantityChange(scope.row)"></el-input>
          <el-button @click="incrementQuantity(scope.row)">+</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button type="text" @click="currentDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="footer">
      <div class="left">
        <el-checkbox :label="toggleAllChecked ? '取消全选' : '全选'" @change="selectAllChecked" v-model="toggleAllChecked"></el-checkbox>
        <el-button type="danger" :disabled="selectedCount === 0" @click="deleteSelected">删除</el-button>
      </div>
      <div class="right">
        <span style="margin-right: 1rem"
          >已选商品：<span style="font-size: 1.4rem">{{ selectedCount }}</span> 件</span
        >
        <span style="margin-right: 1rem"
          >合计（不含运费）：<span style="color: orange; font-size: 1.4rem">￥{{ totalPrice }}</span></span
        >
        <el-button type="primary" :disabled="selectedCount === 0" @click="settleHandler">结算</el-button>
      </div>
    </div>
  </div>
</template>

<script>
<<<<<<< HEAD:src/views/Layout/components/LayoutCart.vue
import service from '@/utils/request'
=======

import service from "@/utils/request.js";
import axios from "axios";

>>>>>>> 19ec3959f82568d7c66b67d10f9c6d3912d7c085:src/views/body/LayoutCart.vue

export default {
  name: 'CartView',
  data() {
    return {
<<<<<<< HEAD:src/views/Layout/components/LayoutCart.vue
      cartList: [
        {
          orderID: 1,
          coverImg: new URL('../../../assets/image/attack1.png', import.meta.url).href,
          title: 'Book 1',
          author: 'Author 1',
          price: 20.0,
=======
      userId:null,
      cartList: [{
        orderID: 1,
        coverImg: new URL("@/assets/image/attack1.png",import.meta.url).href,
        title: "Book 1",
        author: "Author 1",
        price: 20.00,
        number: 1,
        checked: false
      },
        {
          orderID: 2,
          coverImg: new URL("@/assets/image/attack2.png",import.meta.url).href,
          title: "Book 2",
          author: "Author 2",
          price: 25.00,
>>>>>>> 19ec3959f82568d7c66b67d10f9c6d3912d7c085:src/views/body/LayoutCart.vue
          number: 1,
          checked: false
        },
        {
          orderID: 2,
          coverImg: new URL('../../../assets/image/attack2.png', import.meta.url).href,
          title: 'Book 2',
          author: 'Author 2',
          price: 25.0,
          number: 1,
          checked: false
        }
      ],
      selectedCount: 0,
      totalPrice: '0.00',
      isLoading: true,
      toggleAllChecked: false,
      currentPage: 1,
      pageSize: 5
    }
  },

  mounted() {
    // var axios = require('axios');
    // //获取用户信息
    // var getUserConfig = {
    //   method: 'get',
    //   url: 'http://localhost/user/',
    // }
    // axios(getUserConfig)
    //   .then(function (response) {
    //     var user = JSON.stringify(response.data);
    //     this.userId = user.id;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
    // //获取购物车数据
    // var config = {
    //   method: 'get',
    //   url: 'http://localhost/cart/list?userId='+this.userId,
    //   headers: {
    //   }
    // };
    // axios(config)
    //     .then(function (response) {
    //       this.cartList = JSON.stringify(response.data);
    //     })
    //     .catch(function (error) {
    //       console.log(error);
    //     });

  },

  methods: {
    // 点击减一按钮
    decrementQuantity(row) {
      if (row.number > 1) {
        row.number--
        this.handleQuantityChange(row)
      }
    },
    // 点击加一按钮
    incrementQuantity(row) {
      row.number++
      this.handleQuantityChange(row)
    },
    // 多选事件
    selectionChange(values) {
      // console.log(this.toggleAllChecked);
      console.log(values)
      this.cartList.forEach((item) => {
        item.checked = false
      })
      let price = 0
      this.selectedCount = values.length
      values.forEach((item) => {
        item.checked = true
        price += item.price * item.number
      })
      this.totalPrice = price.toFixed(2).toString()
    },
    // 全选框事件
    selectAllChecked() {
      this.$refs['table'].toggleAllSelection()
    },
    // 删除当前行
    currentDelete(row) {
      // console.log(row.orderID);
      service({
        method: 'get',
        url: `/order/delete?id=${row.orderID}`,
        headers: {
          token: store.state.token
        }
      }).then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
        this.refresh()
      })
    },
    // 删除选中行
    deleteSelected() {
      let rows = this.$refs['table'].getSelectionRows()
      rows.forEach((item) => {
        service({
          method: 'get',
          url: `/order/delete?id=${item.orderID}`, //根据id删除
          headers: {
            token: store.state.token
          }
        }).then(() => {
          this.refresh()
        })
      })
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    },
    // 结算事件
    settleHandler() {
      let rows = this.$refs['table'].getSelectionRows()
      rows.forEach((item) => {
        service.post(`/order/update`, { ...item, orderState: 2 }).then((res) => {
          // console.log(res);
<<<<<<< HEAD:src/views/Layout/components/LayoutCart.vue
          this.$router.replace({ name: 'settle' })
        })
      })
=======
          this.$router.replace({ name: "settle" });
        });
      });
      //清空购物车
      // var shopConfig = {
      //   method: 'delete',
      //   url: 'http://localhost/cart/clean?userId='+this.userId,
      //   headers: {
      //     'User-Agent': 'Apifox/1.0.0 (https://apifox.com)'
      //   }
      // };
      //
      // axios(shopConfig)
      //     .then(function (response) {
      //       JSON.stringify(response.data);
      //     })
      //     .catch(function (error) {
      //       console.log(error);
      //     });
>>>>>>> 19ec3959f82568d7c66b67d10f9c6d3912d7c085:src/views/body/LayoutCart.vue
    },
    // 数量为0或空时自动设为1
    handleQuantityChange(row) {
      console.log(row)
      if (parseInt(row.number) <= 0 || row.number === '') {
        row.number = 1
      }
      let price = 0
      this.cartList.forEach((item) => {
        if (item.checked) {
          price += item.price * item.number
        }
      })
      this.totalPrice = price.toFixed(2).toString()
    },
    refresh() {
      let userID = store.state.userInfo.userID
      service({
        method: 'get',
        url: `/order/selectById/${userID}?orderState=1`,
        headers: {
          token: store.state.token
        }
      }).then((res) => {
        console.log(res.data)
        res.data.forEach((item) => {
          Object.assign(item, ...item.book, item)
          delete item['Book']
          // console.log(item);
        })
        this.cartList = res.data
        // console.log(this.cartList);
      })
    }
  },
  watch: {
    // 监听选中数量并更改全选框状态
    selectedCount(oldVal) {
      if (oldVal === this.cartList.length) {
        this.toggleAllChecked = true
      } else {
        this.toggleAllChecked = false
      }
      // console.log(this.toggleAllChecked);
    }
  },
  async beforeMount() {
    // orderState=1时为待付款状态
    this.isLoading = true
    // await this.refresh();  测试时注释防止不断刷新数据
    this.isLoading = false
  }
}
</script>

<style lang="scss" scoped>
.cartContainer {
  display: flex;
  margin: 0 auto;
  text-align: center;

  .el-table {
    width: 100%;

    .empty {
      display: flex;
      flex-direction: column;
      margin-bottom: 1rem;
      justify-content: center;
      align-items: center;

      .el-button {
        width: 6rem;
      }
    }
  }

  .footer {
    width: 100%;
    padding: 0 20px;
    backdrop-filter: blur(10px);
    background-color: #e3e2e2;
    height: 60px;
    bottom: 0;
    position: fixed;
    border-top: 1px solid #ccc;
    z-index: 999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    align-self: flex-start;

    .left {
      display: flex;
      align-items: center;

      .el-checkbox {
        margin-right: 1rem;
      }
    }

    .right {
      height: 60px;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

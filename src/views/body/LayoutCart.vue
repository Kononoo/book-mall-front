<script setup>
import { ref } from 'vue'
import { orderSubmitAPI } from '@/api/order.js'
import { useUserStore } from '@/stores/index.js'
import { shoppingCartDel, shoppingCartList } from '@/api/cart.js'
import { ElMessage, ElMessageBox } from 'element-plus'

// 点击减一按钮
const decrementQuantity = (row) => {
  if (row.bookCount > 1) {
    row.bookCount--
    handleQuantityChange(row)
  }
}
// 点击加一按钮
const incrementQuantity = (row) => {
  row.bookCount++
  handleQuantityChange(row)
}

// 加载购物车数据
const isLoading = ref(false)
const cartList = ref([])
const getCartList = async () => {
  isLoading.value = true
  const userId = useUserStore().user.id
  const res = await shoppingCartList(userId)
  console.log(res.data)
  cartList.value = res.data.data
  isLoading.value = false
}
getCartList()

const params = ref({
  userId: '',
  bookId: '',
  bookCount: ''
})
// 总价格处理
const totalPrice = ref(cartList.value.reduce((pre, next) => pre + next.bookCount * next.bookPrice, 0))
const handleQuantityChange = async (row) => {
  console.log(row)
  if (parseInt(row.bookCount) <= 0 || row.bookCount === '') {
    row.bookCount = 1
  }
  // 计算总价
  let price = 0
  cartList.value.forEach((item) => {
    console.log(item)
    price += item.bookPrice * item.bookCount
  })
  totalPrice.value = price

  // 调用后端同步数据
  params.value.userId = useUserStore().user.id
  params.value.bookId = row.bookId
  params.value.bookCount = row.bookCount
  console.log(params.value)
  await shoppingCartDel(params.value)
  // 刷新数据
  // await getCartList()
}

// 改变订单
const removeItem = async (row) => {
  // 调用后端同步数据
  params.value.userId = useUserStore().user.id
  params.value.bookId = row.bookId
  params.value.bookCount = 0
  console.log(params.value)
  await shoppingCartDel(params.value)
  // 刷新数据
  await getCartList()
}
// 提交订单
const submitOrder = async () => {
  ElMessageBox.confirm('你确定要下单支付?', '下单', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'success'
  })
    .then(async () => {
      const res = await orderSubmitAPI(useUserStore().user.id)
      console.log(res)
      ElMessage.success('下单成功')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消下单'
      })
    })
  // const res = await orderSubmitAPI(useUserStore().user.id)
  // console.log(res)
  // ElMessage.success('下单成功')

  // 刷新数据
  await getCartList()
}
</script>

<template>
  <div class="container" style="margin-top: 20px">
    <el-card class="order-card">
      <template #header>
        <h2>购物车查看</h2>
      </template>
      <el-table :data="cartList" v-loading="isLoading" ref="table">
        <template #empty>
          <div class="empty">
            <span style="font-size: 20px">购物车空空的，快去添加商品吧</span>
            <el-link :underline="false" style="font-size: 20px; margin-left: 40px; margin-bottom: 5px" type="success" @click="$router.replace({ name: 'home' })">回到首页</el-link>
          </div>
        </template>

        <el-table-column type="index" label="序号" width="100" />
        <el-table-column prop="bookImage" label="图书图片">
          <template v-slot="{ row }">
            <el-image
              v-if="row.bookImage"
              :src="row.bookImage"
              alt="图书封面"
              :preview-src-list="[row.bookImage]"
              :preview-teleported="true"
              style="width: auto; height: 40px; border: none; cursor: pointer"
            />
            <span v-else>暂无图片</span>
          </template>
        </el-table-column>
        <el-table-column prop="bookName" label="图书名称">
          <template #default="{ row }">
            <el-link type="primary" :underline="false" @click="$router.push(`/detail/${row.bookId}`)">{{ row.bookName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template #default="scope">
            <span>{{ scope.row.bookPrice.toFixed(2) }} 元</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" prop="createTime"></el-table-column>
        <el-table-column prop="bookCount" label="数量">
          <template #default="scope">
            <el-button @click="decrementQuantity(scope.row)">-</el-button>
            <el-input style="width: 50px" v-model="scope.row.bookCount" @change="handleQuantityChange(scope.row)"></el-input>
            <el-button @click="incrementQuantity(scope.row)">+</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <el-button color="#cf4444" plain @click="removeItem(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="footer">
        <span style="margin-right: 1rem"
          >合计（不含运费）：<span style="color: orange; font-size: 1.4rem">￥{{ totalPrice }}</span></span
        >
        <el-button size="large" color="#27ba9b" @click="submitOrder">结算</el-button>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.cartContainer {
  display: flex;
  margin: 0 auto;
  text-align: center;

  .el-table {
    width: 100%;

    .empty {
      font-size: 18px;
      display: flex;
      align-items: center;
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

.footer {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  .el-button {
    margin-right: 120px;
    width: 100px;
    height: 50px;
  }
}
</style>

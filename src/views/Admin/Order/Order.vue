<script setup>
import { ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { orderPageAPI, orderChangeStatus, orderGetByIdAPI } from '@/api/order.js'

// 分页查询参数
const total = ref(5)
const orderTime = ref([]) // '2023-12-21 00:00:00', '2023-12-22 23:59:59'
const params = ref({
  currentPage: 1,
  pageSize: 5,
  searchUserName: '',
  begin: '',
  end: ''
})
// {username, begin, end}

// 请求订单数据
const loading = ref(false)
const orderList = ref([])
const getOrderList = async () => {
  loading.value = true
  // 分页获取订单数据
  const res = await orderPageAPI({
    currentPage: params.value.currentPage,
    pageSize: params.value.pageSize,
    data: { username: params.value.searchUserName, begin: params.value.begin, end: params.value.end }
  })
  orderList.value = res.data.data.records
  total.value = res.data.data.total
  loading.value = false
}
onMounted(() => {
  getOrderList()
})

const onSizeChange = (pageSize) => {
  params.value.pageSize = pageSize
  params.value.currentPage = 1
  getOrderList()
}
const onCurrentChange = (currentPage) => {
  params.value.currentPage = currentPage
  getOrderList()
}

const handleSearch = () => {
  params.value.currentPage = 1
  getOrderList()
}

// 获取订单详情
const showOrderDetails = async (row) => {
  try {
    const res = await orderGetByIdAPI(row.id)
    const orderDetails = res.data.data
    // Show the order details using a dialog or other UI component
    console.log('Order Details:', orderDetails)
  } catch (error) {
    console.error('Error in showOrderDetails:', error)
  }
}

// 订单状态信息转换
const getOrderStatusText = (status) => {
  switch (status) {
    case 0:
      return '待审核'
    case 1:
      return '已完成'
    case 2:
      return '已取消'
    default:
      return '未知状态'
  }
}

// 编辑订单状态
const auditOrder = async (row, newStatus) => {
  try {
    await ElMessageBox.confirm('审核订单？', '温馨提示', {
      type: 'warning',
      confirmButtonText: '确认',
      cancelButtonText: '取消'
    })
    await orderChangeStatus({ orderId: row.id, newStatus: newStatus })
    ElMessage.success('订单审核成功')
    await getOrderList()
  } catch (error) {
    console.error('编辑出错：:', error)
  }
}

// 监听订单时间参数
watch(orderTime, (val) => {
  if (val && val.length >= 2) {
    params.value.begin = val[0]
    params.value.end = val[1]
  } else {
    params.value.begin = ''
    params.value.end = ''
  }
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="search-bar">
        <el-input v-model="params.searchUserName" placeholder="请输入用户名" clearable style="width: 200px; margin-right: 20px" />
        <el-date-picker
          v-model="orderTime"
          clearable
          value-format="yyyy-MM-dd HH:mm:ss"
          type="datetimerange"
          placeholder="选择日期"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :default-time="['00:00:00', '23:59:59']"
          style="width: 350px; margin-left: 20px; margin-right: 30px"
        ></el-date-picker>
        <el-button type="primary" @click="handleSearch" color="#1dc779" style="width: 80px" size="large">搜索</el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="orderList" stripe class="tableBox">
      <el-table-column prop="id" label="订单号" width="180">
        <template #default="scope">
          <el-link type="primary" :underline="false" @click="showOrderDetails(scope.row)">{{ scope.row.id }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="username" label="用户名" />
      <el-table-column prop="totalAmount" label="订单总金额">
        <template #default="scope"> ￥ {{ scope.row.totalAmount }}</template>
      </el-table-column>
      <el-table-column prop="payAmount" label="支付金额">
        <template #default="scope"> ￥ {{ scope.row.payAmount }}</template>
      </el-table-column>
      <el-table-column prop="payStatus" label="支付状态">
        <template #default="scope">
          {{ scope.row.payStatus === 1 ? '已支付' : '未支付' }}
        </template>
      </el-table-column>
      <el-table-column prop="orderStatus" label="订单状态">
        <template #default="scope">
          {{ getOrderStatusText(scope.row.orderStatus) }}
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="下单时间" width="160" sortable>
        <template #default="scope">{{ scope.row.createTime }}</template>
      </el-table-column>
      <el-table-column prop="checkoutTime" label="结账时间" width="160" sortable>
        <template #default="scope">{{ scope.row.checkoutTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template #default="scope">
          <el-button type="primary" color="#27ba9b" size="default" @click="auditOrder(scope.row, 1)" v-if="scope.row.orderStatus === 0"> 审核订单 </el-button>
          <el-button type="primary" color="#27ba9b" size="default" @click="auditOrder(scope.row, 0)" v-else> 订单不予通过 </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <el-pagination
      :page-sizes="[5, 10, 15, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 40px; justify-content: right"
    ></el-pagination>
  </el-card>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

//.search-bar {
//  display: flex;
//  justify-content: space-between;
//  align-items: center;
//}

.tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}
</style>

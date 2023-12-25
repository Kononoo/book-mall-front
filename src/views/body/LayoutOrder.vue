<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/index.js'
import { orderGetListAPI } from '@/api/order.js'

// 获取订单
const orderList = ref([])
const getOrderList = async () => {
  const userId = useUserStore().user.id
  const res = await orderGetListAPI(userId)
  console.log(res.data)
  orderList.value = res.data.data
}
getOrderList()

// 获取订单详情
const isDetail = ref(false)
const orderDetail = ref([])
const showDetail = (row) => {
  isDetail.value = true
  orderDetail.value = [row]
  console.log(orderDetail)
}

// 付款操作
const payHandler = () => {}
</script>

<template>
  <div class="container" style="margin-top: 20px">
    <el-card class="order-card">
      <div class="cartContainer">
        <div class="content">
          <el-table :data="orderList" :default-sort="{ prop: 'orderState', order: 'ascending' }" ref="table" empty-text="啥也没有呢">
            <el-table-column prop="id" label="订单号" width="180" sortable />
            <!-- <el-table-column label="图片">-->
            <!--   <template #default="scope">-->
            <!--     <el-image :src="scope.row.id" style="width: 80px"></el-image>-->
            <!--   </template>-->
            <!-- </el-table-column>-->
            <el-table-column prop="username" label="用户名" width="80px"></el-table-column>
            <el-table-column label="订单总金额" width="100">
              <template #default="scope">
                <span>{{ scope.row.totalAmount.toFixed(2).toString() }}元</span>
              </template>
            </el-table-column>
            <el-table-column label="支付金额" width="100">
              <template #default="scope">
                <span>{{ scope.row.payAmount.toFixed(2).toString() }}元</span>
              </template>
            </el-table-column>
            <el-table-column prop="payStatus" label="付款状态" sortable>
              <template #default="scope">
                <el-tag type="danger" v-if="scope.row.payStatus === 0">未付款</el-tag>
                <el-tag v-else>已付款</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="orderStatus" sortable label="交易状态">
              <template #default="scope">
                <el-tag v-if="scope.row.orderStatus === 0" type="danger">等待发货</el-tag>
                <el-tag v-else-if="scope.row.orderStatus === 1" type="success">已提交订单</el-tag>
                <el-tag v-else-if="scope.row.orderStatus === 2" type="warning">已取消订单</el-tag>
                <!-- <span>{{ getOrder(scope.row.orderState) }}</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="phone" label="收货人号码"></el-table-column>
            <el-table-column prop="address" label="收货人地址" width="100"></el-table-column>
            <el-table-column prop="checkoutTime" label="下单时间"></el-table-column>
            <el-table-column prop="createTime" label="结账时间"></el-table-column>
            <el-table-column label="操作" align="center">
              <template #default="scope">
                <div class="btnGroup">
                  <el-button link type="primary" @click="showDetail(scope.row)">订单详情</el-button>
                  <el-button link v-if="scope.row.orderState === 0" @click="cancelOrder(scope.row)">取消订单</el-button>
                  <!--   <el-button type="danger" link @click="deleteOrder(scope.row.orderID)">删除订单</el-button>-->
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <el-dialog v-model="isDetail" title="订单详情">
      <div class="detailContainer" v-for="record in orderDetail" :key="record.id">
        <div class="content">
          <!--v-if="record.id === 1737154732730851300"-->
          <div>
            订单编号：<span>{{ record.id }}</span>
          </div>
          <div>
            收货人姓名：<span>{{ record.username }}</span>
          </div>
          <div>
            收货地址：<span>{{ record.address }}</span>
          </div>
          <div>
            订单价格：<span>￥{{ record.totalAmount }}</span>
          </div>
          <div>
            手机号码：<span>{{ record.phone }}</span>
          </div>
          <div style="margin-top: 2rem">
            订单状态：
            <el-steps :active="record.orderStatus - (record.payStatus === 1 ? 0 : 1)" simple finish-status="success" style="margin-top: 1rem">
              <el-step :title="record.orderStatus === 0 ? '订单关闭' : '提交订单'" :status="record.orderStatus === 0 ? 'error' : 'success'"></el-step>
              <el-step :title="record.payStatus === 1 ? '已付款' : '未付款'" :status="record.payStatus === 1 ? 'success' : ''"></el-step>
              <el-step :title="record.orderStatus === 3 ? '已发货' : '等待发货'" :status="record.orderStatus === 3 ? 'success' : ''"></el-step>
              <el-step :title="record.orderStatus === 4 ? '订单完成' : '等待收货'" :status="record.orderStatus === 4 ? 'success' : ''"></el-step>
            </el-steps>
          </div>
        </div>
        <div class="footer">
          <el-button v-if="record.payStatus === 0 && record.orderStatus === 2" @click="payHandler" type="primary">付款</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.cartContainer {
  width: 100%;
  margin: 0 auto;

  .content {
    .el-table {
      .el-button {
        margin: 0 0 10px;
      }

      .el-button:last-child {
        margin-bottom: 0;
      }

      .btnGroup {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
      }
    }

    .detailContainer {
      display: flex;
      flex-direction: column;
      padding: 1rem;

      .content {
        div {
          margin-bottom: 0.4rem;
          padding: 40px 0px;
          span {
            color: #424242;
            font-weight: bold;
          }
        }
      }

      .footer {
        margin-top: 2rem;
        text-align: right;
      }
    }
  }
}
.detailContainer {
  .content {
    div {
      padding: 8px 0;
      font-size: 16px;
    }
  }
}
</style>

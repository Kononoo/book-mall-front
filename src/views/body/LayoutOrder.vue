<template>
  <div class="cartContainer">
    <div class="content">
      <el-table :data="cartList.records" :default-sort="{ prop: 'orderState', order: 'ascending' }" ref="table" empty-text="啥也没有呢">
        <el-table-column prop="id" label="订单号" width="100" sortable />
        <el-table-column label="图片">
          <template #default="scope">
            <el-image :src="scope.row.id" style="width: 80px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="id" label="书名"></el-table-column>
        <el-table-column label="价格" width="100">
          <template #default="scope">
            <span>{{ scope.row.totalAmount.toFixed(2).toString() }}元</span>
          </template>
        </el-table-column>
        <el-table-column prop="payStatus" label="付款状态" sortable>
          <template #default="scope">
            <el-tag type="danger" v-if="scope.row.payStatus === 0">未付款</el-tag>
            <el-tag v-else>已付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="orderStatus" sortable :filters="stateFilter" :filter-method="filterState" label="交易状态">
          <template #default="scope">
            <el-tag v-if="scope.row.orderStatus === 0" type="danger">订单关闭</el-tag>
            <el-tag v-else-if="scope.row.orderStatus === 1">等待付款</el-tag>
            <el-tag v-else-if="scope.row.orderStatus === 2">已提交订单</el-tag>
            <el-tag v-else-if="scope.row.orderStatus === 3" type="warning">已发货</el-tag>
            <el-tag v-else-if="scope.row.orderStatus === 4" type="success">订单完成</el-tag>
            <!-- <span>{{ getOrder(scope.row.orderState) }}</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="username" label="收货人姓名" sortable :filters="nameFilter" :filter-method="filterName"></el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <div class="btnGroup">
              <el-button type="success" link v-if="scope.row.orderState === 3" @click="confirmOrder(scope.row)">确认收货</el-button>
              <el-button link type="primary" @click="changeDetail(scope.row.orderID)">订单详情</el-button>
              <el-button link v-if="scope.row.orderState === 2" @click="cancelOrder(scope.row)">取消订单</el-button>
              <el-button type="danger" link @click="deleteOrder(scope.row.orderID)">删除订单</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog v-model="isDetail" :title="cartList.pages">
      <div class="detailContainer" v-for="record in cartList.records">
        <div class="content" v-if="record.id === 1737154732730851300">
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
            订单价格：<span>{{ record.totalAmount }}</span>
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

<script>
import service from '@/utils/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { markRaw } from 'vue'

export default {
  name: 'OrderView',
  data() {
    return {
      cartList: [],
      isDetail: false,
      stateFilter: [
        { text: '订单关闭', value: '0' },
        { text: '已提交订单', value: '2' },
        { text: '已发货', value: '3' },
        { text: '订单完成', value: '4' }
      ]
    }
  },
  methods: {
    filterName(value, row, column) {
      const prop = column['property']
      // console.log(row[prop], value);
      return row[prop].toString() === value
    },
    filterState(value, row, column) {
      const prop = column['property']
      // console.log(row[prop], value);
      return row[prop].toString() === value
    },
    confirmOrder(row) {
      ElMessageBox.confirm('确认收货吗？这一操作不可逆。', '提示', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          service({
            method: 'post',
            url: `/order/update`,
            headers: {
              token: store.state.token
            },
            data: {
              ...row,
              payState: 1,
              orderState: 4
            }
          })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '确认收货成功'
              })
              service({
                method: 'post',
                url: `/book/addSoldNum/${row.bookID}`
              }).then((res) => {
                console.log(res.data)
              })
              this.refresh()
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          // console.log(err);
        })
    },
    cancelOrder(row) {
      ElMessageBox.confirm('确认要取消订单吗？这一操作不可逆。', '警告', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          service({
            method: 'post',
            url: `/order/update`,
            headers: {},
            data: {
              ...row,
              payState: 0,
              orderState: 0
            }
          })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '取消成功'
              })
              this.refresh()
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          // console.log(err);
        })
    },
    deleteOrder(id) {
      ElMessageBox.confirm('确认要删除订单吗？这一操作不可逆。', '警告', {
        type: 'warning',
        confirmButtonText: '确认',
        cancelButtonText: '取消'
      })
        .then(() => {
          service({
            method: 'get',
            url: `/order/delete?id=${id}`,
            headers: {
              token: store.state.token
            }
          })
            .then(() => {
              ElMessage({
                type: 'success',
                message: '删除成功'
              })
              this.refresh()
            })
            .catch(() => {
              ElMessage({
                type: 'info',
                message: '取消删除'
              })
            })
        })
        .catch((err) => {
          // console.log(err);
        })
    },
    // 付款操作
    payHandler() {
      service.post(`/order/update`, { ...this.detail, payState: 1 }).then((res) => {
        // console.log(res);
        ElMessage({
          type: 'success',
          message: '付款成功'
        })
        setTimeout(() => {
          window.location.reload()
        }, 200)
      })
    },

    refresh() {
      // 模拟从后端获取的订单数据
      const mockData = {
        records: [
          {
            id: 1737154732730851300,
            userId: 1,
            username: 'Morita Yota',
            totalAmount: 356,
            payAmount: 356,
            payStatus: 1,
            orderStatus: 1,
            phone: '13578512654',
            address: '上海',
            detail: new URL('@/assets/image/三体.png', import.meta.url).href,
            createTime: '2023-12-20 00:55:38',
            checkoutTime: '2023-12-20 00:55:38',
            idDeleted: 0
          },
          {
            id: 1737150860029304800,
            userId: 1,
            username: 'Morita Yota',
            totalAmount: 712,
            payAmount: 712,
            payStatus: 0,
            orderStatus: 1,
            phone: '13578512654',
            address: 'wuhan',
            detail: new URL('@/assets/image/三体.png', import.meta.url).href,
            createTime: '2023-12-20 00:40:14',
            checkoutTime: '2023-12-20 00:40:14',
            idDeleted: 0
          }
        ],
        total: 2,
        size: 10,
        current: 1,
        orders: [],
        optimizeCountSql: true,
        searchCount: true,
        maxLimit: null,
        countId: null,
        pages: 1
      }

      this.cartList = mockData
    },

    // 重新获取数据
    // refresh() {
    //   service({
    //     method: "get",
    //     url: `/order/selectById/${store.state.userInfo.userID}`,
    //     headers: {
    //       token: store.state.token,
    //     },
    //   }).then((res) => {
    //     console.log(res.data);
    //     this.cartList = res.data;
    //   });
    // },

    //   async changeDetail() {
    //     // 模拟从后端获取订单详细信息
    //     const mockDetail = {
    //       orderID: 1,
    //       name: "John Doe",
    //       orderAddress: "123 Main St, City",
    //       price: 20.00,
    //       telephone: "123-456-7890",
    //       orderState: 3,
    //       payState: 3,
    //       title: "订单一"
    //     };
    //
    //     this.detail = mockDetail;
    //     this.isDetail = true;
    //   },
    // },
    // 打开详细面板
    async changeDetail() {
      this.isDetail = true
    }
  },

  async beforeMount() {
    // orderState=2时为待付款状态
    await this.refresh()
  }
}
</script>

<style lang="scss" scoped>
.cartContainer {
  width: 90%;
  margin: 0 auto;

  .content {
    .el-table {
      .el-button {
        margin: 0;
        margin-bottom: 10px;
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
</style>

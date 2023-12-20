<script setup>
import { ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import EditDialog from '@/views/Admin/Category/components/EditDialog.vue'
import { categoryDelAPI, categoryPageAPI } from '@/api/category.js'
import { ElMessage, ElMessageBox } from 'element-plus'

// 分页查询 总条数
const total = ref()
const params = ref({
  currentPage: 1,
  pageSize: 5
})

// 子组件、加载效果
const dialog = ref()
const loading = ref(false)
const categoryList = ref([
  {
    id: 1,
    name: '漫画',
    description: 'all right',
    createTime: '2023-12-18 03:36:52',
    updateTime: '2023-12-18 03:36:57'
  },
  {
    id: 10050,
    name: '历史',
    description: '风流倜傥',
    createTime: '2023-12-20 18:32:50',
    updateTime: '2023-12-20 18:32:50'
  },
  {
    id: 10052,
    name: '科学',
    description: '发现真理',
    createTime: '2023-12-20 18:42:58',
    updateTime: '2023-12-20 18:43:54'
  }
])
// 获取分类数据
const getCategoryList = async () => {
  loading.value = true
  const res = await categoryPageAPI(params.value)
  console.log(res)
  // 分别获取记录和总条数
  categoryList.value = res.data.data.records
  total.value = res.data.data.total
  loading.value = false
}
getCategoryList()

// 分页管理
const onSizeChange = (pageSize) => {
  params.value.pageSize = pageSize
  params.value.currentPage = 1
  getCategoryList()
}
const onCurrentChange = (currentPage) => {
  params.value.currentPage = currentPage
  getCategoryList()
}

// 编辑、添加、删除分类数据
const addCategory = () => {
  dialog.value.open({})
}
const onEditCategory = (row) => {
  dialog.value.open(row)
}
const onDelCategory = async (row) => {
  await ElMessageBox.confirm('你确定要删除该分类吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await categoryDelAPI(row.id)
  ElMessage.success('删除成功')
  await getCategoryList()
}
// 修改或添加成功的回调
const onSuccess = () => {
  getCategoryList()
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <el-button type="primary" @click="addCategory" color="#27ba9b" size="large">+ 新增图书分类</el-button>
    </template>
    <el-table v-loading="loading" :data="categoryList" stripe class="tableBox">
      <el-table-column prop="id" label="分类Id" sortable />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column prop="description" label="分类描述" />
      <el-table-column prop="updateTime" label="更新时间" sortable>
        <template v-slot="scope">
          {{ scope.row.updateTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- row就是articleList的一项，$index是下标 -->
        <template #default="scope">
          <el-button type="primary" color="#626aef" size="large" :icon="Edit" @click="onEditCategory(scope.row)" />
          <el-button type="danger" size="large" :icon="Delete" @click="onDelCategory(scope.row)" />
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <el-pagination
      :page-sizes="[3, 5, 7, 10]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 30px; justify-content: center"
    ></el-pagination>
    <!-- 编辑、添加框 -->
    <EditDialog ref="dialog" @success="onSuccess"></EditDialog>
  </el-card>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}
.tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}
.el-table-column .cell {
  font-weight: bold;
}
</style>

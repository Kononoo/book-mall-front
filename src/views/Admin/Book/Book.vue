<script setup>
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { bookDelAPI, bookPageAPI } from '@/api/book.js'
import BookDialog from '@/views/Admin/Book/components/BookDialog.vue'
import { Delete, Edit } from '@element-plus/icons-vue'

// 分页查询参数
const total = ref(0)
const params = ref({
  currentPage: 1,
  pageSize: 5,
  keyWord: ''
})
const loading = ref(false)
const dialog = ref()
const bookList = ref([
  {
    id: 2,
    name: '你的名字',
    categoryId: 1,
    author: '新海诚',
    price: 89.0,
    stock: 88,
    image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/107124790_p0.png',
    status: 1,
    description: '好看就对了',
    createTime: '2023-12-17 23:26:05',
    updateTime: '2023-12-21 02:02:02',
    isDeleted: 1,
    categoryName: '漫画'
  },
  {
    id: 1,
    name: '你的名字',
    categoryId: 1,
    author: '新海诚',
    price: 89.0,
    stock: 82,
    image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/iTab-l8q2rq.png',
    status: 1,
    description: '好看就对了',
    createTime: '2023-12-17 23:26:05',
    updateTime: '2023-12-20 00:52:06',
    isDeleted: 0,
    categoryName: '漫画'
  }
])

// 获取图书列表
const getBookList = async () => {
  try {
    loading.value = true
    const res = await bookPageAPI(params.value)
    bookList.value = res.data.data.records
    total.value = res.data.data.total
  } catch (error) {
    console.error('Error in getBookList:', error)
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  getBookList()
})

// 分页管理
const onSizeChange = (pageSize) => {
  params.value.pageSize = pageSize
  params.value.currentPage = 1
  getBookList()
}
const onCurrentChange = (currentPage) => {
  params.value.currentPage = currentPage
  getBookList()
}

// 图书搜索
const handleSearch = () => {
  params.value.currentPage = 1
  getBookList()
}

// 添加、编辑、删除图书操作
const onAddBook = () => {
  dialog.value.open({})
}
const onEditBook = (row) => {
  dialog.value.open(row)
}
const onDelBook = async (row) => {
  await ElMessageBox.confirm('你确定要删除该图书吗?', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await bookDelAPI({ id: row.id })
  ElMessage.success('删除成功')
  await getBookList()
}

const onSuccess = () => {
  getBookList()
}

// 样式
const tableRowClassName = (rowIndex) => {
  if (rowIndex === 1) {
    return 'warning-row'
  } else if (rowIndex === 3) {
    return 'success-row'
  }
  return ''
}
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="search-bar">
        <el-input v-model="params.keyWord" placeholder="请输入关键词" clearable style="width: 300px; margin-right: 40px" />
        <el-button type="primary" @click="handleSearch" color="#1dc779" size="large" style="width: 100px">搜索 </el-button>
        <el-button type="primary" @click="onAddBook" color="#27ba9b" size="large" style="float: right">+ 添加图书 </el-button>
      </div>
    </template>
    <el-table v-loading="loading" :data="bookList" stripe class="tableBox" :row-class-name="tableRowClassName">
      <el-table-column prop="name" label="图书名称">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.name }}</el-link>
        </template>
      </el-table-column>
      <el-table-column prop="image" label="图书图片">
        <template v-slot="{ row }">
          <el-image
            v-if="row.image"
            :src="row.image"
            alt="图书封面"
            :preview-src-list="[row.image]"
            :preview-teleported="true"
            style="width: auto; height: 40px; border: none; cursor: pointer"
          />
          <span v-else>暂无图片</span>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="图书种类" />
      <el-table-column prop="author" label="图书作者" />
      <el-table-column prop="price" label="图书价格" sortable>
        <template #default="scope"> ￥ {{ scope.row.price }}</template>
      </el-table-column>
      <el-table-column prop="stock" label="图书库存" />
      <el-table-column prop="status" label="售卖状态">
        <template v-slot="{ row }">
          {{ row.status === 1 ? '起售' : '停售' }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" sortable>
        <template v-slot="{ row }">{{ row.updateTime }}</template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <!-- row就是articleList的一项，$index是下标 -->
        <template #default="scope">
          <el-button type="primary" color="#1DC779" size="large" :icon="Edit" @click="onEditBook(scope.row)" />
          <el-button type="danger" size="large" :icon="Delete" @click="onDelBook(scope.row)" />
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
      style="margin-top: 30px; justify-content: center"
    ></el-pagination>
    <!-- 新建、编辑图书对话框 -->
    <BookDialog ref="dialog" @success="onSuccess"></BookDialog>
  </el-card>
</template>

<style scoped lang="scss">
.page-container {
  min-height: 100%;
  box-sizing: border-box;
}

.search-bar {
  //display: flex;
  //justify-content: space-between;
  //align-items: center;
}

.tableBox {
  width: 100%;
  border: solid 2px #f3f4f7;
  border-radius: 2px;
}
</style>

<script setup>
import { bookGetAPI } from '@/api/book.js'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import { shoppingCartAdd } from '@/api/cart.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/index.js'

const route = useRoute()
const book = ref({
  id: '1737577604845258483',
  name: '海的女儿',
  categoryId: 10056,
  author: '安徒生',
  price: 59.0,
  stock: 1000,
  // image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/bdaea019-104e-4a05-8b4f-15a640f1ef1f.png',
  status: 1,
  description: '童话故事',
  createTime: '2023-12-21 04:47:55',
  updateTime: '2023-12-21 04:52:04',
  isDeleted: 0,
  categoryName: '童话'
})
const getBookDetail = async () => {
  console.log('bookId:', route.params.id)
  const res = await bookGetAPI(route.params.id)
  book.value = res.data.data
  console.log('获取详情成功')
}
getBookDetail()

// 添加购物车功能
const data = ref({
  userId: '',
  bookId: '',
  bookCount: 0
})
const onAddCart = async () => {
  data.value.userId = useUserStore().user.id
  data.value.bookId = route.params.id
  await shoppingCartAdd(data.value)
  ElMessage.success('添加成功')
}

// watch(() => data.value.bookCount, (value, oldValue) => {
//
// })
// const person = reactive({name: '小松菜奈'})
// watch(
//   () => person.name,
//   (value, oldValue) => {
//     console.log(value, oldValue)
//   }, {immediate:true}
// )
// person.name = '有村架纯'
//
// // 直接侦听ref
// const ageRef = ref(16)
// const stopAgeWatcher = watch(ageRef, (value, oldValue) => {
//   console.log(value, oldValue)
//   if (value > 18) {
//     stopAgeWatcher() // 当ageRef大于18，停止侦听
//   }
// })
</script>

<template>
  <div class="container detail">
    <div class="img" style="margin-left: 20px">
      <!--      <img :src="book.image" alt="" />-->
      <el-image style="width: 300px; height: 300px" :src="book.image" fit="cover" />
    </div>
    <div class="des">
      <el-descriptions title="书籍详情" :column="1" size="large" border>
        <el-descriptions-item label="书籍名称" min-width="90px">{{ book.name }}</el-descriptions-item>
        <el-descriptions-item label="作者">{{ book.author }}</el-descriptions-item>
        <el-descriptions-item label="书籍分类">{{ book.categoryName }}</el-descriptions-item>
        <el-descriptions-item label="书籍价格">￥ {{ book.price }}</el-descriptions-item>
        <el-descriptions-item label="图书描述">{{ book.description }}</el-descriptions-item>
      </el-descriptions>
      <div class="check">
        <el-text class="mx-1" type="success">当前库存{{ book.stock }}</el-text>
        <el-input-number v-model="data.bookCount" :min="1" :max="book.stock" style="margin-left: 20px" />
        <el-button size="large" color="#626AEF" @click="onAddCart" style="margin-left: 40px; margin-right: 20px">加入购物车</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.check {
  padding-top: 100px;
  height: 150px;
  text-align: right;
}

.el-image {
  margin-top: 20%;
  margin-left: 30%;
}

.detail {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  box-shadow: 0 2px 10px lightgray;
  background-color: #fff;
}

.des {
  width: 60%;
  height: 100%;
  background-color: #fff;
  padding: 20px 20px;
}

.el-descriptions {
  margin-top: 20px;
}
</style>

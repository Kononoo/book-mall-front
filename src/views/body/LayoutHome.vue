<script setup>
import { computed, ref } from 'vue'
import { formatTime } from '@/utils/format.js'
import { bookPageAPI } from '@/api/book.js'

const card = [
  { src: new URL('@/assets/image/card1.jpeg', import.meta.url).href },
  { src: new URL('@/assets/image/card2.jpeg', import.meta.url).href },
  { src: new URL('@/assets/image/card3.jpeg', import.meta.url).href }
]

// 初始化加载数量和加载函数
const loading = ref(false)
const count = ref(10)
const total = ref(0)
const params = ref({
  currentPage: 1,
  pageSize: 5,
  keyWord: ''
})

// 是否继续加载
const noMore = computed(() => {
  return count.value >= 100
})
const disabled = computed(() => {
  return loading.value || noMore.value
})

const bookList = ref([
  {
    id: '1737577604845258483',
    name: '海的女儿',
    categoryId: 10056,
    author: '安徒生',
    price: 59.0,
    stock: 1000,
    image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/bdaea019-104e-4a05-8b4f-15a640f1ef1f.png',
    status: 1,
    description: '童话故事',
    createTime: '2023-12-21 04:47:55',
    updateTime: '2023-12-21 04:52:04',
    isDeleted: 0,
    categoryName: '童话'
  },
  {
    id: '1737577604876025812',
    name: '你的孩子',
    categoryId: 1,
    author: '新海诚',
    price: 89.0,
    stock: 88,
    image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/107124790_p0.png',
    status: 1,
    description: '好看就对了',
    createTime: '2023-12-17 23:26:05',
    updateTime: '2023-12-21 14:55:49',
    isDeleted: 0,
    categoryName: '漫画'
  },
  {
    id: '1737577604876025851',
    name: '你的名字',
    categoryId: 1,
    author: '新海诚',
    price: 89.0,
    stock: 82,
    image: 'https://haruna.oss-cn-wuhan-lr.aliyuncs.com/book/5e9843dd-912b-4232-aec0-ece98b3dd89d.jpg',
    status: 1,
    description: '好看就对了',
    createTime: '2023-12-17 23:26:05',
    updateTime: '2023-12-21 14:58:38',
    isDeleted: 0,
    categoryName: '漫画'
  }
])

// 获取图书数据
const getBookList = async () => {
  loading.value = true
  const res = await bookPageAPI(params.value)
  bookList.value = [...bookList.value, ...res.data.data.records]
  total.value = res.data.data.total
  loading.value = false
}
getBookList()

// 加载事件
const load = () => {
  params.value.currentPage += 1
  getBookList()
}
</script>

<template>
  <div class="BookCard" style="padding-top: 20px">
    <el-carousel :interval="4000" type="card" height="300px">
      <el-carousel-item v-for="item in card" :key="item">
        <img :src="item.src" alt="" />
      </el-carousel-item>
    </el-carousel>
  </div>
  <!-- 热门读物列表 -->
  <el-card class="container">
    <div class="book-list-container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <h1 class="section-title">热门读物</h1>
      <div class="book-list">
        <el-row :gutter="20">
          <el-col :span="6" v-for="book in bookList" :key="book.id">
            <a :href="`/detail/${book.id}`">
              <el-card shadow="hover" class="book-card">
                <img :src="book.image" class="book-image" alt="" />
                <div class="book-info">
                  <span class="category">{{ book.categoryName }}</span>
                  <span class="name">书名： {{ book.name }}</span>
                </div>
                <div class="info-bottom">
                  <div class="price">￥{{ book.price }}</div>
                  <div class="time">{{ formatTime(book.currentTime) }}</div>
                </div>
              </el-card>
            </a>
          </el-col>
        </el-row>
        <p v-if="loading" class="loading-message">加载中...</p>
        <p v-if="noMore" class="no-more-message">没有更多了</p>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
.BookCard {
  width: 1340px;
  text-align: center;
  margin: auto auto 20px;
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}

.book-list-container {
  text-align: center;

  .section-title {
    text-align: left;
    color: #27ba9b;
    margin-bottom: 20px;
  }

  .book-list {
    //overflow: auto;
  }

  .book-card {
    height: 350px;
    margin-bottom: 25px;

    img {
      transition: 0.5s ease-in-out;
    }

    img:hover {
      transform: scale(1.05);
      transform-style: flat;
      .name {
      }
    }

    .book-info {
      padding: 10px;
      text-align: center;
      display: flex;
      justify-content: space-between;
      height: 100%;

      span {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
      }

      .category {
        font-size: 18px;
        //margin-right: 40px;
        padding-right: 40px;
        font-weight: bold;
      }

      .name {
        font-weight: bold;
        color: #67c23a;
        font-size: 20px;
      }

      .info-bottom {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
    }

    .price {
      color: #e74c3c;
      font-size: 20px;
      margin-bottom: 5px;
    }

    .book-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }
  }
}

.loading-message,
.no-more-message {
  margin-top: 20px;
  color: #666;
}

.time {
  font-size: 13px;
  color: #999;
}
</style>

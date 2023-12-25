<script setup>
import { formatTime } from '@/utils/format.js'
import { computed, onMounted, onUpdated, ref } from 'vue'
import { useRoute } from 'vue-router'
import { bookPageByCategoryIdAPI } from '@/api/book.js'

// 初始化加载数量和加载函数
const loading = ref(false)
const count = ref(10)
const total = ref(0)
const route = useRoute()
const params = ref({
  currentPage: 1,
  pageSize: 5,
  categoryId: ''
})
// 是否继续加载
const noMore = computed(() => {
  return count.value >= total.value
})
const disabled = computed(() => {
  return loading.value || noMore.value
})

const bookList = ref([])
// 获取图书数据
const getBookList = async () => {
  loading.value = true
  params.value.categoryId = route.params.id
  const res = await bookPageByCategoryIdAPI(params.value)
  bookList.value = [...bookList.value, ...res.data.data.records]
  total.value = res.data.data.total
  loading.value = false
}
onMounted(() => {
  getBookList()
})
onUpdated(() => {
  bookList.value = []
  getBookList()
})

// 加载事件
const load = () => {
  params.value.currentPage += 1
  getBookList()
}
</script>
<script>
export default {
  data() {
    return {
      Ca: this.$route.params.category,
      card: [
        { src: new URL('@/assets/image/card1.jpeg', import.meta.url).href },
        { src: new URL('@/assets/image/card2.jpeg', import.meta.url).href },
        { src: new URL('@/assets/image/card3.jpeg', import.meta.url).href }
      ],
      count: 10,
      Data: null,
      loading: false
    }
  },
  computed: {
    noMore() {
      return this.count >= 20
    },
    disabled() {
      return this.loading || this.noMore
    }
  },
  methods: {
    load() {
      this.loading = true
      setTimeout(() => {
        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}
</script>

<template>
  <el-card class="container">
    <div class="book-list-container" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
      <h1 class="section-title">热门读物</h1>
      <div class="book-list">
        <el-row :gutter="20">
          <el-col :span="6" v-for="book in bookList" :key="book.id">
            <!-- <a :href="`/detail/${book.id}`"> </a>-->
            <RouterLink :to="`/detail/${book.id}`">
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
            </RouterLink>
          </el-col>
        </el-row>
        <p v-if="loading" class="loading-message">加载中...</p>
        <p v-if="noMore" class="no-more-message">没有更多了</p>
      </div>
    </div>
  </el-card>
</template>

<style scoped lang="scss">
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

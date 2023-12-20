<script setup>

</script>

<template>
  <div class="container">
    <div class="data-home">
      <div class="container" style="margin-bottom: 20px">
        <h1 style="color:#27ba9b">{{ Ca }}</h1>
      </div>
      <div class="infinite-list-wrapper" style="overflow:auto;text-align: center">
        <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled">
          <li v-for="i in count" class="list-item">
            <el-row>
              <el-col :span="8" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 2 : 0">
                <a href="/detail/id=1">
                  <el-card :body-style="{ padding: '20px' }" shadow="hover" class="BookCard">
                    <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" class="image" alt="">
                    <div style="padding: 1px;">
                      <div style="font-size: 15px">《你的名字》</div>
                      <div style="font-size: 15px">￥20</div>
                      <div class="bottom clearfix">
                        <time class="time">{{ currentDate }}</time>
                      </div>
                    </div>
                  </el-card>
                </a>
              </el-col>
            </el-row>
          </li>
        </ul>
        <p v-if="loading" class="message">加载中...</p>
        <p v-if="noMore" class="message">没有更多了</p>
      </div>
    </div>
  </div>

</template>

<style scoped lang="scss">
.BookCard{
  width: 90%;
  text-align: center;
  margin-left: 5%;
}
.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
.el-col-8 {
  max-width: 24%;
  flex: 0 0 33.3333333333%;
}
.data-home{
  box-shadow: 0 2px 10px lightgray;
  padding-left: 10px;
}


.el-col-offset-2 {
  margin-left: 1%;
  margin-bottom: 1%;
}

.message{
  display: block;
  padding-top: 10px;
  font-size: 22px;
}
</style>

<script>
export default {
  data(){
    return{
      Ca:this.$route.params.category,
      card:[{src: new URL("@/assets/image/card1.jpeg",import.meta.url).href},{src: new URL("@/assets/image/card2.jpeg",import.meta.url).href},{src: new URL("@/assets/image/card3.jpeg",import.meta.url).href}],
      count: 10,
      Data:null,
      loading: false
    }
  },
  computed: {
    noMore () {
      return this.count >= 20
    },
    disabled () {
      return this.loading || this.noMore
    }
  },
  methods: {
    load () {
      this.loading = true
      setTimeout(() => {

        this.count += 2
        this.loading = false
      }, 2000)
    }
  }
}

</script>
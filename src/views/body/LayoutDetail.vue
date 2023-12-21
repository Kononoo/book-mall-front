<script setup>
</script>

<template>
  <div class="container detail">
    <div class="img" style="margin-left: 20px">
      <img :src="book.coverImg" alt="">
    </div>
    <div class="des">
      <el-descriptions
        title="书籍详情"
        :column="1"
        :size='large'
        border
      >
        <el-descriptions-item label="书籍名称" min-width="90px">{{ book.name }}</el-descriptions-item>
        <el-descriptions-item label="作者">{{ book.author }}</el-descriptions-item>
        <el-descriptions-item label="书籍分类">{{book.category}}</el-descriptions-item>
        <el-descriptions-item label="图书描述">{{ book.description }}</el-descriptions-item>
      </el-descriptions>
      <div class="check">
        <el-text class="mx-1" type="success">当前库存{{book.stock}}</el-text>
        <el-input-number v-model="num" :min="1" :max="book.stock" style="margin-left: 20px"/>
        <el-button type="danger" plain @click="pushorder()" style="margin-left: 20px">加入购物车</el-button>
      </div>
    </div>
  </div>

</template>


<style lang="scss">
.check{
  padding-top: 100px;
  height: 150px;
  text-align: right;
}

.detail{
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 10px lightgray;
  background-color: #fff;
}
.img{
  width: 20%;
}
.des{
  width: 75%;
  height: 100%;

  background-color: #fff;
  padding:20px 20px;
}

.el-descriptions {
  margin-top: 20px;
}
</style>
<script>

export default {
  name:"book",
  data() {
    return {
      bookid:this.$route.params.id,
      num:1,
      book: {
        orderID: 1,
        coverImg: new URL("@/assets/image/三体.png",import.meta.url).href,
        name: "三体",
        author: "刘慈欣",
        category:"科幻",
        price: 20.00,
        stock: 5,
        description:"作品讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。" +
          "《三体》的文本叙事在“后人类”的思考上有着重大突破，构建了科学与文学的互动范式，将道德内涵引入" +
          "对科技的辩证思考中，并以文学手段在文化语境中对科技进行大胆假设和重构，但科技核心只是一个叙事" +
          "跳板，是完成现实超越的重要媒介，也是人类命运共同体书写的重要工具。《三体》最吸引人的地方在" +
          "于通过对人类中心主义的解构，继而完成对人与自然、动物之间的伦理反思与文学表达，最终指向去人类中心化的思想内核。",
        checked: false
      },
      // book:null,
      url:"http://localhost:8080/book/"+this.bookid
    }
  },
  // mounted() {
  //   console.log(this.bookid);
  //   //获取图书数据
  //   var requestOptions = {
  //     mode: 'no-cors',
  //     method: 'GET',
  //     redirect: 'follow'
  //   };
  //
  //   fetch("http://localhost/book/", requestOptions)
  //       .then(response => response.json())
  //       .then(result => {
  //         console.log(result);
  //         this.book = result.data;
  //       })
  //       .catch(error => console.log('error', error));
  // },
  // methods:{
  //   //加入购物车
  //   pushorder() {
  //     var axios = require('axios');
  //     var data = JSON.stringify({
  //       "userId": "1",
  //       "bookId": this.book.id,
  //       "bookCount": this.num,
  //     });
  //
  //     var config = {
  //       method: 'post',
  //       url: 'http://localhost/cart/add',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       },
  //       data: data
  //     };
  //
  //     axios(config)
  //         .then(function (response) {
  //           console.log(JSON.stringify(response.data));
  //         })
  //         .catch(function (error) {
  //           console.log(error);
  //         });
  //   }
  // }
}


</script>


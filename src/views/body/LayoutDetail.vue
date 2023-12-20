<script setup>
</script>

<template>
  <div class="container detail">
    <div class="img">
      <img src="@/assets/image/三体.png" alt="">
    </div>
    <div class="describe">
        <el-descriptions
            title="Vertical list with border"
            direction="vertical"
            :column="2"
            :size="12"
            border
        >
          <el-descriptions-item label="Username" label-align="right" align="center">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Username" label-align="right" align="center">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone" label-align="right" align="center">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place" label-align="right" align="center">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks" label-align="right" align="center">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
    </div>
  </div>
</template>


<style lang="scss">
.detail{
  display: flex;
  flex-direction: row;
  box-shadow: 0 2px 10px lightgray;
}
.img{
  width: 20%;
}
.describe{
  width: 75%;
  height: 100%;

  background-color: #fff;
}

 .el-descriptions {
   margin-top: 20px;
 }
</style>



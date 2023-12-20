

<template>
  <div class="container">
    <el-row class="row-bg">
      <el-col :span="6"><img src="../../assets/image/card1.jpeg" alt=""></el-col>
      <el-col :span="6">
        <el-descriptions
            title="Vertical list with border"
            direction="vertical"
            :column="4"
            :size="size"
            border
        >
          <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
          <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
          <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
          <el-descriptions-item label="Remarks">
            <el-tag size="small">School</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="Address"
          >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
          </el-descriptions-item>
        </el-descriptions>
      </el-col>
    </el-row>
    <el-row class="row-bg" justify="center">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row class="row-bg" justify="end">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row class="row-bg" justify="space-between">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row class="row-bg" justify="space-around">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
    <el-row class="row-bg" justify="space-evenly">
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple-light" /></el-col>
      <el-col :span="6"><div class="grid-content ep-bg-purple" /></el-col>
    </el-row>
  </div>
  <template>
    <el-radio-group v-model="size">
      <el-radio label="large">Large</el-radio>
      <el-radio>Default</el-radio>
      <el-radio label="small">Small</el-radio>
    </el-radio-group>

    <el-descriptions
        title="Vertical list with border"
        direction="vertical"
        :column="4"
        :size="size"
        border
    >
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>

    <el-descriptions
        title="Vertical list without border"
        :column="4"
        :size="size"
        direction="vertical"
        :style="blockMargin"
    >
      <el-descriptions-item label="Username">kooriookami</el-descriptions-item>
      <el-descriptions-item label="Telephone">18100000000</el-descriptions-item>
      <el-descriptions-item label="Place" :span="2">Suzhou</el-descriptions-item>
      <el-descriptions-item label="Remarks">
        <el-tag size="small">School</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="Address"
      >No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
      </el-descriptions-item>
    </el-descriptions>
  </template>

  <script setup lang="ts">
    import { computed, ref } from 'vue'

    const size = ref('')
    const blockMargin = computed(() => {
      const marginMap = {
        large: '32px',
        default: '28px',
        small: '24px',
      }
      return {
        marginTop: marginMap[size.value] || marginMap.default,
      }
    })
  </script>

  <style scoped>
    .el-descriptions {
      margin-top: 20px;
    }
  </style>

</template>

<style>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>


<style scoped lang="scss">

</style>
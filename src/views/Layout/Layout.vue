<script setup>
import LayoutHeader from '@/views/Layout/components/LayoutHeader.vue'
import LayoutNav from '@/views/Layout/components/LayoutNav.vue'
import LayoutFooter from '@/views/Layout/components/LayoutFooter.vue'
</script>

<template>
  <LayoutHeader />
  <LayoutNav />
  <RouterView />
  <LayoutFooter />
</template>

<style scoped></style>

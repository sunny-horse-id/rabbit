<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'

const bannerList = ref([])
const getHomeBanner = async () => {
  const res = await getHomeBannerAPI()
}

// 页面加载时执行
onLoad(() => {
  getHomeBanner()
})
</script>

<template>
  <CustomNavbar />
  <XtxSwiper />
</template>

<style lang="scss"></style>

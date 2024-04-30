<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'

const bannerList = ref<BannerItem[]>([])
const getHomeBanner = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 页面加载时执行
onLoad(() => {
  getHomeBanner()
})
</script>

<template>
  <CustomNavbar />
  <!--  传送数组-->
  <XtxSwiper :list="bannerList" />
  <!--  分类面板-->
  <CategoryPanel />
</template>

<style lang="scss">
.page {
  background-color: #f7f7f7;
}
</style>

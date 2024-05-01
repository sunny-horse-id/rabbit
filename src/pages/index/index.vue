<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import type XtxGuess from '@/components/XtxGuess.vue'
import type { XtxGuessInstance } from '@/components/component'

// 获取首页轮播图数据
const bannerList = ref<BannerItem[]>([])
const getHomeBannerData = async () => {
  const res = await getHomeBannerAPI()
  bannerList.value = res.result
}

// 获取首页分类数据
const categoryList = ref<CategoryItem[]>([])
const getHomeCategoryData = async () => {
  const res = await getHomeCategoryAPI()
  categoryList.value = res.result
}

// 获取首页热门推荐数据
const hotList = ref<HotItem[]>([])
const getHomeHotData = async () => {
  const res = await getHomeHotAPI()
  hotList.value = res.result
}

// 页面加载时执行
onLoad(() => {
  getHomeBannerData()
  getHomeCategoryData()
  getHomeHotData()
})

// 获取猜你喜欢组件的实例
const guessRef = ref<XtxGuessInstance>()

// 滚动触底时触发
const onScrollToLower = () => {
  guessRef.value?.getMore()
}
</script>

<template>
  <CustomNavbar />
  <!--  滚动容器-->
  <scroll-view @scrolltolower="onScrollToLower" class="scroll-view" scroll-y>
    <!--  传送数组，轮播图-->
    <XtxSwiper :list="bannerList" />
    <!--  分类面板-->
    <CategoryPanel :list="categoryList" />
    <!--  热门推荐-->
    <HotPanel :list="hotList" />
    <!--  猜你喜欢-->
    <XtxGuess ref="guessRef" />
  </scroll-view>
</template>

<style lang="scss">
// 不能加.,在page
page {
  background-color: #f7f7f7;
  height: 100%;
  display: flex;
  // 定义垂直方向
  flex-direction: column;
}

.scroll-view {
  // 分配了伸缩因子为1，它会在父容器中占据剩余的可用空间，使得它在垂直方向上填充整个可用空间
  flex: 1;
}
</style>

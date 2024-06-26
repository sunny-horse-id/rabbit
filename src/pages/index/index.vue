<script setup lang="ts">
import CustomNavbar from './components/CustomNavbar.vue'
import { getHomeBannerAPI, getHomeCategoryAPI, getHomeHotAPI } from '@/services/home'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import type { BannerItem, CategoryItem, HotItem } from '@/types/home'
import CategoryPanel from '@/pages/index/components/CategoryPanel.vue'
import HotPanel from '@/pages/index/components/HotPanel.vue'
import type XtxGuess from '@/components/XtxGuess.vue'
import PageSkeleton from '@/pages/index/components/PageSkeleton.vue'
import { useGuessList } from '@/composables'

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

// 是否正在加载中
const isLoading = ref(false)

// 页面加载时执行
onLoad(async () => {
  isLoading.value = true
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData()])
  isLoading.value = false
})

// 获取才能喜欢组件
const { guessRef, onScrolltolower } = useGuessList()

// 自定义下拉刷新触发
const isTriggered = ref(false)

// 自定义下拉刷新触发
const onRefreshRefresh = async () => {
  // 开始动画
  isTriggered.value = true
  // 加上await，等待数据加载完毕,再结束动画
  // await getHomeBannerData()
  // await getHomeCategoryData()
  // await getHomeHotData()
  // 重置数据
  guessRef.value?.resetData()
  // 调优，优化性能，同时请求
  await Promise.all([getHomeBannerData(), getHomeCategoryData(), getHomeHotData(), guessRef.value?.getMore()])
  // 结束动画
  isTriggered.value = false
}
</script>

<template>
  <CustomNavbar />
  <!--  滚动容器-->
  <!--  refresher-enabled开启下拉刷新-->
  <scroll-view
    refresher-enabled
    @refresherrefresh="onRefreshRefresh"
    :refresher-triggered="isTriggered"
    @scrolltolower="onScrolltolower"
    class="scroll-view" scroll-y>
    <!--    骨架屏-->
    <PageSkeleton v-if="isLoading" />
    <template v-else>
      <!--  传送数组，轮播图-->
      <XtxSwiper :list="bannerList" />
      <!--  分类面板-->
      <CategoryPanel :list="categoryList" />
      <!--  热门推荐-->
      <HotPanel :list="hotList" />
      <!--  猜你喜欢-->
      <XtxGuess ref="guessRef" />
    </template>
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

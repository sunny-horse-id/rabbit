<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getHomeGoodsGuessLikeAPI } from '@/services/home'
import type { GuessItem } from '@/types/home'
import type { PageParams } from '@/types/global'

// 分页参数,冒号后面指定类型
// 通过Required<T>可以强制要求T中的所有属性都是必填的，使得累加不报错
const pageParams: Required<PageParams> = {
  page: 1,
  pageSize: 10,
}

// 获取猜你喜欢的数据
const guessList = ref<GuessItem[]>([])
// 已结束的标记
const finished = ref(false)
const getHomeGoodsGuessLikeData = async () => {
  // 如果已结束，直接返回，不再调用
  if (finished.value) {
    return uni.showToast({ title: '没有更多了', icon: 'none' })
  }
  const res = await getHomeGoodsGuessLikeAPI(pageParams)
  // guessList.value = res.result.items
  // 数组追加
  // ...res.result.items 是 ES6 中的扩展运算符，它可以将一个数组展开为多个参数
  guessList.value.push(...res.result.items)
  // 性能优化
  if (pageParams.page < res.result.pages) {
    // 页码累加
    pageParams.page++
  } else {
    finished.value = true
  }
}

// 重置数据，下拉刷新时供父组件使用
const resetData = () => {
  pageParams.page = 1
  guessList.value = []
  finished.value = false
}

// 组件挂载完成时，请求数据
onMounted(() => {
  getHomeGoodsGuessLikeData()
})

// 暴露方法
defineExpose({
  resetData,
  // 起个别名getMore，让父组件调用
  getMore: getHomeGoodsGuessLikeData,
})
</script>

<template>
  <!-- 猜你喜欢 -->
  <view class="caption">
    <text class="text">猜你喜欢</text>
  </view>
  <view class="guess">
    <navigator
      class="guess-item"
      v-for="item in guessList"
      :key="item.id"
      :url="`/pages/goods/goods?id=4007498`"
    >
      <image
        class="image"
        mode="aspectFill"
        :src="item.picture"
      ></image>
      <view class="name"> {{ item.name }}</view>
      <view class="price">
        <text class="small">¥</text>
        <text>{{ item.price }}</text>
      </view>
    </navigator>
  </view>
  <view class="loading-text">
    {{ finished ? '没有更多了' : '加载中...' }}
  </view>
</template>

<style lang="scss">
:host {
  display: block;
}

/* 分类标题 */
.caption {
  display: flex;
  justify-content: center;
  line-height: 1;
  padding: 36rpx 0 40rpx;
  font-size: 32rpx;
  color: #262626;

  .text {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 28rpx 0 30rpx;

    &::before,
    &::after {
      content: '';
      width: 20rpx;
      height: 20rpx;
      background-image: url(@/static/images/bubble.png);
      background-size: contain;
      margin: 0 10rpx;
    }
  }
}

/* 猜你喜欢 */
.guess {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0 20rpx;

  .guess-item {
    width: 345rpx;
    padding: 24rpx 20rpx 20rpx;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
    overflow: hidden;
    background-color: #fff;
  }

  .image {
    width: 304rpx;
    height: 304rpx;
  }

  .name {
    height: 75rpx;
    margin: 10rpx 0;
    font-size: 26rpx;
    color: #262626;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .price {
    line-height: 1;
    padding-top: 4rpx;
    color: #cf4444;
    font-size: 26rpx;
  }

  .small {
    font-size: 80%;
  }
}

// 加载提示文字
.loading-text {
  text-align: center;
  font-size: 28rpx;
  color: #666;
  padding: 20rpx 0;
}
</style>

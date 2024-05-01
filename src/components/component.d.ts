import XtxSwiper from '@/components/XtxSwiper.vue'
import XtxGuess from '@/components/XtxGuess.vue'

declare module 'vue' {
  export interface GlobalComponents {
    // 前面是名称后面是类型
    XtxSwiper: typeof XtxSwiper
    XtxGuess: typeof XtxGuess
  }
}

// 定义猜你喜欢类型的实例
export type XtxGuessInstance = InstanceType<typeof XtxGuess>

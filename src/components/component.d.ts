import XtxSwiper from '@/components/XtxSwiper.vue'
declare module 'vue' {
  export interface GlobalComponents {
    // 前面是名称后面是类型
    XtxSwiper: typeof XtxSwiper
  }
}

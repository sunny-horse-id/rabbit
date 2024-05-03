import { ref } from 'vue'
import type { XtxGuessInstance } from '@/components/component'

export const useGuessList = () => {
  const guessRef = ref<XtxGuessInstance>()

  const onScrolltolower = () => {
    guessRef.value?.getMore()
  }

  // 返回ref和事件处理函数
  return {
    guessRef,
    onScrolltolower,
  }
}

import { http } from '@/utils/http'
import type { CategoryTopItem } from '@/types/category'

/**
 * 获取分类数据
 */
export const getCategoryTopAPI = () => {
  return http<CategoryTopItem[]>({
    method: 'GET',
    url: '/category/top',
  })
}

import { http } from '@/utils/http'
import type { PageParams } from '@/types/global'

// PageParams & { subType?: string }交叉类型
type HotParams = PageParams & { subType?: string }

/**
 * 获取热销推荐
 * @param url 请求地址
 * @param data 请求参数
 */
export const getHotRecommendAPI = (url: string, data?: HotParams) => {
  return http({
    method: 'GET',
    url,
    data,
  })
}

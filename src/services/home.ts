import { http } from '@/utils/http'
import type { BannerItem } from '@/types/home'

/**
 * distributionSite = 1表示首页，2表示广告页，1是默认值
 * @param distributionSite
 */
export const getHomeBannerAPI = (distributionSite = 1) => {
  return http<BannerItem[]>({
    method: 'GET',
    url: '/home/banner',
  })
}

/**
 * 获取首页分类数据
 */
export const getHomeCategoryAPI = () => {
  return http<any>({
    method: 'GET',
    url: '/home/category/mutli',
  })
}

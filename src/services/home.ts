import { http } from '@/utils/http'
/**
 * distributionSite = 1表示首页，2表示广告页，1是默认值
 * @param distributionSite
 */
 export const getHomeBannerAPI = (distributionSite = 1) => {
  return http({
    method: 'GET',
    url: '/home/banner',
  })
}

import { useMemberStore } from '@/stores'

// 基地址
const baseURL = 'https://pcapi-xiaotuxian-front-devtest.itheima.net'

// 添加拦截器
const httpInterceptor = {
  // 拦截前触发
  invoke(options: UniApp.RequestOptions) {
    // 非 http 开头需拼接地址
    if (!options.url.startsWith('http')) {
      options.url = baseURL + options.url
    }
    // 请求超时, 默认 60s
    options.timeout = 10000
    // 添加小程序端请求头标识
    options.header = {
      // 如果有请求头, 带上
      ...options.header,
      'source-client': 'miniapp',
    }
    // 添加 token 请求头标识
    const memberStore = useMemberStore()
    // 获取 token，如果不存在直接返回未定义
    const token = memberStore.profile?.token
    if (token) {
      options.header.Authorization = token
    }
  },
}
// 添加拦截器
// 拦截request请求
uni.addInterceptor('request', httpInterceptor)
// 拦截uploadFile请求
uni.addInterceptor('uploadFile', httpInterceptor)

interface Data<T> {
  code: string
  msg: string
  result: T
}

// 支持泛型
export const http = <T>(options: UniApp.RequestOptions) => {
  // 返回一个promise
  return new Promise<Data<T>>((resolve, reject) => {
    uni.request({
      ...options,
      // 成功就返回数据
      success(res) {
        resolve(res.data as Data<T>)
      },
    })
  })
}

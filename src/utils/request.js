import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'

// const baseURL = 'http://localhost'
const baseURL = '/api'
const httpInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000 // 超时时间10s
})

// 添加请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 将token携带进请求头中(axios会携带请求头)
    const userStore = useUserStore()
    const token = localStorage.getItem('token')
    if (userStore.token) {
      // config.headers.Authorization = `Bearer ${token}`
      config.headers.Authorization = userStore.token
    } else if (token) {
      // 请求头的 Authorization 加上 token 数据, 后端通过 request.getHeaders("Authorization")来获取
      config.headers.Authorization = token
      // config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    if (res.data.code === 1) {
      return res
    } else {
      ElMessage({
        type: 'error',
        message: res.data?.msg || '服务异常'
      })
    }
    // 处理业务失败，给出错误提示
    return Promise.reject(res.data)
  },
  (e) => {
    // 统一错误提示
    // 当且仅当.response.data 存在时，它将返回 e.response.data.msg。如果其中任何一部分不存在，整个表达式将返回服务异常
    ElMessage({
      type: 'error',
      message: e.response?.data?.msg || '服务异常'
    })
    // 401 token失效 或 session过期 处理
    // 1 清除本地数据   2 跳转登录页
    if (e.response?.status === 401) {
      const userStore = useUserStore()
      userStore.removeToken()
      // 组件是 .vue 文件 不需要导包 自动导了, 这是js文件必须导包
      ElMessage({
        type: 'error',
        message: '请先登录！'
      })
      // setTimeout(() => {
      //   router.replace('/Login')
      // }, 500)
    }
    return Promise.reject(e)
  }
)

export default httpInstance
export { baseURL }

// error.response.data 包含服务器返回的响应体。
// error.response.status 表示HTTP状态码，如404表示“未找到”。
// error.response.headers 包含响应的HTTP头部信息

// error.response    包含了服务器响应的详细信息
// const statusCode = error.response.status;
// const errorMessage = error.response.data.message;

// 例子：
// // src > api > index.js
// import axios from 'axios'
// import router from '../router'
//
// const BASE_URL = 'http://localhost:3000'
//
// // 请求拦截
// axios.interceptors.request.use((config) => {
//   let jwtToken = window.localStorage.getItem('jwtToken')
//   if (jwtToken) {
//     // 将token携带在请求头中
//     config.headers.Authorization = jwtToken
//   }
//   return config
// })
//
// // 响应拦截
// axios.interceptors.response.use(res => {
//   // 拦截报错的情况
//   if (res.data.code !== 0) {
//     return Promise.reject(res.data.error)
//   }
//   return res
// }, (error) => {
//   // status在400~500之间的我们认定为是登录过期
//   if (error.response.status >= 400 && error.response.status < 500) {
//     router.push('/Login')
//   }
//   return Promise.reject(error.response.data.error)
// })
//
// export function post(url, body) {
//   return axios.post(BASE_URL+url, body)
// }

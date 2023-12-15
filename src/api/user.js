import httpInstance from '@/utils/request.js'

// 用户登录
export const userLoginAPI = ({ username, password }) => {
  return httpInstance.post('/api/login', { username, password })
}

// 用户注册
export const userRegisterAPI = ({ username, password }) => {
  return httpInstance({
    url: '/api/reg',
    method: 'POST',
    data: {
      username,
      password
    }
  })
  // return httpInstance.post('/api/login', {username, password, repassword})
}

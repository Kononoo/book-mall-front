import httpInstance from '@/utils/request.js'

// 用户登录
export const userLoginAPI = ({ username, password }) => {
  return httpInstance.post('/user/login', { username, password })
}

// 用户注册
export const userRegisterAPI = ({ username, password }) => {
  return httpInstance({
    url: '/user/register',
    method: 'POST',
    data: {
      username,
      password
    }
  })
  // return httpInstance.post('/api/login', {username, password, repassword})
}

// 获取用户信息
export const userGetInfoAPI = () => {
  return httpInstance.get('/user')
}

// 分页查询用户信息
export const userGetListAPI = (data) => {
  return httpInstance({
    url: '/user/page',
    method: 'POST',
    data
  })
}

// 更新用户信息
export const userUpdateInfoAPI = (data) => {
  return httpInstance({
    url: '/user/update',
    method: 'PUT',
    data
  })
}

// 用户修改密码
export const userUpdatePasswordAPI = (data) => {
  return httpInstance({
    url: '/user',
    method: 'PATCH',
    data
  })
}

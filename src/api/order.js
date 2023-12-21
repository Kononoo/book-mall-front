import httpInstance from '@/utils/request.js'

// 提交订单, 可以传userId获取登录了就不传
export const orderSubmitAPI = (userId) => {
  return httpInstance({
    url: '/order/submit',
    method: 'POST',
    data: userId
  })
}

// 分页获取订单数据, data需要传过来的数据 {username, begin, end}
export const orderPageAPI = ({ currentPage, pageSize, data }) => {
  return httpInstance({
    url: '/order/page',
    method: 'POST',
    params: { currentPage, pageSize },
    data
  })
}

// 根据用户Id进行订单查询，返回订单列表数据  userId可传可不传
export const orderGetAPI = (userId) => {
  return httpInstance({
    url: '/order',
    method: 'GET',
    params: { userId }
  })
}

// 修改订单状态
export const orderChangeStatus = ({ orderId, newStatus }) => {
  return httpInstance({
    url: '/order/update',
    method: 'PUT',
    params: { orderId, newStatus }
  })
}

// 根据orderId查询订单
export const orderGetByIdAPI = (orderId) => {
  return httpInstance({
    url: `/order/${orderId}`,
    method: 'GET'
  })
}

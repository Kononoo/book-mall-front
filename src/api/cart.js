import httpInstance from '@/utils/request.js'

// 添加购物车商品  data={ bookId, bookCount }
export const shoppingCartAdd = (data) => {
  return httpInstance({
    url: '/cart/add',
    method: 'POST',
    data
  })
}

// 修改购物车商品 登录后才能查看  data={ userId bookID, bookCount }
export const shoppingCartDel = (data) => {
  return httpInstance({
    url: '/cart',
    methods: 'PUT',
    data
  })
}

// 查看购物车商品
export const shoppingCartList = (userId) => {
  return httpInstance({
    url: '/cart/list',
    method: 'GET',
    params: { userId }
  })
}

// 清空购物车   清空当前登录用户的购物车
export const shoppingCartClean = () => {
  return httpInstance({
    url: '/cart/clean',
    method: 'DELETE'
  })
}

import httpInstance from '@/utils/request.js'

// 添加购物车商品  data={ bookID, bookCount }
export const shoppingCartAdd = (data) => {
  return httpInstance({
    url: '/cart/add',
    method: 'POST',
    data
  })
}

// 删除购物车商品 登录后才能查看  data={ bookID, bookCount }
export const shoppingCartDel = (data) => {
  return httpInstance({
    url: '/cart',
    method: 'DELETE',
    data
  })
}

// 查看购物车商品
export const shoppingCartList = () => {
  return httpInstance({
    url: '/cart/list',
    method: 'GET'
  })
}

// 清空购物车   清空当前登录用户的购物车
export const shoppingCartClean = () => {
  return httpInstance({
    url: '/cart/clean',
    method: 'DELETE'
  })
}

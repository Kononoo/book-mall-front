import httpInstance from '@/utils/request.js'

// 新增分类
export const categoryAddAPI = (data) => {
  return httpInstance({
    url: '/category',
    method: 'POST',
    data
  })
}

// 删除分类
export const categoryDelAPI = (id) => {
  return httpInstance({
    url: '/category',
    method: 'DELETE',
    params: { id }
  })
}

// 根据id更新图书种类
export const categoryUpdateAPI = (data) => {
  return httpInstance.put('/category', data)
}

// 分页查询种类
export const categoryPageAPI = (params) => {
  return httpInstance({
    url: '/category/page',
    method: 'GET',
    params
  })
}

// 条件查询分类数据
export const categoryListAPI = (keyWord) => {
  return httpInstance({
    url: '/category/list',
    method: 'GET',
    params: { keyWord }
  })
}

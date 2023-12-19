import httpInstance from '@/utils/request.js'

// 添加图书
export const bookAddAPI = (data) => {
  return httpInstance.post('/book', data)
}

// 根据id删除图书
export const bookDelAPI = (params) => {
  return httpInstance({
    url: '/book',
    method: 'DELETE',
    params
  })
}

// 更新图书
export const bookUpdateAPI = (data) => {
  return httpInstance({
    url: '/book',
    method: 'PUT',
    data
  })
}

// 根据id查询图书
export const bookGetAPI = (id) => {
  return httpInstance.get(`/book/${id}`)
}

// 根据关键词查询图书
export const bookListAPI = (keyWord) => {
  return httpInstance({
    url: '/book/list',
    method: 'GET',
    params: { keyWord }
  })
}

// 条件分页查询
export const bookPageAPI = ({ currentPage, pageSize, data }) => {
  return httpInstance({
    url: '/book/page',
    method: 'GET',
    params: { currentPage, pageSize },
    data
  })
}

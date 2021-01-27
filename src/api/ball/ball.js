import request from '@/utils/request'
const apiPath = '/ball/ball'
const ballApi = {
  /**
   * 新增【Ball】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【Ball】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【Ball】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查看【Ball】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【Ball】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【Ball】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  }
}
export default ballApi

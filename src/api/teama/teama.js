import request from '@/utils/request'
const apiPath = '/teama/teama'
const teamaApi = {
  /**
   * 新增【teama】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【teama】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【teama】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查询【teama】选项列表
   */
  findOptions(query) {
    return request.get(`${apiPath}/options`, { params: query })
  },
  /**
   * 查看【teama】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【teama】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【teama】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  }
}
export default teamaApi

import request from '@/utils/request'
const apiPath = '/teamgroup/teamGroup'
const teamGroupApi = {
  /**
   * 新增【teamGroup】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【teamGroup】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【teamGroup】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查看【teamGroup】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【teamGroup】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【teamGroup】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  }
}
export default teamGroupApi

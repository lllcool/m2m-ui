import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/member/member'
const memberApi = {
  /**
   * 新增【Member】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【Member】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【Member】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查看【Member】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【Member】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【Member】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【Member】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'memberExport.xlsx'))
  },
  /**
   * 下载【Member】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'memberTemplate.xlsx'))
  },
  /**
   * 获取【Member】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default memberApi

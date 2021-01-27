import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/invoice/invoice'
const invoiceApi = {
  /**
   * 新增【Invoice】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【Invoice】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【Invoice】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查询【Invoice】选项列表
   */
  findOptions(query) {
    return request.get(`${apiPath}/options`, { params: query })
  },
  /**
   * 查看【Invoice】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【Invoice】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【Invoice】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【Invoice】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'invoiceExport.xlsx'))
  },
  /**
   * 下载【Invoice】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'invoiceTemplate.xlsx'))
  },
  /**
   * 获取【Invoice】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default invoiceApi

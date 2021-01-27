import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/invoicedetail/invoiceDetail'
const invoiceDetailApi = {
  /**
   * 新增【InvoiceDetail】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【InvoiceDetail】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【InvoiceDetail】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查看【InvoiceDetail】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【InvoiceDetail】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【InvoiceDetail】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【InvoiceDetail】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'invoiceDetailExport.xlsx'))
  },
  /**
   * 下载【InvoiceDetail】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'invoiceDetailTemplate.xlsx'))
  },
  /**
   * 获取【InvoiceDetail】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default invoiceDetailApi

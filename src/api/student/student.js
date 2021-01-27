import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/student/student'
const studentApi = {
  /**
   * 新增【Student】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【Student】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【Student】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查询【Student】选项列表
   */
  findOptions(query) {
    return request.get(`${apiPath}/options`, { params: query })
  },
  /**
   * 查看【Student】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【Student】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【Student】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【Student】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'studentExport.xlsx'))
  },
  /**
   * 下载【Student】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'studentTemplate.xlsx'))
  },
  /**
   * 获取【Student】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default studentApi

import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/teacher/teacher'
const teacherApi = {
  /**
   * 新增【Teacher】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【Teacher】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【Teacher】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查询【Teacher】选项列表
   */
  findOptions(query) {
    return request.get(`${apiPath}/options`, { params: query })
  },
  /**
   * 查看【Teacher】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【Teacher】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【Teacher】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【Teacher】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'teacherExport.xlsx'))
  },
  /**
   * 下载【Teacher】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'teacherTemplate.xlsx'))
  },
  /**
   * 获取【Teacher】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default teacherApi

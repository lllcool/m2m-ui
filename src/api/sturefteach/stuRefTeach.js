import request from '@/utils/request'
import { downloadBlob } from '@/utils/download'
const apiPath = '/sturefteach/stuRefTeach'
const stuRefTeachApi = {
  /**
   * 新增【StuRefTeach】
   */
  create(data) {
    return request.post(apiPath, data)
  },
  /**
   * 修改【StuRefTeach】
   */
  update(data) {
    return request.put(apiPath, data)
  },
  /**
   * 分页查询【StuRefTeach】
   */
  fetchList(query) {
    return request.get(apiPath, { params: query })
  },
  /**
   * 查看【StuRefTeach】详情
   */
  fetchById(id) {
    return request.get(`${apiPath}/${id}`)
  },
  /**
   * 删除单个【StuRefTeach】
   */
  deleteById(id) {
    return request.delete(`${apiPath}/${id}`)
  },
  /**
   * 批量删除【StuRefTeach】
   */
  deleteBatch(ids) {
    return request.delete(apiPath, { data: ids })
  },
  /**
   * 导出【StuRefTeach】excel
   */
  exportExcel(query) {
    return request.get(`${apiPath}/export`, { responseType: 'blob', params: query })
      .then(res => downloadBlob(res, 'stuRefTeachExport.xlsx'))
  },
  /**
   * 下载【StuRefTeach】模板
   */
  downloadTemplate() {
    request.get(`${apiPath}/template`, { responseType: 'blob' })
      .then(res => downloadBlob(res, 'stuRefTeachTemplate.xlsx'))
  },
  /**
   * 获取【StuRefTeach】上传路径
   */
  getImportUrl() {
    return request.defaults.baseURL + apiPath + '/import'
  }
}
export default stuRefTeachApi

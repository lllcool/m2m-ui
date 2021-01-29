import Mock from 'mockjs'
import { paging, copy, getUrlPattern } from '../mock-util'

/**
 * mock数据缓存
 */
let data = null

/**
 * 获取mock数据缓存
 */
function getMockData() {
  return data
}

/**
 * 初始化mock数据阶段1
 */
function initMockDataStage1() {
  data = Mock.mock({
    'list|20': [{
      'id|+1': 1,
      'stuId|1-20': 1,
      'teacherId|1-20': 1,
      'stuName': '@word(1, 10)',
      'teaName': '@word(1, 10)',
      'teaSubject': '@word(1, 10)'
    }]
  })
}

/**
 * 初始化mock数据阶段2
 */
function initMockDataStage2() {
}

/**
 * 新的id生成规则
 */
const mockNewIdRule = {
  'id|+1': 21
}

function removeById(list, id) {
  const index = list.findIndex(item => item.id === id)
  list.splice(index, 1)
}

const modulePath = 'sturefteach/stuRefTeach'
const reqMocks = [
  // 添加【StuRefTeach】
  {
    url: getUrlPattern(modulePath, false),
    type: 'post',
    response: ({ body }) => {
      body.id = Mock.mock(mockNewIdRule).id
      data.list.push(body)
      return copy(body)
    }
  },
  // 修改【StuRefTeach】
  {
    url: getUrlPattern(modulePath, false),
    type: 'put',
    response: ({ body }) => {
      const obj = data.list.find(item => item.id === body.id)
      Object.assign(obj, body)
      return copy(obj)
    }
  },
  // 分页查询【StuRefTeach】
  {
    url: getUrlPattern(modulePath, false),
    type: 'get',
    response: ({ query }) => {
      // 列表分页
      const page = paging(data.list, query.currentPage, query.pageSize)
      return {
        total: data.list.length,
        list: copy(page)
      }
    }
  },
  // 查看【StuRefTeach】详情
  {
    url: getUrlPattern(modulePath, true),
    type: 'get',
    response: ({ url }) => {
      const id = url.match(getUrlPattern(modulePath, true))[1]
      const obj = data.list.find(item => item.id === parseInt(id))
      return copy(obj)
    }
  },
  // 删除单个【StuRefTeach】
  {
    url: getUrlPattern(modulePath, true),
    type: 'delete',
    response: ({ url }) => {
      const id = url.match(getUrlPattern(modulePath, true))[1]
      removeById(data.list, parseInt(id))
      return 1
    }
  },
  // 批量删除【StuRefTeach】
  {
    url: getUrlPattern(modulePath, false),
    type: 'delete',
    response: ({ body }) => {
      for (var id of body) {
        removeById(data.list, id)
      }
      return body.length
    }
  }
]

export default {
  initMockDataStage1,
  initMockDataStage2,
  reqMocks,
  getMockData
}

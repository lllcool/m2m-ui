<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.subject" placeholder="科目"
                style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleQuery"/>
      <el-input v-model="query.teacherName" placeholder="名字"
                style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleQuery"/>
      <el-button class="filter-item" icon="el-icon-search" type="primary"
                 @click="handleQuery">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="success"
                 icon="el-icon-edit" @click="handleCreate">
        新建
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger"
                 icon="el-icon-delete" @click="handleDeleteBatch">
        删除
      </el-button>
      <el-button class="filter-item" icon="el-icon-download" type="warning"
                 @click="handleExport">
        导出
      </el-button>
      <el-button class="filter-item" icon="el-icon-upload2" type="success"
                 @click="handleImport">
        导入
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list"
              @selection-change="selectionChange"
              border stripe style="width: 100%;">
      <el-table-column type="selection" width="50" />
      <el-table-column label="主键"
                       prop="id"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科目"
                       prop="subject"
                       align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.subject }}</span>
        </template>
      </el-table-column>
      <el-table-column label="名字"
                       prop="teacherName"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.teacherName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{row}">
          <el-button size="mini"
                     @click="handleShow(row)" class="table-inner-button">查看</el-button>
          <el-button type="primary" size="mini"
                     @click="handleUpdate(row)" class="table-inner-button">编辑</el-button>
          <el-button type="danger" size="mini"
                     @click="handleDeleteSingle(row)" class="table-inner-button">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="query.currentPage"
                :limit.sync="query.pageSize" @pagination="doQueryList"/>
    <!-- 新建表单 -->
    <teacher-add ref="teacherAdd" @created="doQueryList({ currentPage: 1 })"/>
    <!-- 编辑表单 -->
    <teacher-edit ref="teacherEdit" @updated="doQueryList({})"/>
    <!-- 查看表单 -->
    <teacher-show ref="teacherShow"/>
    <!-- 查看表单 -->
    <teacher-import ref="teacherImport" @imported="doQueryList({ currentPage: 1 })"/>
  </div>
</template>

<script>
import teacherAdd from './add'
import teacherEdit from './edit'
import teacherShow from './show'
import teacherImport from './import'
import teacherApi from '@/api/teacher/teacher'
import Pagination from '@/components/Pagination'

export default {
  name: 'TeacherTable',
  components: {
    Pagination,
    teacherAdd,
    teacherEdit,
    teacherShow,
    teacherImport
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      query: {
        currentPage: 1,
        pageSize: 10,
        subject: null,
        teacherName: null
      },
      selectItems: []
    }
  },
  created() {
    this.doQueryList({ currentPage: 1 })
  },
  methods: {
    /**
     * 选择框变化
     */
    selectionChange(val) {
      this.selectItems = val
    },
    /**
     * 触发搜索操作
     */
    handleQuery() {
      this.doQueryList({ currentPage: 1 })
    },
    /**
     * 执行列表查询
     */
    doQueryList({ currentPage, pageSize }) {
      if (currentPage) {
        this.query.currentPage = currentPage
      }
      if (pageSize) {
        this.query.pageSize = pageSize
      }
      this.listLoading = true
      return teacherApi.fetchList(this.query)
        .then(data => {
          this.list = data.list
          this.total = data.total
        })
        .finally(() => {
          this.listLoading = false
        })
    },
    /**
     * 删除单条记录
     */
    handleDeleteSingle(row) {
      return this.$common.confirm('是否确认删除')
        .then(() => teacherApi.deleteById(row.id))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 批量删除记录
     */
    handleDeleteBatch() {
      if (this.selectItems.length <= 0) {
        this.$common.showMsg('warning', '请选择Teacher')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() => teacherApi.deleteBatch(this.selectItems.map(row => row.id)))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.teacherAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.teacherShow.handleShow(row.id)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.teacherEdit.handleUpdate(row.id)
    },
    /**
     * 导出excel
     */
    handleExport() {
      return this.$common.confirm('是否确认导出')
        .then(() => teacherApi.exportExcel(this.query))
    },
    /**
     * 打开导入表单
     */
    handleImport() {
      this.$refs.teacherImport.show()
    }
  }
}
</script>

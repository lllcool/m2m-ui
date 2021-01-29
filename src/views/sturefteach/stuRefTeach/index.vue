<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="query.stuId" class="filter-item"
                 style="width:200px;" placeholder="学生ID"
                 filterable clearable>
        <el-option v-for="item in options.student"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
        </el-option>
      </el-select>
      <el-select v-model="query.teacherId" class="filter-item"
                 style="width:200px;" placeholder="老师ID"
                 filterable clearable>
        <el-option v-for="item in options.teacher"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="query.stuName" placeholder="学生姓名"
                style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleQuery"/>
      <el-input v-model="query.teaName" placeholder="老师姓名"
                style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleQuery"/>
      <el-input v-model="query.teaSubject" placeholder="科目"
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
      <el-table-column label="老师ID"
                       prop="teacherId"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.teacherId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学生姓名"
                       prop="stuName"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.stuName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="老师姓名"
                       prop="teaName"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.teaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="科目"
                       prop="teaSubject"
                       align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.teaSubject }}</span>
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
    <stuRefTeach-add ref="stuRefTeachAdd" @created="doQueryList({ currentPage: 1 })"/>
    <!-- 编辑表单 -->
    <stuRefTeach-edit ref="stuRefTeachEdit" @updated="doQueryList({})"/>
    <!-- 查看表单 -->
    <stuRefTeach-show ref="stuRefTeachShow"/>
    <!-- 查看表单 -->
    <stuRefTeach-import ref="stuRefTeachImport" @imported="doQueryList({ currentPage: 1 })"/>
  </div>
</template>

<script>
import stuRefTeachAdd from './add'
import stuRefTeachEdit from './edit'
import stuRefTeachShow from './show'
import stuRefTeachImport from './import'
import stuRefTeachApi from '@/api/sturefteach/stuRefTeach'
import studentApi from '@/api/student/student'
import teacherApi from '@/api/teacher/teacher'
import Pagination from '@/components/Pagination'

export default {
  name: 'StuRefTeachTable',
  components: {
    Pagination,
    stuRefTeachAdd,
    stuRefTeachEdit,
    stuRefTeachShow,
    stuRefTeachImport
  },
  data() {
    return {
      options: {
        student: [],
        teacher: []
      },
      list: [],
      total: 0,
      listLoading: true,
      query: {
        currentPage: 1,
        pageSize: 10,
        stuId: null,
        teacherId: null
      },
      selectItems: []
    }
  },
  created() {
    this.doQueryList({ currentPage: 1 })
    studentApi.findOptions().then(data => { this.options.student = data })
    teacherApi.findOptions().then(data => { this.options.teacher = data })
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
      return stuRefTeachApi.fetchList(this.query)
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
        .then(() => stuRefTeachApi.deleteById(row.id))
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
        this.$common.showMsg('warning', '请选择StuRefTeach')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() => stuRefTeachApi.deleteBatch(this.selectItems.map(row => row.id)))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.stuRefTeachAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.stuRefTeachShow.handleShow(row.id)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.stuRefTeachEdit.handleUpdate(row.id)
    },
    /**
     * 导出excel
     */
    handleExport() {
      return this.$common.confirm('是否确认导出')
        .then(() => stuRefTeachApi.exportExcel(this.query))
    },
    /**
     * 打开导入表单
     */
    handleImport() {
      this.$refs.stuRefTeachImport.show()
    }
  }
}
</script>

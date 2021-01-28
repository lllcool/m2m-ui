<template>
  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item" style="margin-left: 10px;" type="success"
                 icon="el-icon-edit" @click="handleCreate">
        新建
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="danger"
                 icon="el-icon-delete" @click="handleDeleteBatch">
        删除
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
      <el-table-column label="团队名称"
                       prop="teamName"
                       align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.teamName }}</span>
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
    <teama-add ref="teamaAdd" @created="doQueryList({ currentPage: 1 })"/>
    <!-- 编辑表单 -->
    <teama-edit ref="teamaEdit" @updated="doQueryList({})"/>
    <!-- 查看表单 -->
    <teama-show ref="teamaShow"/>
  </div>
</template>

<script>
import teamaAdd from './add'
import teamaEdit from './edit'
import teamaShow from './show'
import teamaApi from '@/api/teama/teama'
import Pagination from '@/components/Pagination'

export default {
  name: 'TeamaTable',
  components: {
    Pagination,
    teamaAdd,
    teamaEdit,
    teamaShow
  },
  data() {
    return {
      list: [],
      total: 0,
      listLoading: true,
      query: {
        currentPage: 1,
        pageSize: 10
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
      return teamaApi.fetchList(this.query)
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
        .then(() => teamaApi.deleteById(row.id))
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
        this.$common.showMsg('warning', '请选择teama')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() => teamaApi.deleteBatch(this.selectItems.map(row => row.id)))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.teamaAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.teamaShow.handleShow(row.id)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.teamaEdit.handleUpdate(row.id)
    }
  }
}
</script>

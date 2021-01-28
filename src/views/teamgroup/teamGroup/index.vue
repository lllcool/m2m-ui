<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="query.teamId" class="filter-item"
                 style="width:200px;" placeholder="团队"
                 filterable clearable>
        <el-option v-for="item in options.teama"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="query.teamName" placeholder="团队名称"
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
      <el-table-column label="数量"
                       prop="count"
                       align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="团队"
                       prop="teamId"
                       align="center" width="100">
        <template slot-scope="{row}">
          <span>{{ row.teamId }}</span>
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
    <teamGroup-add ref="teamGroupAdd" @created="doQueryList({ currentPage: 1 })"/>
    <!-- 编辑表单 -->
    <teamGroup-edit ref="teamGroupEdit" @updated="doQueryList({})"/>
    <!-- 查看表单 -->
    <teamGroup-show ref="teamGroupShow"/>
  </div>
</template>

<script>
import teamGroupAdd from './add'
import teamGroupEdit from './edit'
import teamGroupShow from './show'
import teamGroupApi from '@/api/teamgroup/teamGroup'
import teamaApi from '@/api/teama/teama'
import Pagination from '@/components/Pagination'

export default {
  name: 'TeamGroupTable',
  components: {
    Pagination,
    teamGroupAdd,
    teamGroupEdit,
    teamGroupShow
  },
  data() {
    return {
      options: {
        teama: []
      },
      list: [],
      total: 0,
      listLoading: true,
      query: {
        currentPage: 1,
        pageSize: 10,
        teamId: null
      },
      selectItems: []
    }
  },
  created() {
    this.doQueryList({ currentPage: 1 })
    teamaApi.findOptions().then(data => { this.options.teama = data })
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
      return teamGroupApi.fetchList(this.query)
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
        .then(() => teamGroupApi.deleteById(row.id))
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
        this.$common.showMsg('warning', '请选择teamGroup')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() => teamGroupApi.deleteBatch(this.selectItems.map(row => row.id)))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.teamGroupAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.teamGroupShow.handleShow(row.id)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.teamGroupEdit.handleUpdate(row.id)
    }
  }
}
</script>

<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="query.people" placeholder="开票人"
                style="width: 200px;" class="filter-item"
                @keyup.enter.native="handleQuery"/>
      <el-select v-model="query.invoiceId" class="filter-item"
                 style="width:200px;" placeholder="发票ID"
                 filterable clearable>
        <el-option v-for="item in options.invoice"
                   :key="item.key"
                   :label="item.value"
                   :value="item.key">
        </el-option>
      </el-select>
      <el-input v-model="query.invoiceName" placeholder="发票名称"
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
      <el-table-column label="开票人"
                       prop="people"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.people }}</span>
        </template>
      </el-table-column>
      <el-table-column label="价格"
                       prop="price"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发票名称"
                       prop="invoiceName"
                       align="center" width="150">
        <template slot-scope="{row}">
          <span>{{ row.invoiceName }}</span>
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
    <invoiceDetail-add ref="invoiceDetailAdd" @created="doQueryList({ currentPage: 1 })"/>
    <!-- 编辑表单 -->
    <invoiceDetail-edit ref="invoiceDetailEdit" @updated="doQueryList({})"/>
    <!-- 查看表单 -->
    <invoiceDetail-show ref="invoiceDetailShow"/>
    <!-- 查看表单 -->
    <invoiceDetail-import ref="invoiceDetailImport" @imported="doQueryList({ currentPage: 1 })"/>
  </div>
</template>

<script>
import invoiceDetailAdd from './add'
import invoiceDetailEdit from './edit'
import invoiceDetailShow from './show'
import invoiceDetailImport from './import'
import invoiceDetailApi from '@/api/invoicedetail/invoiceDetail'
import invoiceApi from '@/api/invoice/invoice'
import Pagination from '@/components/Pagination'

export default {
  name: 'InvoiceDetailTable',
  components: {
    Pagination,
    invoiceDetailAdd,
    invoiceDetailEdit,
    invoiceDetailShow,
    invoiceDetailImport
  },
  data() {
    return {
      options: {
        invoice: []
      },
      list: [],
      total: 0,
      listLoading: true,
      query: {
        currentPage: 1,
        pageSize: 10,
        people: null,
        invoiceId: null
      },
      selectItems: []
    }
  },
  created() {
    this.doQueryList({ currentPage: 1 })
    invoiceApi.findOptions().then(data => { this.options.invoice = data })
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
      return invoiceDetailApi.fetchList(this.query)
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
        .then(() => invoiceDetailApi.deleteById(row.id))
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
        this.$common.showMsg('warning', '请选择InvoiceDetail')
        return
      }
      return this.$common.confirm('是否确认删除')
        .then(() => invoiceDetailApi.deleteBatch(this.selectItems.map(row => row.id)))
        .then(() => {
          this.$common.showMsg('success', '删除成功')
          return this.doQueryList({ currentPage: 1 })
        })
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.$refs.invoiceDetailAdd.handleCreate()
    },
    /**
     * 打开查看表单
     */
    handleShow(row) {
      this.$refs.invoiceDetailShow.handleShow(row.id)
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(row) {
      this.$refs.invoiceDetailEdit.handleUpdate(row.id)
    },
    /**
     * 导出excel
     */
    handleExport() {
      return this.$common.confirm('是否确认导出')
        .then(() => invoiceDetailApi.exportExcel(this.query))
    },
    /**
     * 打开导入表单
     */
    handleImport() {
      this.$refs.invoiceDetailImport.show()
    }
  }
}
</script>

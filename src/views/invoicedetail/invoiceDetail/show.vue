<template>
  <el-dialog title="查看InvoiceDetail" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="数量">
        <span class="form-item-show">
          {{ form.count }}
        </span>
      </el-form-item>
      <el-form-item label="开票人">
        <span class="form-item-show">
          {{ form.people }}
        </span>
      </el-form-item>
      <el-form-item label="价格">
        <span class="form-item-show">
          {{ form.price }}
        </span>
      </el-form-item>
      <el-form-item label="发票名称">
        <span class="form-item-show">
          {{ form.invoiceName }}
        </span>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import invoiceDetailApi from '@/api/invoicedetail/invoiceDetail'

export default {
  name: 'InvoiceDetailShow',
  data() {
    return {
      form: {
        id: null,
        count: null,
        people: null,
        price: null,
        invoiceId: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      invoiceDetailApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

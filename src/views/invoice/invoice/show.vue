<template>
  <el-dialog title="查看Invoice" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="类别">
        <span class="form-item-show">
          {{ form.type | findEnumLabel(enums.invoiceType) }}
        </span>
      </el-form-item>
      <el-form-item label="发票名称">
        <span class="form-item-show">
          {{ form.invoiceName }}
        </span>
      </el-form-item>
      <el-form-item label="发票标题">
        <span class="form-item-show">
          {{ form.invoiceTitle }}
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
import invoiceApi from '@/api/invoice/invoice'
import enums from '@/utils/enums'

export default {
  name: 'InvoiceShow',
  filters: {
    findEnumLabel: enums.findEnumLabel
  },
  data() {
    return {
      enums: {
        invoiceType: enums.getInvoiceType()
      },
      form: {
        id: null,
        type: null,
        invoiceName: null,
        invoiceTitle: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      invoiceApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

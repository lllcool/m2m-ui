<template>
  <el-dialog title="编辑InvoiceDetail" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="数量" prop="count">
        <el-input v-model="form.count"/>
      </el-form-item>
      <el-form-item label="开票人" prop="people">
        <el-input v-model="form.people"/>
      </el-form-item>
      <el-form-item label="价格" prop="price">
        <el-input v-model="form.price"/>
      </el-form-item>
      <el-form-item label="发票ID" prop="invoiceId">
        <el-select v-model="form.invoiceId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.invoice"
                     :key="item.key"
                     :label="item.value"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="doUpdate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import invoiceDetailApi from '@/api/invoicedetail/invoiceDetail'
import invoiceApi from '@/api/invoice/invoice'

function initFormBean() {
  const formBean = {
    id: null,
    count: null,
    people: null,
    price: null,
    invoiceId: null
  }
  return formBean
}

export default {
  name: 'InvoiceDetailEdit',
  data() {
    return {
      options: {
        invoice: []
      },
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        count: [
          { required: true, message: '请输入数量', trigger: 'blur' },
          { max: 4, message: '长度不能超过4个字符', trigger: 'blur' }
        ],
        people: [
          { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { max: 2, message: '长度不能超过2个字符', trigger: 'blur' }
        ],
        invoiceId: [
          { required: true, message: '请输入发票ID', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    /**
     * 重置表单
     */
    resetForm() {
      for (const key in initFormBean()) {
        this.form[key] = this.old[key]
      }
    },
    /**
     * 打开编辑表单
     */
    handleUpdate(id) {
      invoiceApi.findOptions().then(data => { this.options.invoice = data })
      invoiceDetailApi.fetchById(id)
        .then(data => {
          this.old = data
          this.resetForm()
          this.formVisible = true
          this.$nextTick(() => {
            this.$refs['dataForm'].clearValidate()
          })
        })
    },
    /**
     * 执行修改操作
     */
    doUpdate() {
      this.$refs['dataForm'].validate()
        .then(() => invoiceDetailApi.update(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '修改成功')
          this.$emit('updated', data)
        })
    }
  }
}
</script>

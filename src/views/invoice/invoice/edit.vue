<template>
  <el-dialog title="编辑Invoice" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="类别" prop="type">
        <el-input v-model="form.type"/>
      </el-form-item>
      <el-form-item label="发票名称" prop="invoiceName">
        <el-input v-model="form.invoiceName"/>
      </el-form-item>
      <el-form-item label="发票标题" prop="invoiceTitle">
        <el-input v-model="form.invoiceTitle"/>
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
import invoiceApi from '@/api/invoice/invoice'

function initFormBean() {
  const formBean = {
    id: null,
    type: null,
    invoiceName: null,
    invoiceTitle: null
  }
  return formBean
}

export default {
  name: 'InvoiceEdit',
  data() {
    return {
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        type: [
          { required: true, message: '请输入类别', trigger: 'blur' },
          { max: 8, message: '长度不能超过8个字符', trigger: 'blur' }
        ],
        invoiceName: [
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ],
        invoiceTitle: [
          { required: true, message: '请输入发票标题', trigger: 'blur' },
          { max: 20, message: '长度不能超过20个字符', trigger: 'blur' }
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
      invoiceApi.fetchById(id)
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
        .then(() => invoiceApi.update(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '修改成功')
          this.$emit('updated', data)
        })
    }
  }
}
</script>

<template>
  <el-dialog title="新建Ball" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="球类名称" prop="ballName">
        <el-input v-model="form.ballName"/>
      </el-form-item>
      <el-form-item label="价钱" prop="price">
        <el-input-number v-model="form.price" style="width:100%;" controls-position="right"></el-input-number>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="formVisible = false">
        取消
      </el-button>
      <el-button type="primary"
                 @click="doCreate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import ballApi from '@/api/ball/ball'

function initFormBean() {
  const formBean = {
    ballName: null,
    price: null
  }
  return formBean
}

export default {
  name: 'BallAdd',
  data() {
    return {
      form: initFormBean(),
      formVisible: false,
      formRules: {
        ballName: [
          { required: true, message: '请输入球类名称', trigger: 'blur' },
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ],
        price: [
        ]
      }
    }
  },
  methods: {
    /**
     * 重置表单
     */
    resetForm() {
      this.form = initFormBean()
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.resetForm()
      this.formVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    /**
     * 执行新建操作
     */
    doCreate() {
      this.$refs['dataForm'].validate()
        .then(() => ballApi.create(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '创建成功')
          this.$emit('created', data)
        })
    }
  }
}
</script>

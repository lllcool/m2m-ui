<template>
  <el-dialog title="新建Student" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="学生姓名" prop="name">
        <el-input v-model="form.name"/>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input v-model="form.age"/>
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
import studentApi from '@/api/student/student'

function initFormBean() {
  const formBean = {
    name: null,
    age: null
  }
  return formBean
}

export default {
  name: 'StudentAdd',
  data() {
    return {
      form: initFormBean(),
      formVisible: false,
      formRules: {
        name: [
          { required: true, message: '请输入学生姓名', trigger: 'blur' },
          { max: 32, message: '长度不能超过32个字符', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
          { max: 3, message: '长度不能超过3个字符', trigger: 'blur' }
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
        .then(() => studentApi.create(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '创建成功')
          this.$emit('created', data)
        })
    }
  }
}
</script>

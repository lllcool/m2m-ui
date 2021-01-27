<template>
  <el-dialog title="新建Teacher" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="科目" prop="subject">
        <el-input v-model="form.subject"/>
      </el-form-item>
      <el-form-item label="名字" prop="teacherName">
        <el-input v-model="form.teacherName"/>
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
import teacherApi from '@/api/teacher/teacher'

function initFormBean() {
  const formBean = {
    subject: null,
    teacherName: null
  }
  return formBean
}

export default {
  name: 'TeacherAdd',
  data() {
    return {
      form: initFormBean(),
      formVisible: false,
      formRules: {
        subject: [
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
        ],
        teacherName: [
          { max: 10, message: '长度不能超过10个字符', trigger: 'blur' }
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
        .then(() => teacherApi.create(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '创建成功')
          this.$emit('created', data)
        })
    }
  }
}
</script>

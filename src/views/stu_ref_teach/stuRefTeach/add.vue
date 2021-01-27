<template>
  <el-dialog title="新建StuRefTeach" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="学生ID" prop="stuId">
        <el-select v-model="form.stuId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.student"
                     :key="item.key"
                     :label="item.value"
                     :value="item.key">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="老师ID" prop="teacherId">
        <el-select v-model="form.teacherId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.teacher"
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
                 @click="doCreate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import stuRefTeachApi from '@/api/stu_ref_teach/stuRefTeach'
import studentApi from '@/api/student/student'
import teacherApi from '@/api/teacher/teacher'

function initFormBean() {
  const formBean = {
    stuId: null,
    teacherId: null
  }
  return formBean
}

export default {
  name: 'StuRefTeachAdd',
  data() {
    return {
      options: {
        student: [],
        teacher: []
      },
      form: initFormBean(),
      formVisible: false,
      formRules: {
        stuId: [
        ],
        teacherId: [
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
      studentApi.findOptions().then(data => { this.options.student = data })
      teacherApi.findOptions().then(data => { this.options.teacher = data })
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
        .then(() => stuRefTeachApi.create(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '创建成功')
          this.$emit('created', data)
        })
    }
  }
}
</script>

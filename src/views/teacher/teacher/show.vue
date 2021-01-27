<template>
  <el-dialog title="查看Teacher" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="科目">
        <span class="form-item-show">
          {{ form.subject }}
        </span>
      </el-form-item>
      <el-form-item label="名字">
        <span class="form-item-show">
          {{ form.teacherName }}
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
import teacherApi from '@/api/teacher/teacher'

export default {
  name: 'TeacherShow',
  data() {
    return {
      form: {
        id: null,
        subject: null,
        teacherName: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      teacherApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

<template>
  <el-dialog title="查看StuRefTeach" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="姓名">
        <span class="form-item-show">
          {{ form.sName }}
        </span>
      </el-form-item>
      <el-form-item label="名字">
        <span class="form-item-show">
          {{ form.tName }}
        </span>
      </el-form-item>
      <el-form-item label="科目">
        <span class="form-item-show">
          {{ form.subject }}
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
import stuRefTeachApi from '@/api/stu_ref_teach/stuRefTeach'

export default {
  name: 'StuRefTeachShow',
  data() {
    return {
      form: {
        id: null,
        stuId: null,
        teacherId: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      stuRefTeachApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

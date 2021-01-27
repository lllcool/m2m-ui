<template>
  <el-dialog title="查看Student" :visible.sync="formVisible">
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
          {{ form.name }}
        </span>
      </el-form-item>
      <el-form-item label="年龄">
        <span class="form-item-show">
          {{ form.age }}
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
import studentApi from '@/api/student/student'

export default {
  name: 'StudentShow',
  data() {
    return {
      form: {
        id: null,
        name: null,
        age: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      studentApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

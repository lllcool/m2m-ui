<template>
  <el-dialog title="查看Member" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="成员姓名">
        <span class="form-item-show">
          {{ form.mName }}
        </span>
      </el-form-item>
      <el-form-item label="成员年龄">
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
import memberApi from '@/api/member/member'

export default {
  name: 'MemberShow',
  data() {
    return {
      form: {
        id: null,
        mName: null,
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
      memberApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

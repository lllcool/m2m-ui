<template>
  <el-dialog title="查看teamGroup" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="数量">
        <span class="form-item-show">
          {{ form.count }}
        </span>
      </el-form-item>
      <el-form-item label="团队名称">
        <span class="form-item-show">
          {{ form.teamName }}
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
import teamGroupApi from '@/api/teamgroup/teamGroup'

export default {
  name: 'TeamGroupShow',
  data() {
    return {
      form: {
        id: null,
        count: null,
        teamId: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      teamGroupApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

<template>
  <el-dialog title="编辑teamGroup" :visible.sync="formVisible">
    <el-form ref="dataForm" :rules="formRules" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="数量" prop="count">
        <el-input v-model="form.count"/>
      </el-form-item>
      <el-form-item label="团队" prop="teamId">
        <el-select v-model="form.teamId"
                   style="width:100%;" placeholder="请选择"
                   filterable clearable>
          <el-option v-for="item in options.teama"
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
                 @click="doUpdate()">
        确认
      </el-button>
    </div>
  </el-dialog>
</template>

<script>
import teamGroupApi from '@/api/teamgroup/teamGroup'
import teamaApi from '@/api/teama/teama'

function initFormBean() {
  const formBean = {
    id: null,
    count: null,
    teamId: null
  }
  return formBean
}

export default {
  name: 'TeamGroupEdit',
  data() {
    return {
      options: {
        teama: []
      },
      old: initFormBean(),
      form: initFormBean(),
      formVisible: false,
      formRules: {
        count: [
          { max: 5, message: '长度不能超过5个字符', trigger: 'blur' }
        ],
        teamId: [
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
      teamaApi.findOptions().then(data => { this.options.teama = data })
      teamGroupApi.fetchById(id)
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
        .then(() => teamGroupApi.update(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '修改成功')
          this.$emit('updated', data)
        })
    }
  }
}
</script>

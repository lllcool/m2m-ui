<template>
  <el-dialog title="新建teamGroup" :visible.sync="formVisible">
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
                 @click="doCreate()">
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
    count: null,
    teamId: null
  }
  return formBean
}

export default {
  name: 'TeamGroupAdd',
  data() {
    return {
      options: {
        teama: []
      },
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
      this.form = initFormBean()
    },
    /**
     * 打开新建表单
     */
    handleCreate() {
      this.resetForm()
      teamaApi.findOptions().then(data => { this.options.teama = data })
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
        .then(() => teamGroupApi.create(this.form))
        .then(data => {
          this.formVisible = false
          this.$common.showMsg('success', '创建成功')
          this.$emit('created', data)
        })
    }
  }
}
</script>

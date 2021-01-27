<template>
  <el-dialog title="查看Ball" :visible.sync="formVisible">
    <el-form ref="dataForm" :model="form"
             label-position="left" size="small"
             label-width="100px" style="width: 400px; margin-left:50px;">
      <el-form-item label="主键">
        <span class="form-item-show">
          {{ form.id }}
        </span>
      </el-form-item>
      <el-form-item label="球类名称">
        <span class="form-item-show">
          {{ form.bName }}
        </span>
      </el-form-item>
      <el-form-item label="价钱">
        <span class="form-item-show">
          {{ form.price }}
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
import ballApi from '@/api/ball/ball'

export default {
  name: 'BallShow',
  data() {
    return {
      form: {
        id: null,
        bName: null,
        price: null
      },
      formVisible: false
    }
  },
  methods: {
    /**
     * 打开查看表单
     */
    handleShow(id) {
      ballApi.fetchById(id)
        .then(data => {
          this.form = data
          this.formVisible = true
        })
    }
  }
}
</script>

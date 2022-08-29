<template>
  <div>
    <el-dialog @close="EmitClose" v-model="dialogFormVisible" title="编辑">
      <el-form>
        <el-form-item :label-width="formLabelWidth" v-for="item in barTitle" :key="item"
          :label="item.name != '权限' ? item.name : ''">
          <!-- 如果值为id则不可编辑，值为权限则为选择框 -->
          <el-input v-if="item.props != 'permissions'" v-model="form[item.props]" maxlength="11" :disabled="item.props=='id'" autocomplete="off" />
          <el-form-item v-if="item.props === 'permissions'" label="权限">
            <el-select placeholder="请选择类型" v-model="selected">
              <el-option label="管理员" value="管理员" />
              <el-option label="普通用户" value="普通用户" />
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="submitForm()">Submit</el-button>
          <el-button @click="resetForm()">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onBeforeMount } from 'vue'
import type { FormInstance } from 'element-plus'
import { BarType } from '../interface/FormInterType'

onBeforeMount(()=>{
  console.log('挂载',props.tableData)
  // id自增
  if(JSON.stringify(props.tableData)==='[]'){
    console.log(props.idSum)
    props.tableData.id = props.idSum + 1
  }
  form.value = props.tableData
})
// 输入框width
const formLabelWidth: string = '140px'
// 选择的类型
const selected = ref('')
// 对类型进行限制
interface Props {
  barTitle: Array<BarType>,
  // 传数据
  tableData?:any,
  dialogFormVisible:boolean,
  idSum?:number

}

// 提供初始值
const props = withDefaults(defineProps<Props>(), {
  barTitle: () => [],
  tableData: () => [],
  dialogFormVisible:false,
  idSum:0
})
// 触发事件，将数据传递给父组件
const emit = defineEmits<{
  (e: 'submitForm', value: object): void,
  (e: 'delete', index: number): void,
  (e:'dialogShow'):void
}>()

// 用来编辑表格数据
let form = ref<any>({})
const submitForm = () => {
  // console.log(formEl)

  // 判断是否修改了权限
  if (selected.value != '') {
    console.log('权限', selected.value)
    form.value['permissions'] = selected.value
  }
  emit('submitForm', form.value)

  // emit('dialogShow')
}

// 重置
const resetForm = () => {
  selected.value = ''

  Object.keys(form.value).forEach(key => {
    form.value[key] = ''
  })

}

// 关闭弹窗时向父组件发送信息
const EmitClose = ()=>{
  emit('dialogShow')
}
</script>

<style lang="scss">

</style>
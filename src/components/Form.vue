<template>
  <div>
    <div class="box_height">
      <el-table :data="tableData">
        <el-table-column v-for="item in barTitle" :key="item" :prop="item.props" :label="item.name" />
        <el-table-column label="Operations" width="200">
          <template #default="scope">
            <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="margin-top-16">
      <el-pagination small background layout="prev, pager, next" :total="100" />
    </div>
    <Dialog v-if="dialogIsShow" @submitForm="submit" @dialogShow="EmitDialogShow" :dialogFormVisible="dialogIsShow" :barTitle="barTitle" :tableData="form"></Dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, provide, watch } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'

import { BarType } from '../interface/FormInterType'
import {AuthUserType} from '../interface/AuthorityManageType'
import {UserType} from '../interface/UserManageType'
import '../components/Dialog.vue'
import '../components/Dialog.vue';
const ruleForm = ref({
  name: '',
  checkPass: '',
  age: '',
})



// 对类型进行限制
interface Props {
  barTitle: Array<BarType>,
  tableData: Array<String>,
  dialogIsShow:boolean
}

// 提供初始值
const props = withDefaults(defineProps<Props>(), {
  barTitle: () => [],
  tableData: () => [],
  dialogIsShow:false
})


// 选择的类型
const selected = ref('')
// 触发事件，将数据传递给父组件
const emit = defineEmits<{
  (e: 'submitForm', value: object, index: number): void,
  (e: 'delete', id: number,index:number): void,
  (e:'dialogShow',show:boolean):void
}>()



// 选择要编辑的索引值
let indexEdit = ref<number>(0)

// 用来编辑表格数据
let form = ref<any>({})
// 点击编辑按钮的回调
const handleEdit = (index: number, row: object) => {
  emit('dialogShow',true)
  // dialogFormVisible.value = true
  indexEdit.value = index
  // 深拷贝
  form.value = { ...props.tableData[index] }

}
// 向父组件传递在子组件填写的表格内容
const submit = (value:object)=>{
  emit('submitForm',value,indexEdit.value)
}

// 删除事件
const handleDelete = (index: number, row: UserType & AuthUserType) => {
  // console.log(row.id)
  emit('delete', row.id,index)
}

// 关闭模态框显示
const EmitDialogShow  = ()=>{
  emit('dialogShow',false)
}


const ruleFormRef = ref<FormInstance>()
const submitForm = () => {

  // 判断是否修改了权限
  if (selected.value != '') {
    form.value['permissions'] = selected.value
  }
  emit('submitForm', form.value, indexEdit.value)

}

// 重置
const resetForm = () => {
  selected.value = ''

  Object.keys(form.value).forEach(key => {
    form.value[key] = ''
  })


}



</script>

<style lang="scss" scoped>
@import url('../assets/css/flex.scss');
@import url('../assets/css/position.scss');

.box_height {
  // background-color: aqua;
  height: 410px;
  overflow-y: auto;
  // overflow-y: scroll;
  justify-content: space-between;
}
</style>
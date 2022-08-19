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

    <!-- 弹窗部分 -->
    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form  >
        <el-form-item :label-width="formLabelWidth" v-for="item in barTitle" :key="item"
          :label="item.name != '权限' ? item.name : ''" >
          <el-input  v-if="item.props != 'permissions'" v-model="form[item.props]" autocomplete="off" />
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

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { BarType } from '../interface/FormInterType'
import type { FormInstance } from 'element-plus'

const ruleForm = ref({
  name: '',
  checkPass: '',
  age: '',
})

// 对类型进行限制
interface Props {
  barTitle: Array<BarType>,
  tableData: Array<String>
}

// 提供初始值
const props = withDefaults(defineProps<Props>(), {
  barTitle: () => [],
  tableData: () => []
})

// 点击编辑按钮后的模态框
const dialogFormVisible = ref<boolean>(false)
// 输入框width
const formLabelWidth: string = '140px'
// 选择的类型
const selected = ref('')
// 触发事件，将数据传递给父组件
const emit = defineEmits<{
  (e:'submitForm', value:object,index:number):void,
  (e:'delete',index:number):void
}>()



// 选择要编辑的索引值
let indexEdit = ref<number>(0)
// console.log(props.tableData[0])

// 用来编辑表格数据
let form = ref<any>({})
// 点击编辑按钮的回调
const handleEdit = (index: number, row: BarType) => {
  dialogFormVisible.value = true
  indexEdit.value = index
  // 深拷贝
  form.value = {...props.tableData[index]}
  console.log(form.value)
  // console.log(index, row)
  
}


// 删除事件
const handleDelete = (index: number, row: BarType) => {
  // console.log(index, row)
  emit('delete',index)
}




const ruleFormRef = ref<FormInstance>()
const submitForm = () => {
  // console.log(formEl)

  // 判断是否修改了权限
  if(selected.value != ''){
    console.log('权限',selected.value)
    form.value['permissions'] = selected.value
  }
  emit('submitForm',form.value,indexEdit.value)
  
  dialogFormVisible.value = false
}

// 重置
const resetForm = ()=>{
  selected.value = ''

  Object.keys(form.value).forEach(key=>{
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
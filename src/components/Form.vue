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

    <el-dialog v-model="dialogFormVisible" title="编辑">
      <el-form ref="ruleFormRef" >
        <el-form-item :label-width="formLabelWidth" v-for="item in barTitle" :key="item"
          :label="item.name != '权限' ? item.name : ''" >
          <el-input  v-if="item.props != 'permissions'" autocomplete="off" />
          <el-form-item v-if="item.props === 'permissions'" label="权限">
            <el-select placeholder="请选择类型">
              <el-option label="管理员" value="admin" />
              <el-option label="普通用户" value="user" />
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-button type="primary" @click="submitForm(ruleFormRef)">Submit</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>

      </el-form>

    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { BarType } from '../interface/FormInterType'
import type { FormInstance } from 'element-plus'

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

interface User {
  date: string
  name: string
  address: string
}

// 选择要编辑的索引值
let indexEdit = ref<number>(0)
console.log(props.tableData[0])
const form = reactive({
  pass: '',
  checkPass: '',
  age: '',
})

const checkAge = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error('Please input the age'))
  }
  setTimeout(() => {
    if (!Number.isInteger(value)) {
      callback(new Error('Please input digits'))
    } else {
      if (value < 18) {
        callback(new Error('Age must be greater than 18'))
      } else {
        callback()
      }
    }
  }, 1000)
}

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (form.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password again'))
  } else if (value !== form.pass) {
    callback(new Error("Two inputs don't match!"))
  } else {
    callback()
  }
}



const handleEdit = (index: number, row: User) => {
  dialogFormVisible.value = true
  indexEdit.value = index
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
}


const dialogFormVisible = ref<boolean>(false)
const formLabelWidth: string = '140px'



// const rules = reactive({
//   pass: [{ validator: validatePass, trigger: 'blur' }],
//   checkPass: [{ validator: validatePass2, trigger: 'blur' }],
//   age: [{ validator: checkAge, trigger: 'blur' }],
// })

const ruleFormRef = ref<FormInstance>()
const submitForm = (formEl: FormInstance | undefined) => {
  console.log(formEl)
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
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
}
</style>
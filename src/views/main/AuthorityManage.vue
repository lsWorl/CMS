<template>
  <div>
    <div style="overflow:hidden;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/authorityManage' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider class="margin-top-10 margin-bottom-10" />
    <div>
      <div>
        <el-input clearable maxlength="18" v-model="SearchContent" placeholder="请输入" class="input-with-select">
          <template #prepend>
            <el-select v-model="selected" placeholder="请选择" style="width: 115px">
              <el-option label="姓名" value="1" />
              <el-option label="手机号" value="2" />
              <el-option label="权限类型" value="3" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="SelectData" />
          </template>
        </el-input>
      </div>

      <div>
        <Form @dialogShow="EditDialog" :dialogIsShow="formDialogShow" @delete="deleteItem" @submitForm="changeValue" :barTitle="tableTitle" :tableData="tableData"></Form>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { ElMessage } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

import '../../components/Form.vue'

import { BarType } from '../../interface/FormInterType'
import { User } from '../../interface/AuthorityManageType'

import { ObjectIsEqual } from '../../util/IsEqual'

// 文本框内容
const SearchContent = ref<string>('')
// 选中的文本框的index
const selected = ref<string>('')

// 选择输入框的类型
const SelectData = () => {
  if (selected.value === '') {
    ElMessage({
      type: 'error',
      message: `没有选择类型！`,
    })
    SearchContent.value = ''
    return
  } else if (selected.value === '1') {
    console.log('姓名')
  } else if (selected.value === '2') {

  }
}

// 表单中点编辑后的模态框是否展示
const formDialogShow = ref<boolean>(false)


// 表单中的模态框显示控制
const EditDialog = (show:boolean)=>{
  formDialogShow.value = show
}

// 提交表单后修改数据
const changeValue = (item:User,index:number)=>{
  // console.log(item,index)
  if (ObjectIsEqual(tableData[index],item)) {
    ElMessage({
      type: 'error',
      message: `数据没有发生变化！`,
    })
    
    return
  }
  formDialogShow.value = false
  console.log(tableData[index])
  tableData[index] = item
}
// 删除数据
const deleteItem = (index:number)=>{
  console.log(index)
}
// 表格标题
const tableTitle = ref<BarType[]>([
  {
    name: '姓名',
    props: 'name',
  },
  {
    name: '手机号',
    props: 'phone',
  },
  {
    name: '权限',
    props: 'permissions',
  },
])

// 表格内容
const tableData = reactive<User[]>([
  {
    name: 'Tom',
    phone:'1396896354',
    permissions: '管理员',
  }, 
])
</script>

<style lang="scss">
@import url('../../assets/css/flex.scss');
@import url('../../assets/css/position.scss');
</style>
<template>
  <div>
    <div style="overflow:hidden;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/userManage' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-divider class="margin-top-10 margin-bottom-10" />
    <div>
      <div class="flex flex-around">
        <el-input clearable maxlength="18" v-model="SearchContent" placeholder="请输入" class="input-with-select">
          <template #prepend>
            <el-select v-model="selected" placeholder="请选择" style="width: 115px">
              <el-option label="姓名" value="1" />
              <el-option label="手机号" value="2" />
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="SelectData" />
          </template>
        </el-input>
        <el-button >增加</el-button>
      </div>

      <div>
        <Form @delete="deleteItem" @submitForm ="changeValue" :barTitle="tableTitle" :tableData="tableData"></Form>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref , reactive } from "@vue/reactivity";
import { Search } from '@element-plus/icons-vue'
import {  watch } from "@vue/runtime-core";
import { ElMessage } from 'element-plus'

import '../../components/Form.vue'
import { User } from '../../interface/UserManageType'
import { BarType } from '../../interface/FormInterType'

import http from '../../http/http'
import {FormatT} from '../../util/TimeFormat'

// 向后端请求用户信息
http.get('/users').then(res=>{
  // console.log(res.data)
  if(res.data.code===1){
    // console.log(res.data.data[0])
    res.data.data.forEach((el:User) => {
      el.date = FormatT(el.date)
      tableData.push(el)
    })
  }
})

// 提交表单后修改数据
const changeValue = (item:User,index:number)=>{
  // console.log(item,index)
  
  tableData[index] = item
  console.log(item)
  
  http.put('/users',item)
}

// 文本框内容
const SearchContent = ref<string>('')
// 选中的文本框的index
const selected = ref<string>('')

// 表格标题
const tableTitle = ref<BarType[]>([
  {
    name:'用户id',
    props:'id'
  },
  {
    name: '用户注册日期',
    props: 'date',
  },
  {
    name: '姓名',
    props: 'name',
  },
  {
    name: '手机号',
    props: 'phone',
  },
  {
    name: '地址',
    props: 'address',
  },
])

// 表格内容
const tableData:User[] = reactive([])

// 删除数据
const deleteItem = (index:number)=>{
  console.log(index)
}

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
</script>

<style lang="scss" scoped>
@import url('../../assets/css/flex.scss');
@import url('../../assets/css/position.scss');
</style>
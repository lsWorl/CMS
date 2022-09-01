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
        <el-button @click="dialogFormVisible = true">增加</el-button>
      </div>

      <div>
        <Form @dialogShow="EditDialog" :dialogIsShow="formDialogShow" @delete="deleteItem" @submitForm="changeValue"
          :barTitle="tableTitle" :tableData="tableData"></Form>
      </div>

      <div>
        <!-- v-if是为了动态挂载组件 -->
        <Dialog v-if="dialogFormVisible" :idSum="tableLastId"  @dialogShow="dialogFormVisible = false"
          :barTitle="tableTitle" @submitForm="AddUser" :dialogFormVisible="dialogFormVisible"></Dialog>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "@vue/reactivity";
import { Search } from '@element-plus/icons-vue'
import { watch } from "@vue/runtime-core";
import { ElMessage } from 'element-plus'

import '../../components/Form.vue'
import '../../components/Dialog.vue'
import { UserType } from '../../interface/UserManageType'
import { BarType } from '../../interface/FormInterType'

import http from '../../http/http'
import { FormatT } from '../../util/TimeFormat'
import { ObjectIsEqual } from '../../util/IsEqual'
import { PhoneVerify, DateVerify } from '../../util/Verify'

import { fa } from "element-plus/es/locale";

// 向后端请求用户信息
http.get('/users').then(res => {

  if (res.data.code === 1) {

    res.data.data.forEach((el: UserType) => {
      el.date = FormatT(el.date)
      tableData.value.push(el)
    })
    
    tableLastId.value = tableData.value[tableData.value.length -1].id
  }
})

// 提交表单后修改数据
const changeValue = (item: UserType, index: number) => {

  if (ObjectIsEqual(tableData.value[index], item)) {
    ElMessage({
      type: 'error',
      message: `数据没有发生变化！`,
    })
    return
  }
  if (!DateVerify(item['date'])) {
    ElMessage({
      type: 'error',
      message: `日期格式不正确！`,
    })
    return
  }
  if (!PhoneVerify(item['phone'])) {
    ElMessage({
      type: 'error',
      message: `输入的不是手机号！`,
    })
    return
  }
  
  http.post('/users', item).then(res => {
    if (res.data.code === 1) {
      ElMessage({
        type: 'success',
        message: `成功更新用户数据！`,
      })
      formDialogShow.value = false
      tableData.value[index] = item
    } else {
      ElMessage({
        type: 'error',
        message: `更新失败，请稍后再试...`,
      })
    }
  })
}

// 文本框内容
const SearchContent = ref<string>('')

// 选中的文本框的index
const selected = ref<string>('')

// 表单中点编辑后的模态框是否展示
const formDialogShow = ref<boolean>(false)


// 表单中的模态框显示控制
const EditDialog = (show: boolean) => {
  formDialogShow.value = show
}

// 表格标题
const tableTitle = ref<BarType[]>([
  {
    name: '用户id',
    props: 'id'
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
let tableData= ref<UserType[]>([])

// 用于保存原先的数组
const OriginData = tableData.value

// 用于发请求时候获取最后一项的id
let tableLastId = ref<number>(0)

// 删除数据
const deleteItem = (id: number,index:number) => {
  http.delete('/users', { id: id }).then(res => {
    if (res.data.code === 1) {
      ElMessage({
        type: 'success',
        message: `删除成功！`,
      })
      tableData.value.splice(index,1)
    }
  })

}

// 用来存放搜索到的数据
let SearchResult = ref<UserType[]>([])

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
    OriginData.forEach((item,index)=>{
      // 找到后返回当前索引值
      if(item.name.indexOf(SearchContent.value)!=-1){
        SearchResult.value.push(OriginData[index]) 
      }
    })
    tableData.value = SearchResult.value
    SearchResult.value = []
    // console.log('姓名内容：',SearchContent.value)
  } else if (selected.value === '2') {
    OriginData.forEach((item,index)=>{
      // 找到后返回当前索引值
      if(item.phone.indexOf(SearchContent.value)!=-1){
        SearchResult.value.push(OriginData[index]) 
      }
    })
    tableData.value = SearchResult.value
    SearchResult.value = []
  }
}

// 添加窗口是否显示
const dialogFormVisible = ref(false)

// 添加用户
const AddUser = (item: UserType) => {

  // 传过来的是一个数组，所以要进行解构
  const obj = { ...item }
  if (!obj.phone || !obj.name || !obj.address) {
    ElMessage({
      type: 'error',
      message: `不能为空！`,
    })
    return
  }
  if (!DateVerify(obj['date'])) {
    ElMessage({
      type: 'error',
      message: `日期格式不正确！`,
    })
    return
  }
  if (!PhoneVerify(obj['phone'])) {
    ElMessage({
      type: 'error',
      message: `输入的不是手机号！`,
    })
    return
  }
  http.put('/users', obj).then(res => {
    console.log(res)
    if (res.data.code === 1) {
      ElMessage({
        type: 'success',
        message: `添加成功！`,
      })

      tableData.value.push(obj)

      dialogFormVisible.value = false
      
    } else {
      ElMessage({
        type: 'error',
        message: res.data.errMsg,
      })
    }
  })
}

</script>

<style lang="scss" scoped>
@import url('../../assets/css/flex.scss');
@import url('../../assets/css/position.scss');
</style>
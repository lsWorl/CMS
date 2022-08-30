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
      <div class="flex flex-around">
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
        <el-button @click="dialogFormVisible = true">增加</el-button>
      </div>

      <div>
        <Form @dialogShow="EditDialog" :dialogIsShow="formDialogShow" @delete="deleteItem" @submitForm="changeValue"
          :barTitle="tableTitle" :tableData="tableData"></Form>
      </div>

      <div>
        <!-- v-if是为了动态挂载组件 -->
        <Dialog v-if="dialogFormVisible" :idSum="tableLastId" @dialogShow="dialogFormVisible = false"
          :barTitle="tableTitle" @submitForm="AddUser" :dialogFormVisible="dialogFormVisible"></Dialog>
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
import { AuthUserType } from '../../interface/AuthorityManageType'

import http from '../../http/http'
import { ObjectIsEqual } from '../../util/IsEqual'
import { PhoneVerify } from '../../util/Verify'

// 文本框内容
const SearchContent = ref<string>('')
// 选中的文本框的index
const selected = ref<string>('')

// 添加窗口是否显示
const dialogFormVisible = ref(false)

// 用于发请求时候获取最后一项的id
let tableLastId = ref<number>(0)

// 向后端请求用户信息
http.get('/loginUsers').then(res => {

  if (res.data.code === 1) {

    res.data.data.forEach((el: AuthUserType) => {
      // 将权限设置为文字表示，0表示管理员，1表示普通用户
      el.permissions = el.permissions.toString() === '0' ? '管理员' : '普通用户'
      tableData.value.push(el)
    })

    tableLastId.value = tableData.value[tableData.value.length - 1].id
  }
})


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
const EditDialog = (show: boolean) => {
  formDialogShow.value = show
}

// 提交表单后修改数据
const changeValue = (item: AuthUserType, index: number) => {
  // console.log(item,index)
  if (ObjectIsEqual(tableData.value[index], item)) {
    ElMessage({
      type: 'error',
      message: `数据没有发生变化！`,
    })

    return
  }
  formDialogShow.value = false
  console.log(tableData.value[index])
  tableData.value[index] = item
}
// 删除数据
const deleteItem = (index: number) => {
  console.log(index)
}
// 表格标题
const tableTitle = ref<BarType[]>([
  {
    name: '用户id',
    props: 'id',
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
    name: '权限',
    props: 'permissions',
  },
])

// 表格内容
const tableData = ref<AuthUserType[]>([])

// 添加用户
const AddUser = (item: AuthUserType) => {

  // 传过来的是一个数组，所以要进行解构
  const obj = { ...item }
  if (!obj.phone || !obj.name || !obj.permissions) {
    ElMessage({
      type: 'error',
      message: `不能为空！`,
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

  // 将权限设置为数字表示，0表示管理员，1表示普通用户
  obj.permissions = obj.permissions === '管理员' ? '0' : '1'
  console.log(obj)
  http.put('/loginUsers', obj).then(res => {
    console.log(res)
    if (res.data.code === 1) {
      ElMessage({
        type: 'success',
        message: `添加成功！`,
      })

      tableData.value.push({ ...obj, permissions: obj.permissions.toString() === '0' ? '管理员' : '普通用户' })

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

<style lang="scss">
@import url('../../assets/css/flex.scss');
@import url('../../assets/css/position.scss');
</style>
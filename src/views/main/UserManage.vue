<template>
  <div >
    <div style="overflow:hidden;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index/userManage' }">系统管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
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
            </el-select>
          </template>
          <template #append>
            <el-button :icon="Search" @click="SelectData" />
          </template>
        </el-input>
      </div>

      <div class="">
        <Form></Form>
      </div>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref } from "@vue/reactivity";
import { Search } from '@element-plus/icons-vue'
import { watch } from "@vue/runtime-core";
import { ElMessage } from 'element-plus'

import '../../components/Form.vue'
import '../../components/Form.vue'
// 文本框内容
const SearchContent = ref('')
// 选中的文本框的index
const selected = ref('')

watch(SearchContent, () => {
  // console.log(selected.value)
})

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
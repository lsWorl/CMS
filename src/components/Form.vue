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
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { BarType } from '../interface/FormInterType'
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




const handleEdit = (index: number, row: User) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: User) => {
  console.log(index, row)
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
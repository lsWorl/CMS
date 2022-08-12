<template>
  <div>
    <div class="flex flex-around">
      <div ref="bar" style="height:400px;width: 400px;"></div>
      <div ref="pie" style="height:400px;width: 400px;"></div>
    </div>
    <div class="notice">
      <div style="font-size: 16px;">
        项目功能介绍
        <el-divider class="margin-top-10 margin-bottom-10"/>
      </div>
      <div style="font-size: 12px;">
        <span>用户管理</span>
        <span class="margin-left-16">用来管理用户数据，实现数据的增删改查</span> 
      </div>
      <el-divider class="margin-top-10 margin-bottom-10"/>
      <div style="font-size: 12px;">
        <span>权限管理</span>
        <span class="margin-left-16">用来控制用户权限，显示可以增删改查部分</span> 
      </div>
      <el-divider class="margin-top-10 margin-bottom-10"/>
      <div style="font-size: 12px;">
        <span>单词管理</span>
        <span class="margin-left-16">对单词的数据进行增删改查</span> 
      </div>
      <el-divider class="margin-top-10 margin-bottom-10"/>
    </div>
  </div>
</template>

<script lang="ts" setup >
import { ref, onMounted } from "vue";
import * as echarts from 'echarts';

const pie = ref()
const bar = ref()
console.log(bar)
type EChartsOption = echarts.EChartsOption
var pieOption: EChartsOption;
var barOption: EChartsOption;
onMounted(
  () => {
    init()
  }
)
function init(): void {
  var pieChart = echarts.init(pie.value);
  var barChart = echarts.init(bar.value);
  // 饼图配置
  pieOption = {
    title: {
      text: '单词数量',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    series: [
      {
        type: 'pie',
        radius: '60%',
        data: [
          { value: 1048, name: '四级词汇' },
          { value: 735, name: '高中词汇' },
          { value: 580, name: '考研词汇' },
          { value: 484, name: '雅思词汇' },
          { value: 300, name: '六级词汇' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  // 柱状图配置
  barOption = {
    title: {
      text: 'Waterfall Chart',
      subtext: 'Living Expenses in Shenzhen'
    },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
      }
    ]
  };

  pieOption && pieChart.setOption(pieOption);
  barOption && barChart.setOption(barOption);
}
</script>

<style lang="scss" scoped>
@import url('../../assets/css/flex.scss');
@import url('../../assets/css/position.scss');

.notice {
  box-shadow: 0px 0px 2px 2px #eaeaea;
  border-radius: 4px;
  padding-left: 10px;
  padding-top: 4px;
  padding-bottom: 2px;
}
</style>
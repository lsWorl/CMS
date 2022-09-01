<template>
<div class="common-layout">
    <el-container>
      <el-header height="40px" style="position: relative;background-color: #f3f3f3;"> 
        <div >
      <div class="exit flex flex-around flex-verticle">
        <div>
          欢迎:xxxxxx
        </div>
        <el-icon class="exit_button">
          <SwitchButton />
        </el-icon>
      </div>
    </div>
      </el-header>
      <el-container>
        <!-- 左侧导航 -->
        <el-aside width="200px" style="background-color: #f3f3f3;">
          <el-col >
          <el-menu router :default-active="route.path" @open="handleOpen" @close="handleClose">
            <el-menu-item index="/index/home">
              <template #title>
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>首页</span>
              </template>
            </el-menu-item>
            <el-sub-menu index="/index/home">
              <template #title>
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>系统管理</span>
              </template>
              <el-menu-item index="/index/userManage">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>用户管理</span>
              </el-menu-item>
              <el-menu-item index="/index/authorityManage">
                <el-icon>
                  <icon-menu />
                </el-icon>
                <span>权限管理</span>
              </el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/" disabled>
              <el-icon>
                <document />
              </el-icon>
              <span>单词管理</span>
            </el-menu-item>
            <el-menu-item index="/">
              <el-icon>
                <setting />
              </el-icon>
              <span>设置</span>
            </el-menu-item>
          </el-menu>
        </el-col>
        </el-aside>
        <el-container>
          <el-main><router-view></router-view></el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  SwitchButton
} from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
@import url('../assets/css/flex.scss');
@import url('../assets/css/position.scss');

.exit {
  height: 40px;
  font-size: 16px;
  position: absolute;
  right: 00px;
  // background: #f3f3f3;
  width: 120px;

}

.exit_button:hover {
  cursor: pointer;
  color: #d80404;
}

.header {
  width: 100%;
  background: #f3f3f3;
}
</style>
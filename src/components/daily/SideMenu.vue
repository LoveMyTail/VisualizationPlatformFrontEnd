<template>
  <el-menu
    class="categories"
    default-active="0"
  
    active-text-color="red">
    <el-menu-item index="0" >
      <i class="el-icon-menu"></i>
      <span slot="title">全部</span>
    </el-menu-item>
    <el-menu-item index="1">
      <i class="el-icon-menu"></i>
      <span slot="title">日进耗存</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">库存煤结构</span>
    </el-menu-item>
    <el-menu-item index="3">
      <i class="el-icon-menu"></i>
      <span slot="title">采购信息</span>
    </el-menu-item>
    <el-menu-item index="4">
      <i class="el-icon-menu"></i>
      <span slot="title">日统计信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
  export default {
    name: 'SideMenu'
  }
</script>

<style scoped>
  .categories {
    position: fixed;
    margin-left: 50%;
    left: -600px;
    top: 100px;
    width: 150px;
  }
</style>


<template>
  <el-container>
    <el-main>
      <DailyAll class="dailyall-area"></DailyAll>
    </el-main>

  </el-container>
</template>

<script>
    import SideMenu from './SideMenu'
    import DailyAll from './DailyAll'
    export default {
        name: 'AppDaily',
        components:{
            SideMenu,DailyAll
        }
    }
</script>

<style scoped>
    .dailyall-area {
        margin-left: auto;
        margin-right: auto;
    }

</style>


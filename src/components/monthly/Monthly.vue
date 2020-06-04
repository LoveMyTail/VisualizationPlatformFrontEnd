<template>
  <el-container>
    <el-main>
      <MonthlyAll class="monthlyall-area"></MonthlyAll>
    </el-main>

  </el-container>
</template>

<script>
    import MonthlyAll from './MonthlyAll'
    export default {
        name: 'AppMonthly',
        components:{
            MonthlyAll
        }
    }
</script>

<style scoped>
    .monthlyall-area {
        margin-left: auto;
        margin-right: auto;
    }

</style>


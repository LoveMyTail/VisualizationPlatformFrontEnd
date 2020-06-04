<template>
  <el-container>
    <el-main>
      <AnalyzeAll class="analyzeall-area"></AnalyzeAll>
    </el-main>

  </el-container>
</template>

<script>
    import AnalyzeAll from './AnalyzeAll'
    export default {
        name: 'AppAnalyze',
        components:{
            AnalyzeAll
        }
    }
</script>

<style scoped>
    .analyzeall-area {
        margin-left: auto;
        margin-right: auto;
    }

</style>


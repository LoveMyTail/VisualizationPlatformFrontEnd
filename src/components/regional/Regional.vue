<template>
  <el-container>
    <el-main>
      <RegionalAll class="regional-area"></RegionalAll>
    </el-main>

  </el-container>
</template>

<script>
    import RegionalAll from './RegionalAll'
    export default {
        name: 'AppDaily',
        components:{
            RegionalAll
        }
    }
</script>

<style scoped>
    .regional-area {
        margin-left: auto;
        margin-right: auto;
    }

</style>


<template>
  <el-container>
    <el-main>
      <MarketAll class="marketall-area"></MarketAll>
    </el-main>

  </el-container>
</template>

<script>
    import MarketAll from './MarketAll'
    export default {
        name: 'AppMarket',
        components:{
            MarketAll
        }
    }
</script>

<style scoped>
    .marketall-area {
        margin-left: auto;
        margin-right: auto;
    }

</style>


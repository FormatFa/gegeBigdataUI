<template>
  <div id="app">
    <el-container :direction="horizontal ">
   
      <el-header> 
        <el-container>
             <h1>大数据离线分析平台</h1>
        <el-menu
    @select="handleSelect"
    :router="true"
    :default-active="activeIndex"
    mode="horizontal"
    >
    <el-menu-item index="/cluster">集群管理</el-menu-item>
    <el-menu-item index="/etl">数据ETL</el-menu-item>
    <el-menu-item index="/query">数据查询</el-menu-item>
    <el-menu-item index="/settings">连接配置</el-menu-item>
    </el-menu>
    </el-container>
    </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
   
    
    
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    
  },
  data(){
    return {
      activeIndex:"1"
    }
  },
  mounted(){
    
  }, 

  methods:
  {
    // 点击选择不见后的
    handleSelect(key,keyPath){
      console.log(key,keyPath)

    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;

}
</style>

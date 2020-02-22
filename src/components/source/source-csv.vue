<template>
  <!-- csv的数据源 -->
  <div>
      数据源 <el-input placeholder="输入数据源路径" v-model="path"></el-input>
      <el-input placeholder="分隔符" v-model="separator"></el-input>
  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
export default {
    mixins:[compMixin],
    // csv 的数据源
    name:"source-csv",
    mounted(){
      this.path = this.conf.path;
      this.separator = this.conf.separator;
    }
    ,data(){
        return {
            separator:",",
            path:""
        }
    },
    methods:{
        getConf()
        {
            return {
                 separator:this.separator,
            path:this.path
            }
        }
    }

}
</script>

<style>

</style>
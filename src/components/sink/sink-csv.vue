<template>
  <div>
    Sink 保存路径 

    <el-input placeholder="数据保存路径" v-model="path"></el-input>
    <el-input placeholder="分隔符" v-model="separator"></el-input>
  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
// 保存为csv,逗号分割的文本
export default {
    mixins:[compMixin],
    name:"sink-csv",
    mounted(){
      this.path = this.conf.path;
      this.separator = this.conf.separator;
    },
    methods:{
      
      getConf(){
        return {
          path:this.path,
          separator:this.separator
        }
      }
    },
    data(){
      return {
        path:"",
        separator:","
      }
      

    }

}
</script>

<style>

</style>
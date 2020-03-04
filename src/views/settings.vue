<template>
  
  <div>
<h2>连接配置</h2>
<el-button type="primary" @click="saveSetting"> 保存</el-button>
<!-- 设置界面 -->
<el-row>
  <el-card>
    <div slot="header">
      <span>ETL设置</span>
    </div>
    
    Apache Livy 地址
    <el-input  v-model="config.livyUrl" placeholder="livy地址">
    </el-input>

    ETL Spark程序路径<el-input  v-model="config.coreJar" placeholder="Jar地址"></el-input>
  </el-card>
  <el-card>
    <div slot="header">
      <span>集群管理配置</span>
    </div>
    <el-row>
      HDFS地址: <el-input placeholder='地址' v-model="config.hdfsUrl"></el-input>
    </el-row>
  </el-card>
  <el-card>
    <div slot="header">
      <span>数据查询</span>
    </div>
    <el-row>
      Hive Server2 地址: <el-input placeholder='地址' v-model="config.hiveServer2Url"></el-input>
    </el-row>
  </el-card>
  <el-card>
    <div slot="header">
      <span>项目地址</span>
    </div>
    <el-row>
      Gitee: <el-link type="primary" href="https://gitee.com/FormatFa/gegeBigdataUI">https://gitee.com/FormatFa/gegeBigdataUI</el-link>
    </el-row>
    <el-row>
      Github: <el-link type="primary" href="https://github.com/FormatFa/gegeBigdataUI">https://gitee.com/FormatFa/gegeBigdataUI</el-link>
    </el-row>
    
    
  </el-card>
</el-row>

  </div>

</template>

<script>
import {get, fpost} from '../api/http.js'
// 
export default {
  mounted(){
    // 请求数据
    this.requestData()

  },
  methods:{
    saveSetting(){
      fpost('/api/user/setSetting',{
        settings:JSON.stringify(this.config)
      }).then(res=>{
        this.$message({
          message:"保存成功",
          type:"success"
        })
        console.log(res)
      }).catch(err=>{
        this.$message({
          message:err,
          type:"error"
        })

      })
    },
    requestData(){
      get('/api/user/getSetting').then(res=>{
        console.log('请求设置成功')
        console.log(res)
        let data = res.data
        this.config.livyUrl = data.livyUrl
        this.config.hdfsUrl = data.hdfsUrl
        this.config.coreJar = data.coreJar
        this.config.hiveServer2Url=data.hiveServer2Url
      }).catch(err=>{
        console.log(err)
      })
    }
  },
  data(){
    return {
      // 参数配置
      config:{
        livyUrl:'',
        hdfsUrl:'',
        hiveServer2Url:'',
        coreJar:''

      }


    }
  }

}
</script>

<style>

</style>
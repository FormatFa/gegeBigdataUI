<template>
  
  <div>
<h2>settings</h2>
<el-button type="primary" @click="saveSetting"> 保存</el-button>
<!-- 设置界面 -->
<el-row>
  <el-card>
    <div slot="header">
      <span>ETL设置</span>
    </div>
    <!--  -->
    <el-input  v-model="config.livyUrl" placeholder="livy地址">
    </el-input>
  </el-card>
  <el-card>
    <div slot="header">
      <span>集群管理配置</span>
    </div>
    <el-row>
      HDFS地址: <el-input placeholder='地址' v-model="config.hdfsUrl"></el-input><el-input placeholder='端口'></el-input>
    </el-row>
  </el-card>
  <el-card>
    <div slot="header">
      <span>数据查询</span>
    </div>
    <el-row>
      Hive Server2 地址: <el-input placeholder='地址' v-model="config.hiveServer2Url"></el-input><el-input placeholder='端口'></el-input>
    </el-row>
  </el-card>
</el-row>

  </div>

</template>

<script>
import {get, post} from '../api/http.js'
// 
export default {
  mounted(){
    // 请求数据
    this.requestData()

  },
  methods:{
    saveSetting(){
      post('/api/user/setSetting',{
        settings:JSON.stringify(this.config)
      }).then(res=>{
        console.log('保存成功')
        console.log(res)
      })
    },
    requestData(){
      get('/api/user/getSetting').then(res=>{
        console.log('请求设置成功')
        console.log(res)
        let data = res.data
        this.config.livyUrl = data.livyUrl
        this.config.hdfsUrl = data.hdfsUrl
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

      }


    }
  }

}
</script>

<style>

</style>
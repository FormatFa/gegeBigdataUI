<template>
  
  <div>
    <!-- 集群常见端口 -->

      <h1>HDFS 文件浏览 </h1>
      

      <!-- 集群文件浏览 -->
      <el-tree 
      :props="props"
      :label="getNodeLabel"
      :load="loadNode"
      @node-click="viewfile"
      lazy
      >
      </el-tree>
      <!-- 文件信息对话框 -->
      <el-dialog
      title="文件信息"
      :visible.sync="showDialog"
      >
      完整路径: <div>{{filePath}}</div>
      文件大小:<div>{{fileInfo.length}}</div>
      group:<div>{{fileInfo.group}}</div>
      owener:<div>{{fileInfo.owner}}</div>
      权限:<div>{{fileInfo.permission}}</div>
      <!-- 创建文件夹等工具 -->
      <!-- 当前目录是文件夹时显示 -->
      <el-row  v-if="fileInfo.type == 'DIRECTORY'">
        <el-input placeholder="新文件夹路径" v-model="newdir.dirpath"></el-input> <el-button @click="doNewDir">创建文件夹</el-button>
      </el-row>
      </el-dialog>

  </div>
</template>


<script>
import {newdir,list_status} from '../api/clusterapi.js'

// 集群管理界面
export default {
  methods:{
    // 新建文件夹
    doNewDir(){
      console.log("new dir..."+this.newdir.dirpath)
        newdir({
          path:this.newdir.dirpath
        }).then(res=>{
          console.log('创建文件成功')
          console.log(res)
        }).catch(err=>{
          console.log('创建文件失败')
          console.log(err)
        })
    },
    viewfile(data,node){
      let path = this.getPath(node)
      console.log("ab:"+path)
      this.filePath = path
      console.log(data)
      console.log(node)
      this.showDialog=true
      this.fileInfo=data
      this.newdir.dirpath = this.filePath

    },
    // 获取完整路径
    getPath(node){
     let paths = []
      let temp = node
      while(temp.data.pathSuffix!='/')
      {
        paths.push(temp.data.pathSuffix)
        temp = temp.parent
      }
      console.log(paths)
      paths.reverse()
      // paths.splice(0,0,"/")
      console.log(paths)
      return '/'+paths.join('/')
    },
    // 获取节点名字，文件名
    getNodeLabel(data)
    {
      console.log("get label:.."+data.pathSuffix)
      return data.pathSuffix
    },
    // 加载文件列表
    loadNode(node,resolve)
    {
      if(node.level==0)
      {
        return resolve([{
          pathSuffix:'/',
          type:'DIRECTORY'
        }])
      }

      let abpath = this.getPath(node)
      console.log(abpath)
      list_status({
        path:abpath
      }).then(res=>{
        let status = res.status
        console.log(status)
        resolve(status)
      }).catch(err=>{
        console.log(err)
        this.$alert(err,'加载文件列表失败')
        this.$message({
          message:'加载HDFS文件列表失败',
          type:'error'
        })
        resolve([])
      })

      console.log("加载node")
      console.log(node)
    }


  },
data(){
  return {
    newdir:{
      dirpath:""
    },
    showDialog:false,
    // 当前点击文件路径
    filePath:"",
    fileInfo:{
      type:"",
      accessTime:"",
      blockSize:"",
      group:"",
      supergroup:"",
      owner:"",
      length:"",
      modificationTime:"",
      permission:"",
      replication:"",
    },
    props:{
      label:"pathSuffix",
      isLeaf(data)
      {
      console.log("isfile")
      return data['type']!='DIRECTORY'
      }
    },
    files:[]

  }
}
}
</script>

<style>

</style>  

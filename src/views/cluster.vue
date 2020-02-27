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
      <div>
     <div> 完整路径: <span>{{filePath}}</span></div>
     <div> 文件大小:<span>{{ FileSize (fileInfo.length) }}</span></div>
     <div> group:<span>{{fileInfo.group}}</span></div>
     <div> owener:<span>{{fileInfo.owner}}</span></div>
    <div>  权限:<span>{{fileInfo.permission}}</span></div>
      </div>
      <!-- 创建文件夹等工具 -->
      <!-- 当前目录是文件夹时显示 -->
      <el-row  v-if="fileInfo.type == 'DIRECTORY'">
        <el-input placeholder="新文件夹路径" v-model="newdir.dirpath"></el-input> <el-button :loading="newdir.loading" @click="doNewDir">创建文件夹</el-button>
      </el-row>
      <el-row>
        <el-button :loading="deleteloading" type="danger" @click="deletedir">删除文件</el-button>
      </el-row>
      <!-- 预览文件 -->
      <el-row v-if="fileInfo.type == 'FILE'">
        <div></div>
      </el-row>
      </el-dialog>

  </div>
</template>


<script>
import {newdir,list_status,deletedir} from '../api/clusterapi.js'
import {formatFileSize} from '../utils/tools'
// 集群管理界面
export default {
  computed:{
   
  },
  methods:{
     FileSize(size){
      return formatFileSize(size)
    },
    // 刷新目录数
    refresh(){
      console.log("刷新文件列表 ")
      this.node_root.childNodes =[];
      this.loadNode(this.node_root,this.resolve_root)
    },
    // 删除文件夹:
    deletedir(){
            this.deleteloading =true
      console.log("删除文件"+this.filePath)
        deletedir({
          path:this.filePath
        }).then(res=>{
          this.$message({
            message:"删除成功",
            type:"success"
          })
          this.refresh()
          console.log(res)
        }).catch(err=>{
           this.$message({
            message:"删除失败",
            type:"error"
          })
          console.error(err)
        }).then(()=>{
          this.deleteloading =false
        })

    },
    // 新建文件夹
    doNewDir(){
      this.newdir.loading =true
      console.log("new dir..."+this.newdir.dirpath)
        newdir({
          path:this.newdir.dirpath
        }).then(res=>{
          this.$message({
            message:"创建文件夹成功",
            type:"success"
          })
          this.refresh()
          console.log(res)
        }).catch(err=>{
           this.$message({
            message:"创建文件夹失败",
            type:"error"
          })
          console.log('创建文件失败')
          console.log(err)
        }).then(()=>{
          this.newdir.loading =false
        })
    },
    viewfile(data,node){
      let path = this.getPath(node)
      console.log("viewfile ... ab:"+path)
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
        // 保存根节点，用于刷新
        this.node_root=node;
        this.resolve_root = resolve;
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
    // 根节点
    node_root:{},
    resolve_root:{},
    newdir:{
      dirpath:"",
      loading:false,
    },
    deleteloading:false,
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

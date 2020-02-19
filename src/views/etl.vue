<template>
  <div>
      <h1>ETL</h1>

  <!-- 循环卡片列表 -->
      <el-card
      v-for="project in projects"
      :key="project.id"
      >
        <div slot="header" >
          <span>{{project.name}}</span>
          <!-- 设置点击事件 -->
          <el-button style="float:right; padding: 3px 0" type="text" @click="openEdit(project.id)">编辑</el-button>
          <!--  -->
          <el-button style="float:right; padding: 3px 0" type="text" @click="task.dialogShow = true">执行</el-button>
        </div>
        <div>
          {{project.desc}}
        </div>
      </el-card>

  <!-- 执行任务对话框 -->
  <el-dialog
  title="正在执行任务"
  :visible.sync="task.dialogShow"
  :before-close="handleCloseTask"
  >


  </el-dialog>

      
  </div>
</template>

<script>
import {get} from '../api/http.js'
import {arrayFill} from '../utils/tools.js'
// ELT界面
export default {
// 请求数据
data(){
  // 
  return {
    // 任务相关
    task:{
      dialogShow:false

    },
    //所有工程
    projects:[]


  }
},
mounted(){
  // 请求数据
  console.log("mounted")
  this.requestData()
},
methods:{

// 关闭执行任务对话框
handleCloseTask()
{
  this.$confirm("确认关闭?").then(()=>{

    // 关闭任务对话框
    this.task.dialogShow=false
  }).catch(_=>{
    console.log(_)
  })
},
// 打开编辑界面
  openEdit(id)
  {
    console.log("打开编辑project :"+id)
    console.log(this.$router.push({
      name:"etledit",params:{id:id}
    }))
  },
  requestData(){
    get("/etl/projects/?format=json").then(res=>{
      console.log("请求所有project:")
      console.log(res.data)
      // 填充数据到projects
      arrayFill(this.projects,res.data)
      console.log(this.projects)

      // 填充数据到projects里
    }).catch(err=>{
      console.log("请求数据失败")
      console.log(err)
    })
  }


}

}
</script>

<style>

</style>
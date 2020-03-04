<template>
  <div>
    <el-row type="flex" justify="space-between">
      <div style="display:inline;font-size:x-large;" >ETL工程管理</div>
      <el-button @click="addProject" type='primary' style="float:right;">添加</el-button>
    </el-row>
      
    <el-row :gutter="40">
  <!-- 循环卡片列表 -->
      <el-col :span="6"
       v-for="project in projects"
      :key="project.id"
      >
      <el-card
      >
        <div slot="header" >
          <span>{{project.name}}</span>
          <!-- 设置点击事件 -->
          <el-button style="float:right; padding: 3px 0" type="text" @click="openEdit(project.id)">编辑</el-button>
          <!--  -->
          <el-button style="float:right; padding: 3px 0"  type="text" @click="queryTask(project.id)">运行</el-button>
          <el-button style="float:right; padding: 3px 0" type="text" @click="deleteTask(project.id)">删除</el-button>
        </div>
        <div>
          {{project.desc}}
        </div>
      </el-card>
      </el-col>
      </el-row>

  <!-- 执行任务对话框 -->
  <el-dialog
  title="正在执行任务"
  :visible.sync="task.dialogShow"
  :before-close="handleCloseTask"
  >
  <el-row>
    <!-- 状态 -->
    <div :style="{color:getStateColor()}">任务状态:{{this.task.stateText}}</div>
    <!-- 日志 -->
    <div>
      <el-input
      :autosize="{minRows:2,maxRows:10}"
      :readonly="true"
      v-model="task.log"
        type="textarea">
      </el-input>
      </div>
  </el-row>
  <el-row>
    <el-button type="primary" :loading="task.executing" @click="submitTask(task.projectid)">重新执行</el-button>
    <el-button :loading="querying" type="primary" @click="queryTask(task.projectid)">刷新日志和状态</el-button>
  </el-row>

  </el-dialog>

      
  </div>
</template>

<script>
import {get, post,delete2} from '../api/http.js'
import {arrayFill} from '../utils/tools.js'
import {queryTask,submitTask} from '../api/etlapi.js'
// ELT界面
export default {
  computed:{
 
  },
// 请求数据
data(){
  // 
  return {
    querying:false,
    // 任务相关
    task:{
      dialogShow:false,
      // 当前选择的任务
      projectid:0,
      log:'暂无日志',
      state:'',
      executing:false,
      // 状态文字
      stateText:""
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
       getState(state){
        if(state=='dead')
        {
          return '已停止'
        }
        else if(state=='success')
        {
          return '执行成功'
        }
        else if(state=="running")
        {
          return "运行中"
        }
        else
        return '未知状态:'+state
      },
         getStateColor(){
           let state = this.task.state
        if(state=='dead')
        {
          return '#909399'
        }
        else if(state=='success')
        {
          return '#67C23A'
        }
        else if(state=="running")
        {
          return "#E6A23C"
        }
        else
        return '未知状态:'+state
      },
  addProject(){
    console.log('添加project')
    post('/api/etl/projects/',{

    }).then(res=>{
      console.log("创建工程成功")
      console.log(res)
      this.requestData()
    }).catch(err=>{
      console.log(err)
    })

  },
  // 设置展示的结果
  setResult(data){
    console.log("设置结果")
    console.log(data)
    if(data.state.msg)
    {
      this.task.log=data.state.msg
      this.task.stateText = "请求查询错误"
    }
    else
    {
    
    this.task.log=data.log.log.join('\n')
    this.task.state = data.state.state
    this.task.stateText = this.getState(this.task.state)
    if(this.task.state=="running")
    {
      // 正在运行中时切换按钮为加载中
      this.task.executing=true
    }
    else{
      this.task.executing=false
    }
    }
  },
  deleteTask(projectid){
    delete2('/api/etl/projects/'+projectid).then(res=>{
      console.log("删除成功")
      console.log(res)

      // 刷新数据
      this.requestData()
    }).catch(err=>{
      console.log(err)
    })

  },
  queryTask(projectid){
    this.task.projectid=projectid
    this.task.dialogShow = true
    this.querying = true
    queryTask({
      id:projectid
    }).then(res=>{

      console.log("查询任务完成")
      console.log(res)
      // 得到的结果，包括日志，状态这些
      this.setResult(res)
    }).catch((err)=>{
      // this.$alert(err,'查询任务失败')
      this.task.log = "查询任务失败!:"+err
    }).then(()=>{
      this.querying=false
    })

  },
  // 提交任务 
submitTask(projectid)
{
this.task.dialogShow = true
this.task.executing = true
console.debug("提交任务:"+projectid)
submitTask({
  id:projectid
}).then(()=>{
  console.log("提交结果:完成，正在查询结果")
  
  this.queryTask(projectid)

}).catch(err=>{
  console.error("提交任务失败")
  console.error(err)
   this.$alert(err,'执行任务失败')
}).then(()=>{
  this.task.executing=false
})

},
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
    get("/api/etl/projects/?format=json").then(res=>{
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
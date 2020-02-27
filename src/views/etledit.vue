<template>
  
<div
v-loading="loading"
>

    <el-row>
    <div  class="head1" style="display:inline"> 正在编辑ETL 工程({{ $route.params.id }}) :  <span :class="{ change:isChange }"> {{getName}}</span> </div>
    </el-row>

    <!-- 工程名字什么的 -->
    <el-row>

        <el-input placeholder="工程名字" v-model="project.name">
        </el-input>
        <el-input type="textarea" placeholder="工程描述" v-model="project.desc">
        </el-input>
    </el-row>

    <!-- 保存，等按钮bar  -->
    <el-row type="flex" justify="end">
        <el-col :span="40"
        
        >
            <el-button type="success" @click="saveChange()">保存</el-button>
            </el-col>
    </el-row>

    <!-- 通过不同组件名字来动态显示不同的组件 -->
    <el-row type="flex" justify="center" >
        <el-col
        :span="18"
        >
             <el-card 
              class="component"
               v-for="(comp,index) in comps" :key="index" >
        <!-- 卡片头 -->
        <div slot="header">
            <span  :style="{color:getCompColor(getCompType(comp.compid).type)}">组件 {{index}}</span> <span>{{getCompType(comp.compid).label}}</span>
            <el-button style="float:right; padding: 3px 0" type="text" @click="moveComponent(index,index-1)">上移</el-button>
            <el-button style="float:right; padding: 3px 0" type="text" @click="moveComponent(index,index+1)">下移</el-button>
             <el-button style="float:right; padding: 3px 0" type="text" @click="deleteComponent(index)">删除组件</el-button>
        </div>
        <!-- 指定组件的ref,由compi 组成，方便保存时直接循环 遍历组件 -->
        <!-- 传递conf配置 进去 -->
        <component  :ref="'comp' + index" :conf="comp.conf" :is="comp.compid"></component>
    </el-card>
        </el-col>
    </el-row>
   
    <!-- <component :data="{ a:'s'}" v-bind:is="comp"></component> -->

    <!-- 添加新组件 -->
    <el-card>
        <el-cascader
        ref="addComp"
        :options="newcomp.options"
        v-model="newcomp.compid">
        </el-cascader>
        <el-button @click="addComp()" >添加</el-button>
    </el-card>





</div>

</template>

<script>
import {get,put} from '../api/http.js'
import SourceCsv from '../components/source/source-csv'
import ColSelect from '../components/transform/col-select'
import SinkCsv from '../components/sink/sink-csv'
import SinkConsole from '../components/sink/sink-console'
import ColGroupby from '../components/transform/col-groupby'
import RowLimit from '../components/transform/row-limit'
import orderby from '../components/transform/orderby'
// 所有组件
import components from '../etl/components.js'
// etl 编辑界面
export default {

// 注册组件
components:{
    SourceCsv,ColSelect,SinkCsv,ColGroupby
    ,RowLimit,SinkConsole,orderby

},
computed:{

    getName(){
        if(this.isChange)
        {
            return this.project.name+"*"
        }
        else
        return this.project.name
    }
},
/*
transform里不同的action生成不同的卡片，这里使用is标签来实现
*/
mounted(){
    console.log("etledit mounted");
    this.requestData(this.id)
},
// 
methods:{
    getCompColor(type){
        if(type=="sources")return "#67C23A"
        else if(type=="transforms")return "#E6A23C"
        else if(type=="sinks")return "#F56C6C"
    },
    // 根据组件id获取名字和类型
    getCompType(compid){
        console.log("get type:")
        console.log(compid)
        console.log(this.newcomp.options)
        let result = {}
        this.newcomp.options.forEach(item=>{
            item.children.forEach(comps=>{
                console.log(comps.value)
                 if(comps.value == compid)
                {
                    result =  {
                        type:item.value,
                        label:comps.label
                    }
                    
                }
            })
        })
       
        console.log("查找失败;"+compid)
        console.log(result)
        return result

    },
    // 移动组件,移动index位置的组件到index+offset的位置,只能两个交换
    moveComponent(from ,to){    
        this.comps[to] = this.comps.splice(from, 1, this.comps[to])[0];
        this.isChange=true

    },
    deleteComponent(index){
        console.debug("删除组件:"+index)
        this.comps.splice(index,1)

    },
    // 保存改变
    saveChange(){
        this.loading=true
        // 获取各个组件的值,每个组件都实现getData方法，返回组件的原数据
        //通过ref获取各个组件
        console.debug("保存修改,组件个数:"+this.comps.length);
        this.comps.forEach( (value,index) => {
            console.log(this.$refs)
            let comp = this.$refs['comp'+index][0];            
            this.comps[index].conf= comp.getConf()
        });
    
        put('/api/etl/projects/'+this.id+"/",{
            name:this.project.name,
            desc:this.project.desc,
            data: JSON.stringify(this.comps)
        }).then(res=>{
            console.log("post 保存成功!") 
            console.debug(res)
            this.isChange=false
            this.$message({
                message:"保存成功!",
                type:"success"
            })
        }).catch(err=>{
           console.error("保存失败!")
           console.debug(err)
        }).then(()=>{
            this.loading=false
        })


    },
    //获取组件生成json
    generate(){},
    // 添加新组件
    addComp(){
        this.isChange=true
        // 获取选中的节点
        let checked = this.$refs['addComp'].getCheckedNodes()
        if(checked.length==0)
        {
            console.error("没有选择列")
            return;
        }
        let node = checked[0].data
        console.log(node)
        let item =  {
            // 联级选择器中value是对应的值
                compid:node.value,
                conf:node.conf
            }
        console.warn("添加item:")
        console.warn(item)
        this.comps.push(item)

        //联级选择的是个数组
        // let compid = this.newcomp.compid
        // // 分类键名
        // let sort = this.newcomp.options[compid[0]];
        // let id = compid[1]
        // console.log("添加组件:")
        // console.log(compid)
        // // 在数组里找到对象
        // sort.forEach((value)=>{
        //     if(value.compid==id){
        //         // 添加组件，使用默认配置和组件id
        //         this.comps.push({
        //             compid:value.compid,
        //             conf:value.conf


        //         })
        //     }
        // })
        // this.comps.push({
        //     compid:compid
        // })
        // console.log(this.comps)
    },
    // 根据project id 请求 后台已经保存的数据
    requestData(id){
        this.loading=true
        get("/api/etl/projects/"+id).then(res=>{
            console.log("1. 请求到编辑etl的 data:")
            this.project=res.data
            console.log("2. 转换请求到的字符串为obj")
            console.log(res.data)
            // 配置部分的data
            if(this.project['data']!='')
            this.comps =  JSON.parse(this.project['data'])
            console.log(this.comps)

        }).then(()=>{
            this.loading=false
        })

    },

    // 设置数据
    process()
    {

    }


},
//
data(){

    console.log("get data")
    return {
        // 是否修改了
        isChange:false,

        loading:false,
        project:{
            id:"",
            data:"",
            name:"",
            desc:""
        },
        newcomp:{
            compid:"",
            options:components            
        },
        

        comp:"col-select",
        //数据源
        //核心数据,这个数组来渲染组件列表
        comps:[
            // {
            //     compid:"col-select"
            // },{
            //     compid:"sink-csv"
            // }
        ],

        // sinks
        id:this.$route.params.id
    }
}



}
</script>

<style>

.head1 {
    font-size: x-large;
    display: inline;
}
/* 已经修改 */
.change {
    color: red;
}
/* 组件样式 */
.component {
    /* width:500px; */
    margin-top: 2%;
}


</style>
<template>
<div>

    <!-- 可视化查询功能 ,会话相关-->
   <el-row>

   </el-row>
    <el-row>
        <h1>Hive 查询 </h1>
        <el-input
        type="textarea"
        placeholder="输入Hive SQL"
        v-model="sql"
        ></el-input>
    </el-row>
    <!-- 执行相关 -->
    <el-row>
        <el-button type="primary" :loading="execute.isExecuting" @click="dohivesql">运行</el-button>
    </el-row>
    
    <h1>结果展示</h1>
    <!-- 总行数 -->
    <div>共 {{result.data.length}} 行</div>
    <!-- 下载csv等 -->
    <el-row>
        <el-button>下载数据</el-button>
    
    </el-row>
    <el-table
    :data="result.data"
    >
    <!-- 列名也是动态生成的 -->
    <el-table-column
        v-for="(col,index) in result.columns"
        :key="'c' + index"
        :label="col"
        :prop="'c' + index"
    ></el-table-column>
    </el-table>
    </div>  
</template>

<script>
// 可视化查询
import {post} from '../api/http.js'
export default {
    methods:{
        dohivesql(){
            this.queryHiveSql('xx','csv')
        },
        // 查询得到结果
        queryHiveSql(sql,format){
            console.log(sql)
            this.execute.isExecuting=true
            post('/api/query/hivesql',{
                sql:sql,
                format:format
            }).then(res=>{
                console.log("请求查询数据")
                console.log(res)
                let data = res.data
                this.result.columns = data.columns
                data.data.forEach((row) => {
                    let item={}
                    data.columns.forEach((element,index)=>{
                        item['c'+index]=row[index]
                    })
                    this.result.data.push(item)
                });
                console.log(this.result)
                this.execute.isExecuting=false
            }).catch(()=>{
                this.execute.isExecuting=false
            })
        }
    },
    data(){
        return {
            // 执行任务相关
            execute:{
                // 是否正在执行
                isExecuting:false
            },
            // hive sql执行结果
            result:{
                columns:[
                ],
                data:[]
            },
            sql:""

        }
    }
}
</script>

<style>

</style>
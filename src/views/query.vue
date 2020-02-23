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
        <el-button type="primary" @click="dohivesql">运行</el-button>
    </el-row>
    
    <h1>结果展示</h1>
    <el-table
    :data="result.data"
    >
    <!-- 列名也是动态生成的 -->
    <el-table-column
        v-for="(col,index) in result.columns"
        :key="'c' + index"
    ></el-table-column>
    </el-table>
    </div>  
</template>

<script>
// 可视化查询
import {get} from '../api/http.js'
export default {
    methods:{
        dohivesql(){
            this.queryHiveSql('xx')
        },
        // 查询得到结果
        queryHiveSql(sql){
            console.log(sql)
            get('/api/query/hivesql').then(res=>{
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

            })
        }
    },
    data(){
        return {
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
<template>
<div>

    <!-- 可视化查询功能 ,会话相关-->
   <el-row>

   </el-row>
    <el-row>
        <el-input
        type="textarea"
        placeholder="输入SQL"
        v-model="sql"
        ></el-input>
    </el-row>
    <!-- 执行相关 -->
    <el-row>
        <el-button type="primary">运行</el-button>
    </el-row>
    </div>  
</template>

<script>
// 可视化查询
export default {
    methods:{
        // 查询得到结果
    },
    data(){
        return {
            sql:""

        }
    }
}
</script>

<style>

</style>
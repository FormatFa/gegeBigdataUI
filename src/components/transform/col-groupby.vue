<template>
  <div>
      <el-row>
          <el-input placeholder="分组的字段" v-model="myconf.columns"></el-input>
          <el-input placeholder="聚合的字段" v-model="myconf.aggColumn" > </el-input>
          <!-- 聚合选择器 -->
          <el-select v-model="myconf.operation"  placeholder="选择聚合操作">
              <el-option
      v-for="operation in aggOperations"
      :key="operation.operation"
      :label="operation.label"
      :value="operation.operation">
    </el-option>
          </el-select>
          <el-input placeholder="保存别名" v-model="myconf.alias" > </el-input>
      </el-row>

  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
export default {
    mixins:[compMixin],
    // csv 的数据源
    name:"col-groupby",
    mounted(){
        // 遍历prop里传递过来的，赋值给data里的
            for(let key in this.conf)
            {
                this.myconf[key]=this.conf[key]
            }
    },
    data(){

        return {
            aggOperations:[
    {
        operation:"avg",
        label:"平均值"
    },
    {
        operation:"sum",
        label:"总和"
    },
    {
        operation:"count",
        label:"计数"
    }
],
            myconf:{
                // 
            columns:"",
            // 聚合的字段
            aggColumn:"",
            operation:"",
            // 聚合后的名字
            alias:""
            }

        }
    }
    

}
</script>

<style>

</style>
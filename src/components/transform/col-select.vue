<template>
  
  <div>

<!-- 可选 -->
    <el-row>
      <el-select v-model="col" placeholder="添加选择要的字段">
        <el-option
          v-for="column in availableColumns"
          :key="column"
          :label="column"
          :value="column"
        >
        </el-option>
      </el-select>
    </el-row>
  <el-input  @change="changeCol()" v-model="inputCol" placeholder="添加字段，逗号分割，回车输入"></el-input>

    <el-row>
      <el-tag
      v-for="col in columns"
      :key="col"
      closable
      @close="removeCol(col)"
      >
      {{col}}
      </el-tag>
    </el-row>
    <!-- 已经选择的 -->


  </div>

</template>

<script>
import compMixin from '../baseComponent.js'

export default {
    mixins:[compMixin],
    name:"col-select",
    methods:{ 
        getConf(){
          return {
            columns:this.columns
          }
        },
        // 可以执行的操作
        // 输入改变,更新数组和标签
        changeCol(){
          console.log("change:"+this.inputCol)
          this.columns=this.inputCol.split(",")
        },
        // 选择的关闭的时候,数组改变，更新输入框
        removeCol(col)
        {
          console.log("移除列:"+col)
          // splice在start位置开始移除指定长度的元素
          this.columns.splice(this.columns.indexOf(col),1);
          this.inputCol=this.columns.join(",")
        }
    },
    created(){
      console.log("col-select created")
    },
    mounted(){
      if(this.conf==undefined)
      {
        console.error('col-select 子组件没有检查到conf配置，跳过配置')
        return
      }
      console.log("col-select mounted了，设置父组件传递过来的conf")
      //获取配置里的数据
      console.debug(this.conf)
      this.columns=this.conf['columns']
      this.inputCol=this.columns.join(",")
    },
    computed:{
        availableColumns(){
          if(this.schema)
          {
            return this.schema.columns;
          }
          else
          return [];

        }
    },
    data(){
      // 可选的字段
      return {
        inputCol:"",
        col:"",
        // 已经选择的字段
        columns:["11","22"]

      }
    }

}
</script>

<style>

</style>
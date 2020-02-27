<template>
  <div>
      <el-row>
          <el-input v-model="myconf.column"></el-input>
          <el-select v-model="myconf.order">
            <el-option
            value="asc"
            label="升序"
            ></el-option>
            <el-option
             value="desc"
            label="降序"
            ></el-option>
          </el-select>
      </el-row>
      <el-row></el-row>


  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
export default {
        mixins:[compMixin],
    name:"orderby",
    methods:{},
    data(){
        return {
            myconf:{
                  // 字段名字
            column:"",
            // 顺序,默认降序
            order:"desc"
            }
        }
    }

}
</script>

<style>

</style>
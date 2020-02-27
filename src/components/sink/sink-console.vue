<template>
  
   <div>

      <el-row>

          <el-col>
              <el-input v-model="myconf.limit" placeholder="限制日志行数"></el-input>
          </el-col>

      </el-row>

  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
export default {
    mixins:[compMixin],
    name:"sink-console",
    data(){
        return {
            myconf:{
                limit:500
            }
        }
    }
}
</script>

<style>

</style>
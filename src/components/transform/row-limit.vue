<template>
  
  <div>

      <el-row>

          <el-col>
              <el-input v-model="myconf.num" placeholder="行数"></el-input>
          </el-col>

      </el-row>

  </div>
</template>

<script>
import compMixin from '../baseComponent.js'
export default {
    mixins:[compMixin],
    name:"row-limit",
    methods:{

    },
    data(){
        return {
            myconf:{
                num:10
            }
        }
    }

}
</script>

<style>

</style>
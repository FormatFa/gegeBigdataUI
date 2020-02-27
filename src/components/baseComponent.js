// 基本组件， 方便给其他转换什么的组件调用mix混入https://cn.vuejs.org/v2/guide/mixins.html,因为每个组件都要接受父级的data prop，暂时就这个
var component = {
    // 通用prop属性,data表示组件的配置的对象
    props:{
        // TODO: 组件的数据，包括配置信息等,如果用conf就行就不要这个了
        data:Object,
        // 数据的元数据，包括字段这些
        schema:Object,
        // 组件的配置
        conf:Object,
        // 组件名字
        name:String,
    },
    mounted(){
        this.setConf()
    },
    methods:{
        // 自定设置配置，子组件实现setConf方法的话就会被覆盖
        setConf(){
    if(this.conf==undefined)
      {
        console.error('base component 没有检查到conf配置，跳过配置')
        return
      }
      
      for(let key in this.myconf)
      {
          this.myconf[key]=this.conf[key]
      }
      console.log("自定设置组件conf")

        },
        // 每个组件都要实现这个方法，这个方法用于在调用保存时，根据组件当前编辑框的东西，返回配置
        getConf(){
            console.warn(this.name+ "组件没有实现getConf方法，这个提示在baseComponent.js中")
            // 没有就直接使用myconf
            let result = {}
            for(let key in this.myconf)
            {
                result[key]=this.myconf[key]
            }
            return result
        }
    }

}

export default component

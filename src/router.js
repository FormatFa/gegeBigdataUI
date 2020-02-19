import Vue from 'vue'
import VueRouter from 'vue-router'
import Etl from './views/etl.vue'
import Cluster from './views/cluster.vue'
import Query from './views/query.vue'
import Settings from './views/settings.vue'
import EtlEdit from  './views/etledit.vue'

// 导入组件
Vue.use(VueRouter)
// 路由关系
const routes = [
    {
        path:"/etl",component:Etl,name:"etl"
    },
    // 编辑工程
    {
        path:"/etl/:id", component:EtlEdit,name:"etledit"
    },
    {
        path:"/cluster",component:Cluster,name:"cluster"
    },
    {
        path:"/query",component:Query,name:"query"
    },
    {
        path:"/settings",component:Settings,name:"settings"
    }

]

const router = new VueRouter({
    routes:routes
})

export default router
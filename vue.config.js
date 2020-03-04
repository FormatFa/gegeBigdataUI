module.exports={
    publicPath:"/gegebigdata",
    // 设置开发时代理服务器
devServer:{
    open:true,
    host:"localhost",
    port:'8090',
    // 将/api下的请求代理到django后台区
    proxy:{
        '/api':{
            target:'http://localhost:8000',
            ws:true
        }
    }

}

}
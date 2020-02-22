import axios from 'axios'
// 使用qs post时提交的会是表达，而不是body里的json
import QS from 'qs'
// import {resolve,reject} from 'q'
// import router  from '../router.js'
// import {Message} from 'element-ui'

// 封装axios
export function get(url,params){
    return new Promise((resolve,reject)=>{
        // 请求成功
        axios.get(url,{params:params}).then(res=>{
            // 得到数据
            resolve(res)
        })
        .catch(err=>{
            reject(err)
        })
    })
}

//put 
export function put(url,params,config){
    return new Promise((resolve,reject)=>{

        axios.put(url,params,config).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })

    })
}


//post
export function post(url,params,config){
    console.log("post:"+url)

    return new Promise((resolve,reject)=>{

        axios.post(url, QS.stringify( params),config).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })

    })
}


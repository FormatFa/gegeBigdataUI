import axios from 'axios'
// import QS from 'qs'
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
    return new Promise((resolve,reject)=>{

        axios.post(url,params,config).then(res=>{
            resolve(res)
        }).catch(err=>{
            reject(err)
        })

    })
}


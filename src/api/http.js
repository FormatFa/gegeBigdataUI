import axios from 'axios'
// 使用qs post时提交的会是表达，而不是body里的json
import QS from 'qs'
// import {resolve,reject} from 'q'
// import router  from '../router.js'
// import {Message} from 'element-ui'

// const faxios = axios.default;

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
// fxx,请求api专用
export function fget(url,params){
    return new Promise((resolve,reject)=>{
        // 请求成功
        axios.get(url,{params:params}).then(res=>{
            let resdata = res.data
            // 得到数据,判断返回状态码
            if(resdata.code!=-1)
            {
                resolve(resdata.data)
            }
            else
            // 传递错误信息，给catch,这里出去的是服务器的错误
            reject(resdata.msg)
        })
        .catch(err=>{
            // 这里出去的。。。
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
//put 
export function delete2(url,params,config){
    return new Promise((resolve,reject)=>{

        axios.delete(url,params,config).then(res=>{
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


export function fpost(url,params,config){
    console.log("post:"+url)

    return new Promise((resolve,reject)=>{

        axios.post(url, QS.stringify( params),config).then(res=>{
            let resdata = res.data
            // 得到数据,判断返回状态码
            if(resdata.code!=-1)
            {
                resolve(resdata.data)
            }
            else
            // 传递错误信息，给catch,这里出去的是服务器的错误
            reject(resdata.msg)
        }).catch(err=>{
            reject(err)
        })

    })
}

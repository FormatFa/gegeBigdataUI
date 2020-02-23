import {post} from "./http.js"
// 提交task
export const  submitTask=p=>post("api/etl/submitTask",p)
export const queryTask=p=>post("api/etl/queryTask",p)
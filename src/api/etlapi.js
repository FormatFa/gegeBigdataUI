import {post} from "./http.js"
// 提交task
export const  submitTask=p=>post("etl/submitTask",p)
export const queryTask=p=>post("etl/queryTask",p)
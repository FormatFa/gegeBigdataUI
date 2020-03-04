import {fpost} from "./http.js"
// 提交task
export const  submitTask=p=>fpost("/api/etl/submitTask",p)
export const queryTask=p=>fpost("/api/etl/queryTask",p)
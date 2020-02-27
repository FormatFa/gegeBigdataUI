import {fget}  from '../api/http.js'
export const newdir = p=> fget('/api/cluster/newdir',p)
export const deletedir = p=> fget('/api/cluster/deletedir',p)
export const list_status = p=>fget('/api/cluster/list_status',p)
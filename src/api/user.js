import axios from "~/axios"
import {queryParams} from "~/common/util"





//获取用户接口
export function getUserList(page,query ={}){
    let r =queryParams(query) 
    return axios.get(`/admin/user/${page}${r}`)

}

//更新用户的状态接口

export function updateUserStatus(id,status){
    return axios.post(`/admin/user/${id}/update_status`,{status})

}

//创建用户
export function createUser(data){
    return axios.post(`/admin/user`,data)

}

//编辑用户信息
export function updateUser(id,data){
    return axios.post(`/admin/user/${id}`,data)

}
//删除用户
export function deleteUser(id){
    return axios.post(`/admin/user/${id}/delete`)

}


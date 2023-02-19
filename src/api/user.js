import axios from "~/axios"
//import {queryParams} from "~/common/util"





//获取用户接口
export function getUserList(page,searchForm){
    //let r =queryParams(query) 
    const data = {"page":page,"page_size":10,"keyword":searchForm.keyword,"user_level_id":searchForm.user_level_id}
    return axios.post(`/user/list`,data)

}

//更新用户的状态接口

export function updateUserStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/user/update_status`,data)

}

//创建用户
export function createUser(data){
    return axios.post(`/user/create`,data)

}

//编辑用户信息
export function updateUser(id,form){
    const data = {"id":id,"username":form.username,
    "password": form.password,
    "user_level_id":form.user_level_id ,
    "status": form.status,
    "avatar": form.avatar,
    "nickname":form.nickname,
    "phone":form.phone,
    "email":form.email}
    return axios.post(`/user/edit`,data)

}
//删除用户
export function deleteUser(id){
    const data = {"id":id}
    return axios.post(`/user/delete`,data)

}


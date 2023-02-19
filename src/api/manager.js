import axios from "~/axios"
import {queryParams} from "~/common/util"


export function getCaptcha(){
    return axios.post("/captcha")
}

//用户登陆
export function login(username,password,captcha,captchaId){
    return axios.post("/login",{
        username,password,captcha,captchaId
    })
}

//获取用户详细信息
export function getinfo(){
    return axios.post("/manager/info")
}

//退出登录

export function logout(){
    return axios.post("/manager/logout")
}


//修改用户密码
export function updatepassword(form){
    data = {"old_password":form.oldpassword,"password":form.password}
    return axios.post("/manager/update_password",data)
}

//获取管理员接口
export function getManagerList(page,searchForm){
   // let r =queryParams(query) 
   const data = {"page":page,"page_size":10,"keyword":searchForm.keyword}
    return axios.post(`/manager/list/`,data)

}

//更新管理员的状态接口

export function updateManagerStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/manager/update_status`,data)

}

//创建管理员
export function createManager(data){
    return axios.post(`/manager/create`,data)

}

//编辑管理员信息
export function updateManager(id,form){
    const data = {"id":id,"username":form.username,"password":form.password,"role_id":form.role_id,"status":form.status,"avatar":form.avatar}
    return axios.post(`/manager/edit/`,data)

}
//删除管理员
export function deleteManager(id){
    const data = {"id":id}
    return axios.post(`/manager/delete`,data)

}


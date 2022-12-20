import axios from "~/axios"


//用户登陆
export function login(username,password){
    return axios.post("/admin/login",{
        username,password
    })

}

//获取用户详细信息
export function getinfo(){
    return axios.post("/admin/getinfo")
}

//退出登录

export function logout(){
    return axios.post("/admin/logout")
}


//修改用户密码
export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}

//获取管理员接口
export function getManagerList(page,query ={}){
    let arr = []
    for (const key in query) {
        if (query[key]){
            arr.push(`${key}=${encodeURIComponent(query[key])}`)

        }
    }
    let r = arr.join('&')

    r=r?("?"+r):""
    return axios.get(`/admin/manager/${page}${r}`)

}

//更新管理员的状态接口

export function updateManagerStatus(id,status){
    return axios.post(`/admin/manager/${id}/update_status`,{status})

}

//创建管理员
export function createManager(data){
    return axios.post(`/admin/manager`,data)

}

//编辑管理员信息
export function updateManager(id,data){
    return axios.post(`/admin/manager/${id}`,data)

}
//删除管理员
export function deleteManager(id){
    return axios.post(`/admin/manager/${id}/delete`)

}


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

export function updatepassword(data){
    return axios.post("/admin/updatepassword",data)
}
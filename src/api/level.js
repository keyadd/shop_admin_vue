import axios from "~/axios";

//获取会员等级
export function getUserLevelList(page){
    const data = {"page":page,"page_size":10}
    return axios.post(`/user_level/list`,data)
}
//创建会员等级
export function createUserLevel(data){
    return axios.post(`/user_level/create`,data)
}
//修改会员等级
export function updateUserLevel(id,data){
    return axios.post(`/user_level/edit`+id,data)
}

//删除会员等级
export function deleteUserLevel(id){
    const data = {"id":id}
    return axios.post(`/user_level/delete`,data)
}

//修改会员等级状态
export function updateUserLevelStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/user_level/update_status`,)

}

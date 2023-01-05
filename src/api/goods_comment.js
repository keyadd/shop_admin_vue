import axios from "~/axios"
import {queryParams} from "~/common/util"



//获取管理员接口
export function getGoodsCommentList(page,query ={}){
    let r =queryParams(query) 
    return axios.get(`/admin/goods_comment/${page}${r}`)

}

//更新管理员的状态接口

export function updateGoodsCommentStatus(id,status){
    return axios.post(`/admin/goods_comment/${id}/update_status`,{status})

}

//创建管理员
export function createGoodsComment(data){
    return axios.post(`/admin/GoodsComment`,data)

}

//编辑管理员信息
export function updateGoodsComment(id,data){
    return axios.post(`/admin/GoodsComment/${id}`,data)

}
//删除管理员
export function deleteGoodsComment(id){
    return axios.post(`/admin/GoodsComment/${id}/delete`)

}


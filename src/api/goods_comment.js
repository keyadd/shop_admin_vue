import axios from "~/axios"
import {queryParams} from "~/common/util"



//获取管理员接口
export function getGoodsCommentList(page,query ={}){
    const data = {"page":page,"page_size":10}
    return axios.post(`/goods_comment/list`,data)

}

//更新管理员的状态接口

export function updateGoodsCommentStatus(id,status){
    return axios.post(`/admin/goods_comment/${id}/update_status`,{status})

}
export function reviewGoodsComment(id,data){
    return axios.post(`/admin/goods_comment/review/${id}`,{data})

}






import axios from "~/axios"
import {queryParams} from "~/common/util"



//获取商品接口
export function getGoodsList(page,searchForm){
    const data = {"page":page,"page_size":10,"title":searchForm.title,"tab":searchForm.tab}
    return axios.post(`/goods/list`,data)

}

//商品的上架下架接口

export function updateGoodsStatus(ids,status){
    return axios.post(`/admin/goods/changestatus`,{ids,status})

}

//创建商品
export function createGoods(data){
    return axios.post(`/admin/goods`,data)

}

//编辑商品
export function updateGoods(id,data){
    return axios.post(`/admin/goods/${id}`,data)
}
//删除商品
export function deleteGoods(ids){
    return axios.post(`/admin/goods/delete_all`,{ids})
}

//
export function readGoods(id){
    const data = {"id":id}
    return axios.post(`/goods/read`,data)
}
//设置商品轮播图
export function setGoodsBanner(id,data){
    return axios.post(`/admin/goods/banners/${id}`,data)
}

//更新商品规格
export function updateGoodsSkus(id,data){
    return axios.post(`/admin/goods/updateskus/${id}`,data)
}


export function createGoodsSkusCard(data){
    return axios.post(`/admin/goods_skus_card`,data)
}


//商品规格选项修改
export function updateGoodsSkusCard(id,data){
    return axios.post(`/admin/goods_skus_card/${id}`,data)
}

//商品规格选项删除
export function deleteGoodsSkusCard(id){
    return axios.post(`/admin/goods_skus_card/${id}/delete`)
}

//排序接口
export function sortGoodsSkusCard(data){
    return axios.post(`/admin/goods_skus_card/sort`,data)
}


export function createGoodsSkusCardValue(data){
    return axios.post(`/admin/goods_skus_card_value`,data)
}


//商品规格选项值修改
export function updateGoodsSkusCardValue(id,data){
    return axios.post(`/admin/goods_skus_card_value/${id}`,data)
}

//商品规格选项值删除
export function deleteGoodsSkusCardValue(id){
    return axios.post(`/admin/goods_skus_card_value/${id}/delete`)
}


//
export function chooseAndSetGoodsSkusCard(id,data){
    return axios.post(`/admin/goods_skus_card/${id}/set`,data)
}

//批量恢复商品
export function restoreGoods(ids){
    return axios.post(`/admin/goods/restore`,{ids})
}

//批量彻底删除
export function destroyGoods(ids){
    return axios.post(`/admin/goods/destroy`,{ids})
}


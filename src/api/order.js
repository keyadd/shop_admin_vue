import axios from "~/axios"
import {queryParams} from "~/common/util"



//获取商品订单接口
export function getOrderList(page,searchForm){
    const data = {"page":page,"page_size":10,"no":searchForm.no,"tab":searchForm.tab,"starttime":searchForm.starttime,"endtime":searchForm.endtime,"name":searchForm.name,"phone":searchForm.phone}
    return axios.post(`/order/list`,data)

}

//删除商品订单
export function deleteOrder(ids){
    return axios.post(`/admin/order/delete_all`,{ids})
}


//导出商品订单接口
export function exportOrder(query ={}){
    let r =queryParams(query)
    return axios.post(`/admin/order/excelexport${r}`,{},{responseType:'blob'})

}


//获取商品订单物流
export function getShipInfo(id){
    return axios.get(`/admin/order/${id}/get_ship_info`)
}

//删除商品订单
export function refundOrder(id,data){
    return axios.post(`/admin/order/${id}/handle_refund`,data)
}
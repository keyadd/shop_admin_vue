import axios from "~/axios"


//支付订单 销售额  订单量 新增用户
export function getStatistics1(){
    return axios.get("/admin/statistics1")
}
//柱状图
export function getStatistics3(type){
    return axios.get("/admin/statistics3?type="+type)
}

//店铺商品提示  交易提示
export function getStatistics2(){
    return axios.get("/admin/statistics2")
}
import axios from "~/axios"


//支付订单 销售额  订单量 新增用户
export function getStatistics1(){
    return axios.post("/dashboard/statistics1")
}
//柱状图
export function getStatistics3(type){
    const data = {"date_type":type} 
    //console.log(data)
    return axios.post("/dashboard/statistics3",data)
}

//店铺商品提示  交易提示
export function getStatistics2(){
    return axios.post("/dashboard/statistics2")
}
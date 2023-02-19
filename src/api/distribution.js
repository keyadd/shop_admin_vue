import axios from "~/axios";



//获取商品订单接口
export function getAgentList(page,query ={}){
    const data = {"page":page,"page_size":10}
    return axios.post(`/agent/list`,data)

}

//获取商品订单接口
export function getAgentOrderList(page,query ={}){
    //let r =queryParams(query)
    return axios.get(`/admin/user_bill/${page}`)

}



export function getAgentStatisticsList(){
    return axios.post(`/agent/statistics`)
}



export function getConfig(){
    return axios.get(`/admin/distribution_setting/get`)
}

export function setConfig(data){
    return axios.post(`/admin/distribution_setting/set`,data)
}


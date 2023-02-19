import axios from "~/axios";


export function getCouponList(page){
    const data = {"page":page,"page_size":10}
    return axios.post(`/coupon/list`,data)
}

export function createCoupon(data){
    return axios.post(`/coupon/create`,data)
}

export function updateCoupon(id,data){
    return axios.post(`/coupon/edit`+id,data)
}
export function deleteCoupon(id){
    const data = {"id":id}
    return axios.post(`/coupon/delete`,data)
}

export function updateCouponStatus(id){
    const data = {"id":id,"status":String(0)}
    return axios.post(`/coupon/update_status`,data)

}
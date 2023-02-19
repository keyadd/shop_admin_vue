import axios from "~/axios";


export function getSkusList(page){
    const data = {"page":page,"page_size":10}
    return axios.post(`/skus/list`,data)
}

export function createSkus(data){
    return axios.post(`/skus/create`,data)
}

export function updateSkus(id,data){
    return axios.post(`/skus/edit`+id,data)
}
export function deleteSkus(ids){
    ids =!Array.isArray(ids)?[ids]:ids
    return axios.post(`/skus/delete_all`,{ids})
}


export function updateSkusStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/skus/update_status`,data)

}

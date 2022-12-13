import axios from "~/axios";


//根据图片分类id 获取图片
export function getImageList(id,page=1){
    return axios.get(`/admin/image_class/${id}/image/${page}`)
}


export function updateImage(id,name){
    return axios.post(`/admin/image/${id}`,{name})
}

export function deleteImage(ids){
    return axios.post(`/admin/image/delete_all`,{ids})
}

export const uploadImage = "/api/admin/image/upload"
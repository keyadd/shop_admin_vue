import axios from "~/axios";


//根据图片分类id 获取图片
export function getImageList(data){
    return axios.post(`/image_class/image_list`,data)
}


export function updateImage(data){
    return axios.post(`/image/rename`,data)
}

export function deleteImage(data){
    return axios.post(`/image/delete`,data)
}

export const uploadImage = import.meta.env.VITE_APP_BASE_API+"/image/upload"
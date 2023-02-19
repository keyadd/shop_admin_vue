import axios from "~/axios"

export function getImageClassList(page){
    return axios.post('/image_class/list',page)
}


//新增
export function createImageClass(data){
    return axios.post('image_class/create',data)

}
//更新
export function updateImageClass(data){
    return axios.post('/image_class/edit',data)

}

//删除图片分类
export function deleteImageClass(data){
    return axios.post(`/image_class/delete`,data)
}
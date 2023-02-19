import axios from "~/axios"



export function getCategoryList(){
    return axios.post("/category/list")
}



export function createCategory(data){
    return axios.post(`/category/create`,data)
}

export function updateCategory(id,from){
    const data = {"id":id,"name":from.name,"category_id":from.category_id,"order":from.order,"status":from.status} 
    return axios.post(`/category/edit`,data)
}



export function updateCategoryStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/category/update_status`,data)
}

export function deleteCategory(id){
    const data = {"id":id}
    return axios.post(`/category/delete`,data)
}

//获取分类关联商品
export function getCategoryGoods(id){
    const data = {"id":id}
    return axios.post(`/app_category_item/list`,data)
}


//删除分类关联商品
export function deleteCategoryGoods(id){
    const data = {"id":id}
    return axios.post(`/app_category_item/delete`,data)
}

//关联商品
export function connectCategoryGoods(data){
    return axios.post(`/app_category_item/create`,data)
}

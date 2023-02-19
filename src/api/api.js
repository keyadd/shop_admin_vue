
import axios from "~/axios"


//获取Api接口
export function getApiList(page,searchForm){

    const data = {"page":page,"page_size":10,"keyword":searchForm.keyword}
   
    return axios.post(`/api/list`,data)

}
//获取ApiTree接口
export function getApiTreeList(){
     return axios.post(`/api/list_tree`)
 }

//更新Api的状态接口

export function updateApiStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/api/update_status`,data)

}

//创建Api
export function createApi(data){
    return axios.post(`/api/create`,data)

}

//编辑Api信息
export function updateApi(id,form){
    const data = {"id":id,"rule_id":form.rule_id,"status":form.status,"name":form.name,"router_path":form.router_path,"menu":form.menu,"order":form.order,"method":form.method,"api_group":form.api_group}
    return axios.post(`/api/edit`,data)

}
//删除Api
export function deleteApi(id){
    const data = {"id":id}
    return axios.post(`/api/delete`,data)

}


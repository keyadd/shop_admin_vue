import axios from "~/axios";


export function getRecordList(page,searchForm){
    const data = {"page":page,"page_size":10,"keyword":searchForm.keyword}
    return axios.post(`/operation_record/list`,data)
}
export function deleteRecord(id){

    const data = {'id':id}
    return axios.post(`/operation_record/delete`,data)
}
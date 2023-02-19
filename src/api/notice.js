import axios from "~/axios";


export function getNoticeList(page){
    const data = {"page":page,"page_size":10}
    return axios.post(`/notice/list`,data)
}

export function createNotice(data){
    return axios.post(`/notice/create`,data)
}

export function updateNotice(id,data){
    data = {'id':id,'title':data.title,'content':data.content}
    return axios.post(`/notice/edit`,data)
}
export function deleteNotice(id){
    data = {'id':id}
    return axios.post(`/notice/delete`,data)
}
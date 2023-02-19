import axios from "~/axios";


export function getMenuList(page){
    return axios.post(`/menu/list`)
}


export function createMenu(data){
    return axios.post(`/menu/create`,data)
}

export function updateMenu(id,from){
    const data = {"id":id,"rule_id":from.rule_id,"menu":from.menu,"name":from.name,"status":from.status,"order":from.order,"icon":from.icon,"front_path":from.front_path} 
    return axios.post(`/menu/edit`,data)
}



export function updateMenuStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/menu/update_status`,data)
}

export function deleteMenu(id){
    const data = {"id":id}
    return axios.post(`/menu/delete`,data)
}


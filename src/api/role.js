import axios from "~/axios";


export function getRoleList(page){
    const data = {"page":page,"page_size":10}
    return axios.post(`/role/list`,data)
}

export function createRole(data){
    return axios.post(`/role/create`,data)
}

export function updateRole(id,data){
    return axios.post(`/admin/role/`+id,data)
}
export function deleteRole(id){
    const data = {"id":id}
    return axios.post(`/role/delete`,data)
}


export function updateRoleStatus(id,status){
    const data = {"id":id,"status":String(status)}
    return axios.post(`/role/update_status`,data)

}

export function setRoleRules(role_id,rule_ids){
    const data = {"role_id":role_id,"rule_ids":rule_ids}
    return axios.post(`/role/set_rules`,data)
}
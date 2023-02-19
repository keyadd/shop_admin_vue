
import axios from "~/axios"


//获取Api接口
export function getSystemInfo(){   
    return axios.post(`/system/system_info`)

}
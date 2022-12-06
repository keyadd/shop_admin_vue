import { useCookies } from '@vueuse/integrations/useCookies'

const TokeKey = "admin-cookie"
const cookie = useCookies()


//获取cookie
export function getToken(){
    return cookie.get(TokeKey)
}

//设置cookie 
export function setToken(token){
    return cookie.set(TokeKey,token)
}

//清除cookie

export function removeToken(){
    return cookie.remove(TokeKey)
}
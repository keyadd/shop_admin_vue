import axios from "axios";
import { ElNotification } from 'element-plus'
import {getToken} from '~/common/auth'
import { toast } from "~/common/util";
import store from "./store"


const service = axios.create({
    baseURL:import.meta.env.VITE_APP_BASE_API
})


// 添加请求拦截器
service.interceptors.request.use(function (config) {

    // 往header头自动添加token

    const token = getToken()
    if(token){
        config.headers["Authorization"] = token
    }

    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    
    return response.request.responseType=="blob" ?response.data: response.data.data;
  }, function (error) {
    //console.log(error.response.data)

    
    const msg = error.response.data.msg || "请求失败"
    // 对响应错误做点什么
    
    if( error.response.data.code == 1007){
      store.dispatch('logout').finally(()=>location.reload())
    }
   // console.log(error)
    toast(msg,error)

    return Promise.reject(error);
 })
export default service
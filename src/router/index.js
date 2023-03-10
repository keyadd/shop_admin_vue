import {
    createRouter,
    createWebHashHistory,
    createWebHistory
} from 'vue-router'

import Index from '~/pages/index.vue'
import Login from '~/pages/login.vue'
import NotFound from '~/pages/404.vue'
import Admin from '~/layouts/admin.vue'
import GoodList from '~/pages/goods/list.vue'
import CategoryList from '~/pages/category/list.vue'
import UserList from '~/pages/user/list.vue'
import OrderList from '~/pages/order/list.vue'
import CommentList from '~/pages/comment/list.vue'
import ImageList from '~/pages/image/list.vue'
import NoticeList from '~/pages/notice/list.vue'
import SettingBase from '~/pages/setting/base.vue'
import CouponList from '~/pages/coupon/list.vue'
import ManagerList from '~/pages/manager/list.vue'
import MenuList from '~/pages/menu/list.vue'
import RoleList from '~/pages/role/list.vue'
import SkusList from '~/pages/skus/list.vue'
import LevelList from '~/pages/level/list.vue'
import ApiList from '~/pages/api/list.vue'
import RecordList from '~/pages/record/list.vue'
import Distribution from '~/pages/distribution/index.vue'
import SystemInfo from '~/pages/system/list.vue'




//默认路由所有用户共享
const routers = [{
    path: "/",
    name: "admin",
    component: Admin,


}, {
    path: "/login",
    component: Login,
    meta: {
        title: "登录页"
    }

}, {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}]

//动态路由 用于匹配菜单动态添加路由

const asyncRoutes = [{
    path:"/dashboard",
    name:"/dashboard",
    component:Index,
    meta:{
        title:"后台首页"
    }
},
{
    path:"/api",
    name:"/api",
    component:ApiList,
    meta:{
        title:"API管理"
    }
},{
    path:"/goods/list",
    name:"/goods/list",
    component:GoodList,
    meta:{
        title:"商品管理"
    }
},{
    path:"/category/list",
    name:"/category/list",
    component:CategoryList,
    meta:{
        title:"分类列表"
    }
},{
    path:"/user/list",
    name:"/user/list",
    component:UserList,
    meta:{
        title:"用户列表"
    }
},{
    path:"/order/list",
    name:"/order/list",
    component:OrderList,
    meta:{
        title:"订单列表"
    }
},{
    path:"/comment/list",
    name:"/comment/list",
    component:CommentList,
    meta:{
        title:"评价列表"
    }
},{
    path:"/image/list",
    name:"/image/list",
    component:ImageList,
    meta:{
        title:"图库列表"
    }
},{
    path:"/notice/list",
    name:"/notice/list",
    component:NoticeList,
    meta:{
        title:"公告列表"
    }
},{
    path:"/setting/base",
    name:"/setting/base",
    component:SettingBase,
    meta:{
        title:"配置"
    }
},{
    path:"/coupon/list",
    name:"/coupon/list",
    component:CouponList,
    meta:{
        title:"优惠券列表"
    }
},{
    path:"/manager/list",
    name:"/manager/list",
    component:ManagerList,
    meta:{
        title:"管理员管理"
    }
},{
    path:"/menu/list",
    name:"/menu/list",
    component:MenuList,
    meta:{
        title:"菜单权限管理"
    }
},
{
    path:"/role/list",
    name:"/role/list",
    component:RoleList,
    meta:{
        title:"角色管理"
    }
},{
    path:"/skus/list",
    name:"/skus/list",
    component:SkusList,
    meta:{
        title:"规格管理"
    }
},{
    path:"/level/list",
    name:"/level/list",
    component:LevelList,
    meta:{
        title:"会员等级"
    }
},{
    path:"/record/list",
    name:"/record/list",
    component:RecordList,
    meta:{
        title:"操作历史"
    }
},{
    path:"/distribution/index",
    name:"/distribution/index",
    component:Distribution,
    meta:{
        title:"分销管理"
    }
},{
    path:"/system_info/list",
    name:"/system_info/list",
    component:SystemInfo,
    meta:{
        title:"服务器信息"
    }
}]

export const router = createRouter({
    history: createWebHistory(),
    routes: routers
})


//动态添加路由的方法

export function addRoutes(menus){

    //是否有新路由
    let hasNewRouters= false
    const findAndAddRoutesByMenus = (arr) =>{
        arr.forEach(e => {
            //console.log(e.front_path)
            //e.fromtpath
            let item= asyncRoutes.find(o=>o.path == e.front_path)
            //console.log(item)
            if (item && !router.hasRoute(item.path)){
                router.addRoute('admin',item)
                hasNewRouters =true
            }
            if(e.children && e.children.length >0){
                findAndAddRoutesByMenus(e.children)
            }
        })
    }
    findAndAddRoutesByMenus(menus)
   return hasNewRouters
}
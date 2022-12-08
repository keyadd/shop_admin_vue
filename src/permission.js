import router from "~/router"
import {getToken} from "~/common/auth"
import {toast,showFullLoading,hideFullLoading} from "~/common/util"
import store from "~/store"



//全局前置拦截

router.beforeEach(async (to, from, next) => {
    console.log('全局前置拦截');
    //显示loading

    showFullLoading()

    const token =getToken()
    //没有登陆强制跳转登陆
    if(!token&&to.path !='/login'){
        toast('请先登陆','error')
        return next({path:'login'})
    }

    //防止重复登录
    if(token && to.path == '/login'){
        toast('请勿重复登录','error')
        return next({path:from.path? from.path:'/'})
    }
    //如果用户登录成功 自动获取用户信息 存储到vuex

    if(token){
        await store.dispatch('getinfo')
    }

    //设置页面标题
    let title = (to.meta.title ? to.meta.title:"")
    document.title=title



    // to and from are both route objects. must call `next`.
    next()
})

//全局后置守卫
router.afterEach((to, from) =>{
    hideFullLoading()
    console.log('全局后置守卫');

})

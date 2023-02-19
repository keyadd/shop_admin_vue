import { createStore } from 'vuex'
import { login, getinfo } from '~/api/manager'
import{setToken,removeToken} from '~/common/auth'

// Create a new store instance.
const store = createStore({
  state () {
    return {
        //用户信息
    
      user:{},

      //侧边宽度
      asideWidth:'250px',

      //保存数据
      menus:[],
      ruleNames:[],




    }
  },
  mutations: {
    //记录用户信息
    SET_USERINFO(state,user){
        state.user = user
    },

    //展开/缩起侧边
    handleAsideWidth(state){
      state.asideWidth= state.asideWidth =='250px' ? '64px':'250px'
    },
    SET_MENUS(state,menus){
      state.menus = menus
    },
    SET_RULENSMES(state,ruleNames){
      state.ruleNames = ruleNames
    }


  },
  actions:{
    //登录
    login({commit},{username,password,captcha,captchaId}){
        return new Promise((resolve,reject)=>{
            login(username,password,captcha,captchaId).then(res=>{
                 //设置cookie
                setToken(res)
                resolve(res)

            }).catch(err=>reject(err))
        })
    },

    //退出登录
    logout({commit}){
        removeToken()
        commit('SET_USERINFO',{})

    },

    //获取当前登录用户信息
    getinfo({commit}){
        return new Promise((resolve,reject)=>{
            getinfo().then(res=>{
                commit('SET_USERINFO',res)
                commit('SET_MENUS',res.menus)
                commit('SET_RULENSMES',res.ruleNames) 
                resolve(res)
            }).catch(err => reject(err))
        })

    }

  }
})
export default store
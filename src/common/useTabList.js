import { ref } from 'vue'
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'



export function useTabList() {


    const route = useRoute()
    const cookie = useCookies()
    const router = useRouter()

    const activeTab = ref(route.path)
    const tabList = ref([
        {
            title: '后台首页',
            path: '/'
            // content: 'Tab 1 content',
        }

    ])
    //添加标签导航
    function addTab(tab) {
        let noTab = tabList.value.findIndex(t => t.path == tab.path) == -1
        if (noTab) {
            tabList.value.push(tab)
        }
        cookie.set("tablist", tabList.value)
    }

    onBeforeRouteUpdate((to, from) => {
        activeTab.value = to.path
        addTab({
            title: to.meta.title,
            path: to.path
        })

    })
    //切换标签导航
    const changeTab = (t) => {
        activeTab.value = t
        router.push(t)
    }

    //初始化标签导航

    function initTabList() {
        let tbs = cookie.get('tablist')
        if (tbs) {
            tabList.value = tbs
        }
    }
    initTabList()



    //关闭tab 
    const removeTab = (t) => {
        let tabs = tabList.value
        let a = activeTab.value
        if (a == t) {
            tabs.forEach((tab, index) => {
                if (tab.path == t) {
                    const nextTab = tabs[index + 1] || tabs[index - 1]
                    if (nextTab) {
                        a = nextTab.path
                    }

                }
            })

        }
        activeTab.value = a
        tabList.value = tabList.value.filter(tab => tab.path != t)
        cookie.set('tablist', tabList.value)

    }


    //关闭其他tab 关闭全部tab

    const handleClose = (c) => {
        if (c == 'clearAll') {
            //切回首页
            activeTab.value = '/'
            tabList.value = [{
                title: '后台首页',
                path: '/'
            }]

        } else if (c == 'clearOther') {
            //过滤首页 和当前激活的页面
            tabList.value = tabList.value.filter(tab => tab.path == '/' || tab.path == activeTab.value)
        }
        cookie.set('tablist', tabList.value)

    }


    return {
        activeTab,
        tabList,
        changeTab,
        removeTab,
        handleClose
    }

}
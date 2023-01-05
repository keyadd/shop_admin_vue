<template>
    <div class="a-header">
        <span class="logo">
            <el-icon class="mr-1"><eleme-filled /></el-icon>
            GIN后台
        </span>
        <el-tooltip class="box-item" effect="dark" content="展开" placement="bottom-start">
            <el-icon class="icon-btn" @click="$store.commit('handleAsideWidth')">
                <Fold v-if="$store.state.asideWidth == '250px'" />
                <Expand v-else />
            </el-icon>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom-start">
            <el-icon class="icon-btn" @click="handleRefresh">
                <Refresh />
            </el-icon>
        </el-tooltip>
        <div class="header_item">
            <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom-start">
                <el-icon class="icon-btn" @click="toggle">
                    <FullScreen v-if="!isFullscreen" />
                    <Aim v-else />
                </el-icon>
            </el-tooltip>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                    <el-avatar class="m-2" :size="25" :src="$store.state.user.avatar" />
                    {{ $store.state.user.username }}
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>


    <form-drawer ref="formDrawerRef" title="修改密码" destroyOnClose @submit="onSubmit">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px" size="small">
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="form.oldpassword" placeholder="请输入旧密码">

                </el-input>
            </el-form-item>
            <el-form-item prop="password" label="新密码">
                <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password>
                </el-input>
            </el-form-item>
            <el-form-item prop="repassword" label="确认密码">
                <el-input type="repassword" v-model="form.repassword" placeholder="请输入确认密码" show-password>
                </el-input>
            </el-form-item>
        </el-form>
    </form-drawer>
</template> 



<script setup>
import { reactive, ref } from "vue"
import { logout, updatepassword } from '~/api/manager'
import { showModal, toast } from '~/common/util'
import FormDrawer from "~/components/FormDrawer.vue"
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { useRepassword,useLogout } from '~/common/useManager'







//isFullscreen 是否全屏 //toggle切花全屏
const { isFullscreen, toggle } = useFullscreen()

const { formDrawerRef,
        form,
        rules,
        formRef,
        onSubmit,
        openRePassWordForm }= useRepassword()

const {handleLogout} = useLogout()

//
const handleCommand = (c) => {
    //console.log(c);
    switch (c) {
        case "logout":
            handleLogout()
            break;
        case "rePassword":
            // showDrawer.value =true
            openRePassWordForm()
            break;
        default:
            break;
    }

}



//刷新
function handleRefresh() {
    location.reload()
}





</script>
<style >
.a-header {

    @apply flex bg-sky-500 text-light-50 fixed top-0 right-0 left-0;
    height: 64px;
    z-index: 1000;

}

.logo {
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}

.icon-btn {
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-sky-600
}

.a-header .dropdown {
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-1;

}
.header_item{
    @apply ml-auto flex items-center;
}
</style>
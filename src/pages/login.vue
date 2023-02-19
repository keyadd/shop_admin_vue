<template>
    <el-row class="login-container">
        <el-col :span="24" class="right">
            <h2 class="title">后台登陆</h2>
            <div>
                <span class="line"></span>
                <span>账号密码登陆</span>
                <span class="line"></span>
            </div>
            <el-form ref="formRef" :rules="rules" :model="form" class="w-[250px]">
                <el-form-item prop="username">
                    <el-input v-model="form.username" placeholder="请输入用户名">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="form.password" placeholder="请输入用户密码" show-password>
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>

                <el-form-item style="position: relative" prop="captcha">
                    <el-input v-model="form.captcha"  placeholder="请输入验证码" style="width: 60%" />
                    <div class="vPic">
                        <img v-if="picPath" :src="picPath"  style="width:100px"  alt="请输入验证码"
                            @click="loginVefify()" />
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button round type="primary" @click="onSubmit" :loading="loading"
                        class="w-[250px]">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script setup>
import { reactive, ref, onMounted, onBeforeUnmount } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { min } from "lodash";
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { getCaptcha } from '~/api/manager'

import { toast } from "~/common/util";



const router = useRouter()
const store = useStore()
const logVerify = ref("")
const picPath = ref("")

// do not use same name with ref
const form = reactive({
    username: "admin",
    password: "admin",
    captcha: "",
    captchaId: "",
});

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // {min:3,max:20,message:'用户名长度3到20之间',trigger:'blur'}

    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    captcha: [
        { required: true, message: '请输入验证码', trigger: 'blur' }
    ]
}

const formRef = ref(null)
const loading = ref(false)

const loginVefify = ()=>{
    captcha()
}


const captcha = () => {


    getCaptcha().then(res => {
        //console.log(res.pic_path);
        picPath.value = res.pic_path
        form.captchaId = res.captcha_id

    }).finally(() => {

    })

}
captcha()


const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        //console.log(form)

        loading.value = true
        store.dispatch('login', form).then(res => {
            toast('登录成功')
            router.push("/dashboard")
        }).finally(() => {
            loading.value = false
        })
        // login(form.username, form.password).then(res => {
        //     toast('登录成功')



        //     //请求成功后跳转
        //     router.push("/")
        // }).finally(() => {
        //         loading.value = false
        // })
    })

}


//监听回车事件
function onKeyUp(e) {
    //console.log(e);
    if (e.key == 'Enter') {
        onSubmit()
    }

}


//添加键盘监听
onMounted(() => {
    document.addEventListener('keyup', onKeyUp)
})
onBeforeUnmount(() => {
    document.removeEventListener('keyup', onKeyUp)
})

</script>

<style>
.login-container {
    @apply min-h-screen bg-green-500;
}

.login-container .right {
    @apply bg-light-50 flex items-center justify-center flex-col;
}

.right .title {
    @apply font-bold text-3xl text-gray-800;
}

.right>div {
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.right>div .line {
    @apply h-[1px] w-16 bg-gray-200;
}
</style>
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
                <el-form-item>
                    <el-button round type="primary" @click="onSubmit" :loading="loading"
                        class="w-[250px]">登陆</el-button>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>


<script setup>
import { login, getinfo } from '~/api/manager'
import { reactive, ref } from "vue";
import { User, Lock } from '@element-plus/icons-vue'
import { min } from "lodash";
import { ElNotification } from 'element-plus'
import { useRouter } from 'vue-router';
import { useCookies } from '@vueuse/integrations/useCookies'


const router = useRouter()

// do not use same name with ref
const form = reactive({
    username: "",
    password: "",
});

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        // {min:3,max:20,message:'用户名长度3到20之间',trigger:'blur'}

    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const formRef = ref(null)
const loading = ref(false)

const onSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return false
        }

        loading.value = true
        login(form.username, form.password).then(res => {
            ElNotification({
                message: '登录成功',
                type: 'success',
                duration: 2000
            })
            //设置cookie
            const cookie = useCookies()
            cookie.set("admin-cookie", res.token)

            //请求成功后获取用户相关信息
            getinfo().then(res2 => {
                console.log(res2);
            })


            //请求成功后跳转
            router.push("/")
        }).finally(() => {
                loading.value = false
        })
    })

};
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
<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->

        <Search :model="searchForm" @search="onSearch" @reset="resetSearchFrom">

            <SearchItem label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
            </SearchItem>


      

        </Search>


        <!-- <el-form :model="searchForm" label-width="80px" class="mb-3" size="small">
            <el-row :gutter="20">
                <el-col :span="8" :offset="0">
                    <el-form-item label="关键词">
                        <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
                    </el-form-item>

                </el-col>
                <el-col :span="8" :offset="8">

                    <div class="flex items-center justify-end">
                        <el-button type="primary" @click="getData">搜索</el-button>
                        <el-button @click="resetSearchFrom">重置</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-form> -->
        <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>



        <!-- 新增 刷新 -->

        <el-table :data="tableData" border stripe style="width: 100%" v-loading="loading">
            <el-table-column label="管理员" width="200px">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-avatar :size="40" :src="row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                        <div class="ml-3">
                            <h6>{{ row.username }}</h6>
                            <small>ID:{{ row.id }}</small>
                        </div>

                    </div>

                </template>

            </el-table-column>
            <el-table-column align="center" label="所属角色" width="380">
                <template #default="{ row }">
                    {{ row.role?.name || "-" }}
                </template>

            </el-table-column>
            <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :disabled="row.super == 1" :loading="row.statusLoading" :modelValue="row.status"
                        :active-value="1" :inactive-value="0" @change="handleStatusChange($event, row)">
                    </el-switch>

                </template>

            </el-table-column>
            <el-table-column prop="create_time" label="创建时间" width="380" />
            <el-table-column label="操作" width="180px" align="center">
                <template #default="scope">
                    <small v-if="scope.row.super == 1" class="text-sm text-gray-600">暂无操作</small>
                    <div v-else>
                        <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                        <el-popconfirm title="是否要删除该管理员" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>

                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <ChooseImage v-model="form.avatar" />
                </el-form-item>
                <el-form-item label="所属角色" prop="rule_id">
                    <el-select v-model="form.role_id" value-key="" placeholder="选择所属角色" clearable filterable>
                        <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="状态" prop="status">
                    <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>

                </el-form-item>
            </el-form>


        </FormDrawer>


    </el-card>
</template>
<script setup>
import { ref } from "vue-demi";
import { getManagerList, updateManagerStatus, createManager, updateManager, deleteManager } from "~/api/manager"
import FormDrawer from "~/components/FormDrawer.vue"
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from "~/components/ListHeader.vue"
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";


import { useInitTable, useInitForm } from '~/common/useCommon'

const roles = ref([])

const { searchForm, resetSearchFrom, tableData, loading, currentPage, total, onSearch,limit, getData, handleDelete, handleStatusChange } = useInitTable({
    searchForm: {
        keyword: ""
    },
    getList: getManagerList,
    noGetListSuccess: (res) => {
        
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            return o
        })
        total.value = res.total
        roles.value = res.roles

    },
    delete: deleteManager,
    updateStatus: updateManagerStatus
})




const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
    form: {
        username: '',
        password: '',
        role_id: null,
        status: 1,
        avatar: ''
    },
    rules: {
        username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },],
        password: [{ required: true, message: '密码不能为空', trigger: 'blur' },]
    },
    getData,
    update: updateManager,
    create: createManager
})








</script>
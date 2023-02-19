<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->

        <Search :model="searchForm" @search="onSearch" @reset="resetSearchFrom">

            <SearchItem label="关键词">
                <el-input v-model="searchForm.keyword" placeholder="Api路由" clearable></el-input>
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
            <el-table-column prop="id" align="center"  label="ID" width="100" />
            <el-table-column prop="name"  label="API名称" width="180" />
            <el-table-column prop="router_path"  label="API路由" width="180" />
            <el-table-column prop="method" align="center" label="请求方式" width="100" />
            <el-table-column prop="api_group"  label="API分组" width="150" />
            <el-table-column label="状态" align="center" width="120">
                <template #default="{ row }">
                    <el-switch :disabled="row.super == 1" :loading="row.statusLoading" :modelValue="row.status"
                        :active-value="1" :inactive-value="0" @change="handleStatusChange($event, row)">
                    </el-switch>

                </template>

            </el-table-column>
            <el-table-column prop="create_time" align="center" label="创建时间" width="280" />
            <el-table-column label="操作"  align="center">
                <template #default="scope">
                    
                        <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>

                        <el-popconfirm title="是否要删除该管理员" confirm-button-text="确认" cancel-button-text="取消"
                            @confirm="handleDelete(scope.row.id)">
                            <template #reference>
                                <el-button text type="primary" size="small">删除</el-button>
                            </template>
                        </el-popconfirm>
                   
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.rule_id" :options="menusFrom"
                        :props="{value:'id' ,label: 'name', children: 'children', checkStrictly: true, emitPath: false }"
                        placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="权限" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="0">权限</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width:30%" placeholder="名称"></el-input>
                </el-form-item>
                
                <el-form-item label="API路由" prop="router_path"  >
                    <el-input v-model="form.router_path" placeholder="API路由"></el-input>
                </el-form-item>
                <el-form-item label="API分组" prop="api_group"  >
                    <el-input v-model="form.api_group" placeholder="API分组"></el-input>
                </el-form-item>
                <el-form-item label="请求方式" prop="method"  >
                    <el-select v-model="form.method" placeholder="请选择请求方式">
                        <el-option v-for="item in ['GET','POST','PUT','DELETE']" :key="item" :label="item" :value="item"
                            :disabled="item.disabled"  />
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="10000" />
                </el-form-item>

            </el-form>


        </FormDrawer>


    </el-card>
</template>
<script setup>
import { ref } from "vue-demi";
import { getApiList, updateApiStatus, createApi, updateApi, deleteApi } from "~/api/api"
import { getMenuList} from "~/api/menu"
import FormDrawer from "~/components/FormDrawer.vue"
import ChooseImage from '~/components/ChooseImage.vue'
import ListHeader from "~/components/ListHeader.vue"
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";


import { useInitTable, useInitForm } from '~/common/useCommon'

const roles = ref([])
const menusFrom = ref([])

const { searchForm, resetSearchFrom, tableData, loading, currentPage, total, limit, getData,onSearch, handleDelete, handleStatusChange } = useInitTable({
    searchForm: {
        keyword: ""
    },
    getList: getApiList,
    noGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            return o
        })
        total.value = res.total
        roles.value = res.roles

    },
    delete: deleteApi,
    updateStatus: updateApiStatus
})

const { } = useInitTable({
    getList: getMenuList,
    noGetListSuccess: (res) => {

        menusFrom.value = res.list
        
    }
})




const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
    form: {
        rule_id: 0,
        menu: 0,
        name: '',
        api_group:'',
        method: 'GET',
        status: 1,
        order: 1,
        router_path:'',
    },
    rules: {
        // username: [{ required: true, message: '用户名不能为空', trigger: 'blur' },],
        // password: [{ required: true, message: '密码不能为空', trigger: 'blur' },]
    },
    getData,
    update: updateApi,
    create: createApi
})








</script>
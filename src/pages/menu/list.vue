<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData" />

        <el-table :data="tableData" border row-key="id" stripe>
            <el-table-column label="ID" min-width="100" prop="id"></el-table-column>
            <el-table-column label="路由Name" min-width="160" prop="name"></el-table-column>
            <el-table-column label="路由Path" min-width="160" prop="front_path"></el-table-column>
            <el-table-column label="是否隐藏" min-width="100" prop="hidden">
                <template #default="scope">
                    <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="父节点" min-width="90" prop="rule_id"></el-table-column>
            <el-table-column label="排序" min-width="70" prop="order"></el-table-column>
            <el-table-column label="图标" min-width="140" prop="icon">
                <template #default="scope">
                    <div class="flex items-center ">
                        <el-icon>
                            <component :is="scope.row.icon" />
                        </el-icon>
                        <span>{{ scope.row.icon }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template #default="scope">


                    <el-button text type="primary" size="small" @click.stop="handleEdit(scope.row)">修改</el-button>
                    <el-button text type="primary" size="small" @click.stop="addChild(scope.row.id)">增加</el-button>
                    <el-popconfirm title="是否要删除该记录" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>

                </template>
            </el-table-column>
        </el-table>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.rule_id" :options="menusFrom"
                        :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, emitPath: false }"
                        placeholder="请选择上级菜单" />
                </el-form-item>
                <el-form-item label="菜单" prop="menu">
                    <el-radio-group v-model="form.menu">
                        <el-radio :label="1">菜单</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width:30%" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="菜单图标" prop="icon">
                    <IconSelect v-model="form.icon"></IconSelect>
                </el-form-item>
                <el-form-item label="前端路由" prop="front_path" v-if="form.rule_id > 0">
                    <el-input v-model="form.front_path" placeholder="前端路由"></el-input>
                </el-form-item>
                <el-form-item label="排序" prop="order">
                    <el-input-number v-model="form.order" :min="0" :max="10000" />
                </el-form-item>

            </el-form>


        </FormDrawer>
    </el-card>

</template>
<script setup>
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue";
import IconSelect from "~/components/IconSelect.vue";
import { getMenuList, createMenu, updateMenu, deleteMenu, updateMenuStatus } from "~/api/menu"
import { useInitTable, useInitForm } from '~/common/useCommon'
import { ref } from "vue-demi"


const menusFrom = ref([])
const defaultExpandedKeys = ref([])


const { tableData, loading, currentPage, total, limit, getData, handleDelete, handleStatusChange } = useInitTable({
    getList: getMenuList,
    noGetListSuccess: (res) => {

        menusFrom.value = res.list
        tableData.value = res.list
        defaultExpandedKeys.value = res.list.map(o => o.id)
    },
    delete: deleteMenu,
    updateStatus: updateMenuStatus
})

const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
    form: {
        rule_id: 0,
        menu: 1,
        name: '',
        status: 1,
        order: 1,
        icon: '',
        front_path: '/'
    },
    rules: {
        // title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' },],
        // content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
    },
    getData,
    update: updateMenu,
    create: createMenu
})



//添加子分类

const addChild = (id) => {
    handleCreate()
    form.rule_id = id
    form.status = 1
}

</script>

<style>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
}

/* .el-tree-node__content {
    padding: 20px 0px;
} */

.btn {

    margin-left: auto;
}

.ml_lift {
    margin-left: auto;
}
</style>
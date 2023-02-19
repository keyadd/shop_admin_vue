<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-table :data="tableData" border row-key="id" stripe>
            <el-table-column label="ID" min-width="100" prop="id"></el-table-column>
            <el-table-column label="分类名称" min-width="160" prop="name"></el-table-column>
            <el-table-column label="创建时间" min-width="160" prop="create_time"></el-table-column>
            <el-table-column label="是否隐藏" min-width="100" prop="hidden">
                <template #default="scope">
                    <el-switch :model-value="scope.row.status" :active-value="1" :inactive-value="0"
                        @change="handleStatusChange($event, scope.row)"></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="排序" min-width="70" prop="order"></el-table-column>
            <el-table-column fixed="right" label="操作" width="300">
                <template #default="scope">
                    <el-button text type="primary" size="small" @click.stop="openGoodsDrawer(scope.row)" :loading="scope.row.goodsDrawerLoading">推荐商品</el-button>
                        <el-button  text type="primary" size="small" @click.stop="handleEdit(scope.row)">修改</el-button>
                        
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
            <el-form :model="form" ref="formRef" :Categorys="Categorys" label-width="80px" :inline="false">

                <el-form-item label="上级菜单" prop="rule_id">
                    <el-cascader v-model="form.category_id" :options="categoryFrom"
                        :props="{ value: 'id', label: 'name', children: 'children', checkStrictly: true, emitPath: false }"
                        placeholder="请选择上级菜单" />
                </el-form-item>
               
                <el-form-item label="名称" prop="name">
                    <el-input v-model="form.name" style="width:30%" placeholder="名称"></el-input>
                </el-form-item>

            </el-form>


        </FormDrawer>
        <goods-drawer ref="GoodsDrawerRef"></goods-drawer>
    </el-card>

</template>
<script setup>
import ListHeader from "~/components/ListHeader.vue"
import FormDrawer from "~/components/FormDrawer.vue";
import IconSelect from "~/components/IconSelect.vue";
import { getCategoryList, createCategory, updateCategory, deleteCategory ,updateCategoryStatus} from "~/api/category"
import { useInitTable, useInitForm } from '~/common/useCommon'
import { ref } from "vue-demi"
import GoodsDrawer from "./components/GoodsDrawer.vue";



const categoryFrom = ref([])



const { tableData, loading, currentPage, total, limit, getData, handleDelete,handleStatusChange } = useInitTable({
    getList: getCategoryList,
    noGetListSuccess: (res) => {
        
        categoryFrom.value = res.list
        tableData.value = res.list.map(o=>{
            o.goodsDrawerLoading = false
            return o

        })
    },
    delete:deleteCategory,
    updateStatus:updateCategoryStatus
})

const { formDrawerRef, formRef, form, Categorys, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
    form: {
        name: '',
        category_id: 0,
        status: 1,
        order: 1,
    },
    Categorys: {
        // title: [{ required: true, message: '公告标题不能为空', trigger: 'blur' },],
        // content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
    },
    getData,
    update: updateCategory,
    create: createCategory
})

const GoodsDrawerRef =ref(null)

//推荐商品

const openGoodsDrawer = (data) =>{
    GoodsDrawerRef.value.open(data)
   
}

</script>

<style>
.custom-tree-node {
    display: flex;
    flex: 1;
    
    align-items: center;
    font-size: 14px;
    padding-right: 8px;
    width: 100%;
}

/* .el-tree-node__content {
    padding: 20px 0px;
} */

.btn {

    margin-left: auto;
}
.ml_lift{
    margin-left: auto;
}
</style>
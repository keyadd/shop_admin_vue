<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData" />
        <el-tree  style="width: 100%;" :data="tableData" :props="{ label: 'name', children: 'child' }" v-loading="loading" node-key="id">
            
            <template  #default="{ data }">
                <div class="custom-tree-node">
                    <span style="width: 100px;">{{ data.name }}</span>
                    <div class="ml-200 w-50">
                        <el-button text type="primary" size="small" @click.stop="openGoodsDrawer(data)" :loading="data.goodsDrawerLoading">推荐商品</el-button>
                        <el-switch :model-value="data.status" :active-value="1" :inactive-value="0" @change="handleStatusChange($event,data)"></el-switch>
                        <el-button  text type="primary" size="small" @click.stop="handleEdit(data)">修改</el-button>
                        
                        <el-popconfirm title="是否要删除该记录" confirm-button-text="确认" cancel-button-text="取消"
                        @confirm="handleDelete(data.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template> 
                    </el-popconfirm>
                    </div>

                </div>

            </template>


        </el-tree>

        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
            <el-form :model="form" ref="formRef" :Categorys="Categorys" label-width="80px" :inline="false">
               
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





const { tableData, loading, currentPage, total, limit, getData, handleDelete,handleStatusChange } = useInitTable({
    getList: getCategoryList,
    noGetListSuccess: (res) => {
        
        tableData.value = res.map(o=>{
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

.el-tree-node__content {
    padding: 20px 0px;
}

.btn {

    margin-left: auto;
}
.ml_lift{
    margin-left: auto;
}
</style>
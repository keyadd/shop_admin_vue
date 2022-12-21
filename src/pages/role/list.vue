<template>
    <el-card shadow="never" class="border-0">
      <!-- 新增 刷新 -->
  <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
      <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
        <el-table-column prop="name" label="角色名" />
        <el-table-column prop="desc" label="角色描叙" />
        <el-table-column label="状态" width="120">
                <template #default="{ row }">
                    <el-switch :disabled="row.super ==1" :loading="row.statusLoading" :modelValue="row.status" :active-value="1" :inactive-value="0" @change="handleStatusChange($event,row)">
                    </el-switch>

                </template>

            </el-table-column>
        <el-table-column prop="create_time" label="发布时间" width="380" />
        <el-table-column label="操作" width="250px" align="center">
          <template #default="scope">
            <el-button type="primary" size="small" text @click="openSetRole(scope.row)">配置权限</el-button>
            <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
  
            <el-popconfirm title="是否要删除该公告" confirm-button-text="确认" cancel-button-text="取消"
              @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button text type="primary" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex items-center justify-center mt-5">
        <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage" :page-size="limit"
          @current-change="getData" />
      </div>
  
      <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
          <el-form-item label="角色名称" prop="name">
            <el-input v-model="form.name" placeholder="角色名称"></el-input>
          </el-form-item>
          <el-form-item label="角色描叙" prop="desc">
            <el-input v-model="form.desc" placeholder="角色描叙"></el-input>
          </el-form-item>
  
          <el-form-item label="状态" prop="status">
            <el-switch  v-model="form.status" :active-value="1" :inactive-value="0">
                    </el-switch>
          </el-form-item>
        </el-form>
      </FormDrawer>


      <!-- 权限配置 -->
      <FormDrawer ref="setRuleFormDrawerRef" title="权限配置" @submit="handleRoleSubmit">
        
        <el-tree-v2 :check-strictly="checkStrictly" @check="handleTreeCheck" ref="elTreeRef" node-key ="id" :default-expanded-keys="defaultExpandedKeys" :data="ruleList" :props="{ label: 'name', children: 'child' }" show-checkbox :height="treeHeight" >
            <template #default ={node,data}>
            <div class="flex items-center">
                <el-tag :type="data.menu? '':'info'" size="small">
                    {{data.menu ? '菜单':'权限'}}
                </el-tag>
                <span class="ml-2 text-sm">{{data.name}}</span>

            </div>
            
            </template>
        
        </el-tree-v2>
  
      </FormDrawer>
  


      
  
    </el-card>
  </template>
  <script setup>
  
  import { getRoleList, createRole, deleteRole, updateRole,updateRoleStatus,setRoleRules} from "~/api/role"
  import FormDrawer from "~/components/FormDrawer.vue";
  import { useInitTable, useInitForm } from '~/common/useCommon'
  import {getRuleList} from "~/api/rule"
  import ListHeader from "~/components/ListHeader.vue"
  import { ref } from "vue-demi";
  import {toast} from "~/common/util"
  
  
  
  
  
  const { tableData, loading, currentPage, total, limit, getData,handleDelete,handleStatusChange} = useInitTable({
    getList: getRoleList,
    delete:deleteRole,
    updateStatus:updateRoleStatus
  })
  
  
  
  const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
    form: {
      name: '',
      desc: '',
      status:1
    },
    rules: {
        name: [{ required: true, message: '角色名不能为空', trigger: 'blur' },],
     // content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
    },
    getData,
    update: updateRole,
    create: createRole
  })
  
const setRuleFormDrawerRef =ref(null)
const ruleList =ref([])
const treeHeight =ref(0)
const roleId =ref(0)

const elTreeRef =ref(null)
const rulesId =ref([])   //当前用户拥有的权限id


const checkStrictly = ref(false)

const defaultExpandedKeys = ref([])
const openSetRole = (row)=>{
    roleId.value = row.id
    treeHeight.value =window.innerHeight -180
    checkStrictly.value = true
    
    getRuleList(1).then(res=>{
        ruleList.value = res.list
        defaultExpandedKeys.value =res.list.map(o=>o.id)
        setRuleFormDrawerRef.value.open()
        //当前角色拥有的角色id
        rulesId.value = row.rules.map(o=>o.id)
        setTimeout(()=>{
            elTreeRef.value.setCheckedKeys(rulesId.value)
            checkStrictly.value = false
        },150)

    })
    

}

const handleRoleSubmit = ()=>{
    setRuleFormDrawerRef.value.showLoading()
    setRoleRules(roleId.value,rulesId.value)
    .then(res=>{
        toast('配置成功')
        getData()
        setRuleFormDrawerRef.value.close()

    }).finally(()=>{
        setRuleFormDrawerRef.value.hideLoading()
    })

}
const handleTreeCheck=(...e)=>{
    const {checkedKeys,halfCheckedKeys} = e[1]
    rulesId.value =[...checkedKeys,...halfCheckedKeys]
}


  </script>
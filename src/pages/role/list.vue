<template>
  <el-card shadow="never" class="border-0">
    <!-- 新增 刷新 -->
    <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
    <el-table :data="tableData" stripe border style="width: 100%" v-loading="loading">
      <el-table-column prop="name" label="角色名" />
      <el-table-column prop="desc" label="角色描叙" />
      <el-table-column label="状态" width="120">
        <template #default="{ row }">
          <el-switch :disabled="row.super == 1" :loading="row.statusLoading" :modelValue="row.status" :active-value="1"
            :inactive-value="0" @change="handleStatusChange($event, row)">
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
          <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
          </el-switch>
        </el-form-item>
      </el-form>
    </FormDrawer>



    <el-drawer ref="setRuleFormDrawerRef" v-model="showDrawer" title="权限配置" size="40%" :destroy-on-close="true">
      <div class="button-box clearflex">
        <el-button @click="handleRoleSubmit" class="fl-right" size="small" type="primary">确 定</el-button>
      </div>
      <el-tabs class="role-box" type="border-card"  >
        <el-tab-pane label="角色菜单" >
          <el-tree ref="menuTree" :data="menuTreeData" :default-checked-keys="menuRulesId" :props="menuDefaultProps"
             highlight-current node-key="id" show-checkbox @check="handleTreeCheck">
            <template #default={data}>
              <div class="flex items-center">
                <el-tag size="small">
                  菜单
                </el-tag>
                <span class="ml-2 text-sm">{{ data.name }}</span>
              </div>
            </template>
          </el-tree>
        </el-tab-pane>


        <el-tab-pane label="角色api" >
          <el-tree ref="apiTree" :data="apiTreeData" :default-checked-keys="apiRulesId" :props="apiDefaultProps"
             highlight-current node-key="id" show-checkbox @check="handleTreeCheck">
            <template #default={data}>
              <div class="flex items-center">
                <el-tag size="small">
                  API
                </el-tag>
                <span class="ml-2 text-sm">{{ data.name }}</span>
              </div>
            </template>
          </el-tree>
        </el-tab-pane>
      </el-tabs>

    </el-drawer>
    <!-- 权限配置 -->

  </el-card>
</template>
<script setup>

import { getRoleList, createRole, deleteRole, updateRole, updateRoleStatus, setRoleRules } from "~/api/role"
import { getApiTreeList } from "~/api/api"
import FormDrawer from "~/components/FormDrawer.vue";
import { useInitTable, useInitForm } from '~/common/useCommon'
import { getMenuList } from "~/api/menu"
import ListHeader from "~/components/ListHeader.vue"
import { ref } from "vue-demi";
import { toast } from "~/common/util"
import { truncate } from "lodash";





const { tableData, loading, currentPage, total, limit, getData, handleDelete, handleStatusChange } = useInitTable({
  getList: getRoleList,
  delete: deleteRole,
  updateStatus: updateRoleStatus
})



const { formDrawerRef, formRef, form, rules, drawerTitle, handleSubmit, handleCreate, handleEdit } = useInitForm({
  form: {
    name: '',
    desc: '',
    status: 1
  },
  rules: {
    name: [{ required: true, message: '角色名不能为空', trigger: 'blur' },],
    // content: [{ required: true, message: '公告内容不能为空', trigger: 'blur' },]
  },
  getData,
  update: updateRole,
  create: createRole
})
const showDrawer = ref(false)


const roleId = ref(0)


const apiRulesId = ref([])   //当前用户拥有的菜单

const menuRulesId = ref([])



const menuDefaultProps = ref({
  children: 'children',
  label: 'name'
})

const menuTreeData = ref([])




const apiDefaultProps = ref({
  children: 'children',
  label: 'name'
})

const apiTreeData = ref([])






const openSetRole = (row) => {
  showDrawer.value = true
  roleId.value = row.id
  apiRulesId.value=[]

  menuRulesId.value = []

  apiTreeData.value=[]
  menuTreeData.value = []
  

  
  //菜单生成树 初始化选中项
  getMenuList(1).then(res => {
    menuTreeData.value  = res.list
    const rulesId = ref([])
    rulesId.value = row.rules.map(o => o.rule_id)
    const removeRulesId = ref([])
    rulesId.value.forEach(id=>{
      menuTreeData.value.forEach(item=>{
       if(id==item.id&&item.children.length>1){
        removeRulesId.value.push(item.id)
       }
      })
    })

    menuRulesId.value = rulesId.value.filter(function(v){ return removeRulesId.value.indexOf(v) == -1 })
    
  })

  //API生成树 初始化选中项
  getApiTreeList(1).then(res => {
    apiRulesId.value = row.rules.map(o => o.rule_id)
    const apis = res.list
    apiTreeData.value = buildApiTree(apis)
  })
}


// 创建api树方法
const buildApiTree = (apis) => {
  const apiObj = {}
  apis &&
    apis.forEach(item => {
      if (Object.prototype.hasOwnProperty.call(apiObj, item.api_group)) {
        apiObj[item.api_group].push(item)
      } else {
        Object.assign(apiObj, { [item.api_group]: [item] })
      }
    })
  const apiTree = []
  for (const key in apiObj) {
    const treeNode = {
      id: key,
      name: key + '组',
      children: apiObj[key]
    }
    apiTree.push(treeNode)
  }
  return apiTree
}



  const menuTree = ref(null)
  const apiTree = ref(null)

const handleRoleSubmit = () => {
  const checkArr = menuTree.value.getCheckedNodes(false, true)
  //console.log(checkArr)
  const apicheckArr = apiTree.value.getCheckedNodes(false, true)
  const ruleIds = ref([])
  apicheckArr.forEach(item => {
    let type  = typeof item.id
    if (type!="string"){
      ruleIds.value.push(item.id)
    }
  })
  checkArr.forEach(item => {
      ruleIds.value.push(item.id)
  })
 
  
    setRoleRules(roleId.value, ruleIds.value).then(res => {
      toast('配置成功')
      getData()
      //setRuleFormDrawerRef.value.close()

    }).finally(() => {
     
      //setRuleFormDrawerRef.value.hideLoading()
    })
}
const handleTreeCheck = (...e) => {
  const { checkedKeys, halfCheckedKeys } = e[1]
  checkedKeys.forEach(function(item, index, checkedKeys){
    let type  = typeof item
    if (type=="string"){
      checkedKeys.splice(index, 1);
    }
  })


    //rulesId.value = [...checkedKeys]
 
  
  //rulesId.value = [...checkedKeys]
  //console.log(rulesId.value);
}
</script>


<style scoped>
.button-box {
  padding: 20px 20px;
  margin: 15px;
  padding-top: 0;
  margin-top: 0;

}

:deep(.fl-right) {
  float: right;
}

:deep(.el-tree-node__content) {
  padding:0px,0px
}

:deep(.el-drawer__header) {
  margin-bottom: 0
}

:deep(.el-drawer__body) {
  padding-top: 0
}


</style>
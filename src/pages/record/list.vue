<template>
  <el-card shadow="never" class="border-0">

    <!-- 搜索 -->
    <Search :model="searchForm" @search="onSearch" @reset="resetSearchFrom">

      <SearchItem label="关键词">
        <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
      </SearchItem>




    </Search>



    <!-- 新增 刷新 -->
    <el-table :data="tableData" border stripe style="width: 100%">
      <el-table-column prop="id" label="ID" width="100" />
      <el-table-column label="访问的用户名" width="150">
        <template #default="{ row }">
          {{ row.username }}
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP" width="150" />
      <el-table-column prop="path" label="访问路由" />
      <el-table-column prop="status" label="状态码" />
      <el-table-column prop="create_time" label="发布时间" width="200" />
      <el-table-column prop="rule_name" label="路由名称" width="200" />
      <el-table-column label="操作" width="180px" align="center">
        <template #default="scope">

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



  </el-card>
</template>
<script setup>

import { getRecordList, deleteRecord } from "~/api/record"
import { useInitTable, useInitForm } from '~/common/useCommon'
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";





const { searchForm, tableData,resetSearchFrom, loading, onSearch,currentPage, total, limit, getData, handleDelete } = useInitTable({
    searchForm: {
        keyword: ""
    },
  getList: getRecordList,
  delete: deleteRecord,
  noGetListSuccess: (res) => {

    tableData.value = res.list
    total.value = res.total


  },
})


</script>
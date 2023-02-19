<template>
    <div>
        <panel></panel>
        <el-card shadow="never" class="border-0">
        <!-- 搜索 -->

        <Search :model="searchForm" @search="getData" @reset="resetSearchFrom">

            <SearchItem label="时间选择">
                <el-radio-group v-model="searchForm.type" >
                    <el-radio-button label="all">全部</el-radio-button>
                    <el-radio-button label="today">今天</el-radio-button>
                    <el-radio-button label="yesterday">昨天</el-radio-button>
                    <el-radio-button label="last7days">最近7天</el-radio-button>
                </el-radio-group>
                
                
            </SearchItem>
            <template #show>
                <SearchItem label="开始日期">
                        <el-date-picker v-model="searchForm.starttime" type="date" placeholder="开始日期" value-format="YYYY-MM-DD" style="width:90%" />

                    </SearchItem>
                    <SearchItem label="结束时间">
                        <el-date-picker v-model="searchForm.endtime" type="date" placeholder="结束时间" value-format="YYYY-MM-DD" style="width:90%"  />

                    </SearchItem>
                    <SearchItem label="关键词">
                    <el-input v-model="searchForm.keyword" placeholder="关键词" clearable></el-input>
                </SearchItem>
                
            </template>


      

        </Search>


        <el-table :data="tableData" stripe border style="width: 100%" v-loading="loading">
            <el-table-column label="ID" prop="id" align="center" width="100px"></el-table-column>
            <el-table-column label="头像"  width="200px">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-avatar :size="40" :src="row.avatar">
                            <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
                        </el-avatar>
                    </div>

                </template>

            </el-table-column>
            <el-table-column  label="用户信息" width="150">
                <template #default="{ row }">
                   <div class="text-xs">
                    <p>用户:{{ row.username }}</p>
                   <p>昵称:{{ row.nickname }}</p>
                   <p>姓名:{{ row.user_info.name }}</p>
                   <p>电话:{{ row.phone }}</p>
                   </div>
                </template>

            </el-table-column>

            <el-table-column label="推广用户数量" prop="share_num" align="center" width="100px"></el-table-column>
            <el-table-column label="订单数量" prop="share_order_num" align="center" width="100px"></el-table-column>
            <el-table-column label="订单金额" prop="order_price" align="center" width="100px"></el-table-column>
            <el-table-column label="账户佣金" prop="commission" align="center" width="100px"></el-table-column>
            <el-table-column label="以提现金额" prop="cash_out_price" align="center" width="100px"></el-table-column>
            <el-table-column label="提现次数" prop="cash_out_time" align="center" width="100px"></el-table-column>
            <el-table-column label="未提现金额" prop="no_cash_out_price" align="center" width="100px"></el-table-column>
            <el-table-column  fixed="right" label="操作" width="180px" align="center">
                <template #default="{row}">
                    <el-button type="primary" size="small" text @click="openDataDrawer(row.id,'user')" >推广人</el-button>
                    <el-button type="primary" size="small" text @click="openDataDrawer(row.id,'order')">推广订单</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>




    </el-card>
    <data-drawer ref="dataDrawerRef" ></data-drawer>
    <data-drawer ref="orderDataDrawerRef" type="order"></data-drawer>
    </div>
</template>

<script setup>
import panel from "./panel.vue"
import dataDrawer from "./dataDrawer.vue"


import { ref } from "vue";
import { getAgentList } from "~/api/distribution"
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";


import { useInitTable } from '~/common/useCommon'



const { searchForm, resetSearchFrom, tableData, loading, currentPage, total, limit, getData, handleDelete, handleStatusChange } = useInitTable({
    searchForm: {
        keyword: "",
        type:"all",
        starttime:null,
        endtime:null

    },
    getList: getAgentList,
    noGetListSuccess: (res) => {
        //console.log(res.list);
        tableData.value = res.list
        total.value = res.total


    },
})

const dataDrawerRef = ref(null)
// const openDataDrawer=(id)=>{
//     dataDrawerRef.value.open(id)
// }

const orderDataDrawerRef = ref(null)

const openDataDrawer=(id,type)=>{
    //console.log(type)
    (type === "user"? dataDrawerRef:orderDataDrawerRef).value.open(id)
}


</script>
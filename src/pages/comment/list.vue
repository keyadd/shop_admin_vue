<template>
    <el-card shadow="never" class="border-0">
        <!-- 搜索 -->

        <Search :model="searchForm" @search="getData" @reset="resetSearchFrom">

            <SearchItem label="关键词">
                <el-input v-model="searchForm.title" placeholder="商品标题" clearable></el-input>
            </SearchItem>




        </Search>


        <!-- 新增 刷新 -->

        <el-table default-expand-all :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column type="expand">
                <template #default="{row}">
                    <div class="flex pl-18">
                        <el-avatar :size="50"  :src="row.avatar" fit="fill" class="mr-3" ></el-avatar>
                        <div class="flex-1">
                            <h6 class=" flex items-center ">

                                {{ row.nickname||row.username }}
                            <small class="text-gray-400 ml-2">{{ row.review_time }}</small>
                            <el-button size="small" class="ml-auto" @click="openTextarea(row)" v-if="!row.textareaEdit && !row.extra">回复</el-button>
                            </h6>
                            {{ row.review.data }}
                            <div class="py-2">
                                <el-image v-for="(item,index) in row.review.image" :key="index" :src="item" fit="cover" style="width:100px;height:100px" class="rounded" :lazy="true"></el-image>
                            </div>

                            

                            <div v-if="row.textareaEdit">
                                <el-input v-model="textarea" placeholder="请输入评价内容" type="textarea" :rows="2"></el-input>
                                <div class="py-2">
                                    <el-button type="primary" size="small" @click="review(row)">回复</el-button>
                                    <el-button  size="small" class="ml-2" @click="row.textareaEdit =false" >取消</el-button>
                                    
                                </div>
                                
                            </div>

                            <template v-else>
                                <div class="mt-3 bg-gray-100 p-3 rounded" v-for="(item,index) in row.extra" :key="index">
                                <h6 class="flex font-bold">
                                    客服
                                    <el-button type="info" size="small" class="ml-auto" @click="openTextarea(row,item.data)">修改</el-button>
                                </h6>
                                <p>{{item.data  }}</p>
                                    
                            </div>
                            </template>



                            
                        </div>
                        

                    </div>
                
                </template>

            </el-table-column>
            <el-table-column prop="id" label="ID" align="center" width="50" />
            <el-table-column label="商品" width="200px">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-image :src="row ? row.cover : ''" fit="fill" :lazy="true"
                            style="width50px;height:50px" class="rounded"></el-image>

                        <div class="ml-3">
                            <h6>{{ row.title ?? '商品已被删除' }}</h6>
                        </div>

                    </div>

                </template>

            </el-table-column>
            <el-table-column label="评价信息" width="200">
                <template #default="{ row }">
                    <div>
                        <p>用户:{{ row.nickname || row.username }}</p>
                        <p>
                            <el-rate v-model="row.rating" disabled show-score text-color="#ff9900"
                                 />
                        </p>
                    </div>
                </template>

            </el-table-column>
            <el-table-column prop="review_time" label="创建时间" align="center"/>
            <el-table-column label="状态" align="center" >
                <template #default="{ row }">
                    <el-switch :disabled="row.super == 1" :loading="row.statusLoading" :modelValue="row.status"
                        :active-value="1" :inactive-value="0" @change="handleStatusChange($event, row)">
                    </el-switch>

                </template>

            </el-table-column>
           
           
        </el-table>
        <div class="flex items-center justify-center mt-5">
            <el-pagination background layout="prev,pager, next" :total="total" :current-page="currentPage"
                :page-size="limit" @current-change="getData" />
        </div>



    </el-card>
</template>
<script setup>
import { ref } from "vue-demi";
import { getGoodsCommentList, updateGoodsCommentStatus, reviewGoodsComment } from "~/api/goods_comment"

import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";
import { toast } from '~/common/util'


import { useInitTable, useInitForm } from '~/common/useCommon'

const roles = ref([])

const { searchForm, resetSearchFrom, tableData, loading, currentPage, total, limit, getData, handleDelete, handleStatusChange } = useInitTable({
    searchForm: {
        title: ""
    },
    getList: getGoodsCommentList,
    noGetListSuccess: (res) => {
        tableData.value = res.list.map(o => {
            o.statusLoading = false
            o.textareaEdit =false
            return o
        })
        total.value = res.total
        roles.value = res.roles

    },
    updateStatus: updateGoodsCommentStatus
})





const textarea = ref("")

const openTextarea =(row,data="") =>{
    textarea.value=data
    row.textareaEdit =true

}


const review =(row)=>{

    if(textarea.value == ""){
        return toast("回复内容不能为空","error")
    }
    reviewGoodsComment(row.id,textarea.value).then(res=>{
        row.textareaEdit =false
        toast("回复成功")
        getData()
    })
}







</script>
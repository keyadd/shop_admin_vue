import { computed, reactive, ref } from "vue-demi";

import { toast } from '~/common/util'




// 列表 分页 
export function useInitTable(opt = {}) {

    let searchForm = null
    let resetSearchFrom = null
    if (opt.searchForm) {
        searchForm = reactive({ ...opt.searchForm })
        resetSearchFrom = () => {
            for (const key in opt.searchForm) {
                searchForm[key] = opt.searchForm[key]
            }
            getData()

        }
    }



    const tableData = ref([])
    const loading = ref(false)
    //分页
    const currentPage = ref(1)
    const total = ref(0)
    const limit = ref(10)

    //获取数据 
    function getData(p = null) {
        if (typeof p == 'number') {
            currentPage.value = p
        }

        //console.log(p);
        loading.value = true
        opt.getList(currentPage.value, searchForm)
            .then(res => {
                if (opt.noGetListSuccess && typeof opt.noGetListSuccess == "function") {
                    opt.noGetListSuccess(res)

                } else {
                    tableData.value = res.list
                    total.value = res.totalCount

                }

            }).finally(() => {
                loading.value = false
            })
    }
    getData()

    //删除
    const handleDelete = (id) => {
        loading.value = true
        opt.delete(id).then(res => {
            toast('删除成功')
            getData()
        }).finally(() => {
            loading.value = false
        })

    }

    //搜索

    const onSearch = () => {
        currentPage.value = 1
        getData()
      }





    //修改状态

    const handleStatusChange = (status, row) => {
        //console.log(row.id);
        row.showLoading = true
        opt.updateStatus(row.id, status).then(res => {
            if (status !=0&&status!=1){
                toast('优惠卷失效成功')
                getData()
            }else{
                toast('修改状态成功')
                row.status = status
            }
            
        }).finally(() => {
            row.showLoading = false
        })
    }



    //选中的id
    const multiSelectIds = ref([])
    const handleSelectionChange = (e) => {
        multiSelectIds.value = e.map(o => o.id)

    }

    //批量删除
    const multipleTableRef = ref(null)
    const handleMultiDelete = () => {
        loading.value = true
        opt.delete(multiSelectIds.value).then(res => {
            toast('删除成功')
            //清空选中
            if (multipleTableRef.value) {
                multipleTableRef.value.clearSelection()
            }
            getData()

        }).finally(() => {
            loading.value = false
        })

    }
//批量修改状态
    const handleMultiStatusChange = (status) => {
        loading.value = true
        opt.updateStatus(multiSelectIds.value,status).then(res => {
            toast('修改状态成功')
            //清空选中
            if (multipleTableRef.value) {
                multipleTableRef.value.clearSelection()
            }
            getData()

        }).finally(() => {
            loading.value = false
        })

    }




    return {
        searchForm,
        resetSearchFrom,
        tableData,
        loading,
        currentPage,
        total,
        limit,
        getData,
        handleDelete,
        onSearch,
        handleStatusChange,
        handleSelectionChange,
        multipleTableRef,
        handleMultiDelete,
        handleMultiStatusChange,
        multiSelectIds
    }
}



export function useInitForm(opt = {}) {


    const formDrawerRef = ref(null)  //表单部分 

    const defaultForm = opt.form
    const formRef = ref(null)
    const editId = ref(0)

    const drawerTitle = computed(() => editId.value ? "修改" : "新增")
    const form = reactive({})

    const rules = opt.rules || {}


    const handleSubmit = () => {

        formRef.value.validate((valid) => {
            if (!valid) return



            formDrawerRef.value.showLoading()
            let body = {}

            if(opt.beforeSubmit && typeof opt.beforeSubmit == 'function'){
                body = opt.beforeSubmit({...form})
            }else{
                body = form
            }



            const fun = editId.value ? opt.update(editId.value, body) : opt.create(body)
            fun.then(res => {
                toast(drawerTitle.value + "成功")
                //修改刷新当前页 新增刷新第一页
                opt.getData(editId.value ? false : 1)
                formDrawerRef.value.close()

            }).finally(() => {
                formDrawerRef.value.hideLoading()
            })
        })
    }
    //重置表单
    function resetForm(row = false) {
        if (formRef.value) {
            formRef.value.clearValidate()
        }
        
            for (const key in defaultForm) {
                form[key] = row[key]
            }
        

    }

    //编辑
    const handleEdit = (row) => {
        editId.value = row.id
        resetForm(row)
        formDrawerRef.value.open()
    }

    //新增页面
    const handleCreate = () => {
        editId.value = 0
        resetForm(defaultForm)
        formDrawerRef.value.open()

    }









    return {
        formDrawerRef,
        formRef,
        form,
        rules,
        drawerTitle,
        handleSubmit,
        handleCreate,
        handleEdit,


    }
}

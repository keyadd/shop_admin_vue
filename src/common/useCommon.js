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





    //修改状态

    const handleStatusChange = (status, row) => {
        //console.log(status);
        row.showLoading = true
        opt.updateStatus(row.id, status).then(res => {
            toast('修改状态成功')
            row.status = status
        }).finally(() => {
            row.showLoading = false
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
        handleStatusChange
    }
}

//新增 修改

export function useInitForm(opt = {}) {


    const formDrawerRef = ref(null)  //表单部分 

    const formRef = ref(null)
    const editId = ref(0)

    const drawerTitle = computed(() => editId.value ? "修改" : "新增")
    const form = reactive({})

    const rules = opt.rules || {}


    const handleSubmit = () => {

        formRef.value.validate((valid) => {
            if (!valid) return



            formDrawerRef.value.showLoading()

            const fun = editId.value ? opt.update(editId.value, form) : opt.create(form)
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
        if (row) {
            for (const key in row) {
                form[key] = row[key]
            }
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
        resetForm(opt.form)
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

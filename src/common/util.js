import { ElMessage, ElMessageBox } from 'element-plus'



//消息提示
export function toast(message,type='success'){

    ElNotification({
        message: message,
        type: type,
        duration:2000
    })
}

export function showModal(content = '提示内容',type='warning',title=''){
    return ElMessageBox.confirm(
        content,
        title,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: type
        }
      )
}
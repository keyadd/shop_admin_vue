
import { ElNotification } from 'element-plus'



//消息提示
export function toast(message,type='success'){

    ElNotification({
        message: message,
        type: type,
        duration:2000
    })
}
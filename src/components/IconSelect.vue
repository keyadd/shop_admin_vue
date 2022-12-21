<template>
    <div class="flex items-center">
        <el-icon size="20" v-if="modelValue" class="mr-2">
            <component :is="modelValue" />
        </el-icon>
        <el-select filterable :model-value="modelValue" placeholder="请选择请求方式" @change="handleChange">
            <el-option v-for="item in icons" :key="item" :label="item" :value="item" :disabled="item.disabled">

                <div class="flex items-center justify-between">
                    <el-icon>
                        <component :is="item" />
                    </el-icon>
                    <span class="text-gray-500">{{ item }}</span>
                </div>

            </el-option>


        </el-select>
    </div>

</template>


<script setup>
import { ref } from "vue-demi";
import * as iconList from '@element-plus/icons-vue'



defineProps({
    modelValue: String
})
const icons = ref(Object.keys(iconList))

const emit =defineEmits(['update:modelValue'])

const handleChange = (icon) => {
    emit('update:modelValue',icon)

}

</script>
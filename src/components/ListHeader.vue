<template>
    <div class="flex items-center justify-between mb-4">
        <div>
            <el-button v-if="btns.includes('create')" type="primary" size="small"
                @click="$emit('create')">新增</el-button>

            <el-popconfirm v-if="btns.includes('delete')" title="是否要删除选中项" confirm-button-text="确认"
                cancel-button-text="取消" @confirm="$emit('delete')">
                <template #reference>
                    <el-button type="danger" size="small">批量删除</el-button>
                </template>
            </el-popconfirm>
            <slot></slot>
        </div>
        <el-tooltip v-if="btns.includes('refresh')" class="box-item" effect="dark" content="刷新" placement="top-start">
            <el-button text @click="$emit('refresh')">
                <el-icon size="20">
                    <Refresh />
                </el-icon>
            </el-button>
        </el-tooltip>
    </div>
</template>
<script setup>
import { computed } from 'vue-demi';

const props = defineProps({
    layout: {
        type: String,
        default: 'create,refresh'
    }
})
const btns = computed(() => props.layout.split(','))


defineEmits(['create', 'refresh', 'delete'])
</script>
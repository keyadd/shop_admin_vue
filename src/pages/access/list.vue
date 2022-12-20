<template>
    <el-card shadow="never" class="border-0">
        <ListHeader @create="handleCreate" @refresh="getData"></ListHeader>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        <!-- card body -->
    </el-card>
    
</template>
<script setup>
import ListHeader from "~/components/ListHeader.vue"

</script>
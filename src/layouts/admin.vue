<template>
    <el-container>
        <el-header>
            <a-header/>
        </el-header>
        <el-container>
            <el-aside width="">
                <a-menu/>
            </el-aside>
            <el-main>
                <a-tag-list/>
                <router-view></router-view>

            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import AHeader from '~/layouts/components/AHeader.vue'
import AMenu from '~/layouts/components/AMenu.vue'
import ATagList from '~/layouts/components/ATagList.vue'
</script>

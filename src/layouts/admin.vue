<template>
    <el-container>
        <el-header>
            <a-header/>
        </el-header>
        <el-container>
            <el-aside :width="$store.state.asideWidth">
                <a-menu/>
            </el-aside>
            <el-main>
                <a-tag-list/>
                <router-view v-slot="{ Component }">

                <transition name="fade">
                    <keep-alive :max="10">
                    <component :is="Component"></component>
                </keep-alive>
                
                </transition>
                
            </router-view>

            </el-main>
        </el-container>
    </el-container>
</template>

<script setup>
import AHeader from '~/layouts/components/AHeader.vue'
import AMenu from '~/layouts/components/AMenu.vue'
import ATagList from '~/layouts/components/ATagList.vue'
</script>
<style>
.el-aside{
    transition: all 0.2s;
}

.fade-enter-to{
    opacity: 1;
}
.fade-leave-from {
    opacity: 1;
}

.fade-enter-from{
    opacity: 0;

}
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active{
    transition-delay: 0.3s;

}
.fade-leave-active{
    transition: all 0.3s;
    
}
</style>

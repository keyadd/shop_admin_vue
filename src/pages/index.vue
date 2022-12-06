<template>
    <div>
        后台首页{{count}}
    </div>
</template>



<script setup>
import { useCookies } from '@vueuse/integrations/useCookies'
    let count =1

    
    const cookie = useCookies()
    console.log(cookie)
</script>

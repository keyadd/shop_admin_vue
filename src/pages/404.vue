<template>
    <div>
        <el-result icon="info" title="404提示">
        <template #sub-title>
          <p>你找的页面走丢了～</p>
        </template>
        <template #extra>
          <el-button type="primary" @click="$router.push('/dashboard')">回到首页</el-button>
        </template>
      </el-result>
    </div>
</template>
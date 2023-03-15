<script lang='ts' setup>
import { ref, computed } from "vue";

import { useConfig } from '@src/stores/useConfig'

import { marked } from 'marked';
import 'github-markdown-css/github-markdown-dark.css'

const config = useConfig()


let length = computed(() => {
    return config.content.length
})

let readme = computed(() => {
    return marked(config.content)
})

</script>

<template>
    <el-col :span="24">
        <div v-if="config.content.length > 0" class="markdown-body" v-html="readme"></div>
        <div v-else class="empty">暂无内容</div>
        <div class="content-length">共 {{ length }} 字</div>
    </el-col>
</template>
<script lang='ts'>

export default {
    name: 'HomeContent',
}
</script> 

<style lang="less" scoped>
.empty {
    text-align: center;
    padding: 20px;
    color: #999;
}

.markdown-body {
    max-height: calc(100vh - 250px);
    overflow: auto;
    background-color: transparent;
    user-select: text;
    padding: 10px;
    border-bottom: solid 1px #403f3f;
    margin-bottom: 5px;
}

.content-length {
    font-size: 12px;
    text-align: right;
}
</style>

<style>
.markdown-body * {
    user-select: text;
}
</style>
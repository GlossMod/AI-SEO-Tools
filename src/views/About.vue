<script lang='ts' setup>
import { ref } from "vue";
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-dark.css'

marked.setOptions({
    breaks: true,
})
let readme = ref('')
// 浏览器读取 /public/EADME.md
fetch('README.md')
    .then(res => res.text())
    .then(text => {
        readme.value = marked(text)
    })
</script>
<template>
    <div class="about">
        <div class="markdown-body" v-html="readme"></div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'About',
}
</script>
<style lang='less' scoped>
.about {
    padding: 10px;
    overflow: auto;
    max-height: calc(100vh - 100px);

    .markdown-body {
        background-color: transparent;
    }
}
</style>
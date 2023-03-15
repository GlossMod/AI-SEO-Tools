<script lang='ts' setup>
import { ref, computed } from "vue";
import { ipcRenderer } from 'electron'
import { useConfig } from '@src/stores/useConfig'

import HomeHeader from '@src/components/Home/Header.vue'
import HomeContent from '@src/components/Home/content.vue'

const config = useConfig()

let prompt = computed({
    get: () => config.prompt,
    set: (value) => config.setPrompt(value)
})
let model = computed({
    get: () => config.model,
    set: (value) => config.setModel(value)
})
let temperature = computed({
    get: () => config.temperature,
    set: (value) => config.setTemperature(value)
})
let max_tokens = computed({
    get: () => config.max_tokens,
    set: (value) => config.setMaxTokens(value)
})

let loading = ref(false)


function Create() {
    loading.value = true
    let data = {
        apiKey: config.apiKey,
        prompt: prompt.value,
        model: model.value,
        temperature: temperature.value,
        max_tokens: max_tokens.value,
    }
    data = JSON.parse(JSON.stringify(data))
    ipcRenderer.send('article-content', data)
}


ipcRenderer.on('article-content-reply', function (event, arg) {
    let res = JSON.parse(arg.body)
    console.log(res)
    loading.value = false

    if (arg.err) {
        config.content = arg.err.toString()
    } else if (res) {
        if (res.body?.choices) {
            config.content = res.body.choices[0].message.content
        } else {
            config.content = JSON.stringify(res)
        }
    }
})


</script>
<template>
    <div class="home">
        <HomeHeader></HomeHeader>
        <el-row :gutter="20">
            <el-col :span="6" class="home-Operate">
                <el-form-item label="模式">
                    <el-select v-model="model" placeholder="请选择模型">
                        <el-option label="默认(会话模式)" value="1" />
                        <el-option label="写段描述" value="2" />
                        <el-option label="写关键词" value="3" />
                        <el-option label="智能伪原创" value="4" />
                        <el-option label="英译中且补充内容" value="5" />
                        <el-option label="生成标题" value="6" />
                        <!-- <el-option label="code-cushman-001" value="code-cushman-001" /> -->
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" class="home-Operate">
                <el-form-item label="相似度" title="值越大, 内容越不一样">
                    <el-slider v-model="temperature" :max="1" :min="0" :step="0.1" />
                </el-form-item>
            </el-col>
            <el-col :span="6" class="home-Operate">
                <el-form-item label="最大文本长度" prop="age" :rules="[
                    { type: 'number', message: '必须为数字' },
                ]">
                    <el-input v-model.number="max_tokens" type="text" autocomplete="off" />
                </el-form-item>
            </el-col>
            <el-col :span="6" class="home-Operate">
                <el-button type="primary" @click="Create" :loading="loading">{{ loading ? "生成中" : "生成" }}</el-button>
            </el-col>
        </el-row>
        <el-row>
            <HomeContent></HomeContent>
        </el-row>
    </div>
</template>
<script lang='ts'>
export default {
    name: 'Home',
}
</script>

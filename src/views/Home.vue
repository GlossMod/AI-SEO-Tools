<script lang='ts' setup>
import { ref, computed } from "vue";
import { ipcRenderer } from 'electron'
import { useConfig } from '@src/stores/useConfig'

// apiKey: string, prompt: string, model: string = 'text-davinci-003', temperature: number = 0, max_tokens: number = 7
// let prompt = ref('')
// let model = ref('text-davinci-003')
// let temperature = ref(0)
// let max_tokens = ref(300)
// let apiKey = ref('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')

/**
 *  apiKey: '',
    prompt: '',
    model: 'text-davinci-003',
    temperature: 0,
    max_tokens: 7,
 * 
 */
const config = useConfig()

let apiKey = computed({
    get: () => config.apiKey,
    set: (value) => config.setApiKey(value)
})
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

let content = ref('')

let loading = ref(false)

// const formatTooltip = (val: number) => {
//     return val / 100
// }


function Create() {
    loading.value = true
    let data = {
        apiKey: apiKey.value,
        prompt: prompt.value,
        model: model.value,
        temperature: temperature.value,
        max_tokens: max_tokens.value
    }
    data = JSON.parse(JSON.stringify(data))
    ipcRenderer.send('article-content', data)
}


ipcRenderer.on('article-content-reply', function (event, arg) {
    console.log(arg)
    if (arg.err) {
        content.value = arg.err.toString()
    } else if (arg.res) {
        content.value = arg.res.choices[0].text
    }
    loading.value = false
})


</script>
<template>
    <div class="home">
        <el-row>
            <el-col :span="24" class="home-header">
                <el-form-item label="文章标题">
                    <el-input v-model="prompt" />
                </el-form-item>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="6" class="home-Operate">
                <el-form-item label="模型" title="不同的模型能生成不同的内容, 后面的 * token 为单次请求价格">
                    <el-select v-model="model" placeholder="请选择模型">
                        <el-option label="text-davinci-003 (1 token)" value="text-davinci-003" o />
                        <el-option label="text-davinci-002 (1 token)" value="text-davinci-002" />
                        <el-option label="code-davinci-002 (1 token)" value="code-davinci-002" />
                        <el-option label="text-curie-001 (25 tokens)" value="text-curie-001" />
                        <el-option label="text-babbage-001 (100 tokens)" value="text-babbage-001" />
                        <el-option label="text-ada-001 (200 tokens)" value="text-ada-001" />
                        <!-- <el-option label="code-cushman-001" value="code-cushman-001" /> -->
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="6" class="home-Operate">
                <el-form-item label="相似度" title="值越大, 内容越不一样">
                    <el-slider v-model="temperature" :max="1" :min="0" :step="0.01" />

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
                <el-button type="primary" @click="Create" :loading="loading">生成</el-button>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" class="home-content">
                <el-input v-model="content" type="textarea" :rows="20" />
            </el-col>
        </el-row>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'Home',
}
</script>
<style lang='less' scoped>

</style>
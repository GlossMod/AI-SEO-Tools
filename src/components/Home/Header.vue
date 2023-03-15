<script lang='ts' setup>
import { watch, computed, ref } from "vue";
import { useConfig } from '@src/stores/useConfig'

const config = useConfig()

let prompt = computed({
    get: () => config.prompt,
    set: (value) => config.setPrompt(value)
})

let label = ref('标题')
let type = ref('text')

watch(() => config.model, () => {
    let arr = ['4', '5', '6']
    // config.model 是否在 arr 中
    if (arr.includes(config.model)) {
        label.value = '内容'
        type.value = 'textarea'
    } else {
        label.value = '标题'
        type.value = 'text'
    }
}, { immediate: true })

</script>
<template>
    <el-row>
        <el-col :span="24" class="home-header">
            <el-form-item :label="label">
                <el-input v-model="prompt" :type="type" autosize />
            </el-form-item>
        </el-col>
    </el-row>
</template>
<script lang='ts'>

export default {
    name: 'HomeHeader',
}
</script>
<style lang='less' scoped></style>
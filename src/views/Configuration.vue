<script lang='ts' setup>
import { useConfig } from '@src/stores/useConfig'
import { computed } from "vue";

const config = useConfig()

let apiKey = computed({
    get: () => config.apiKey,
    set: (value) => config.setApiKey(value)
})

</script>
<template>
    <div class="Configuration">
        <div class="h3-title">接口配置</div>
        <el-form-item label="API keys">
            <el-input v-model="apiKey" />
        </el-form-item>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'Configuration',
}
</script>
<style lang='less' scoped>

</style>
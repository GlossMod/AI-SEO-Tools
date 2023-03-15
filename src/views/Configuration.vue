<script lang='ts' setup>
import { useConfig } from '@src/stores/useConfig'
import { computed } from "vue";

const config = useConfig()

let apiKey = computed({
    get: () => config.apiKey,
    set: (value) => config.setApiKey(value)
})

let proxy = computed({
    get: () => config.proxy,
    set: (value) => config.setProxy(value)
})

</script>
<template>
    <div class="Configuration">
        <div class="h3-title">接口配置</div>
        <el-form-item label="API keys">
            <el-input v-model="apiKey" />
        </el-form-item>
        <!-- <div class="h3-title">代理配置</div>
            <el-form-item label="代理地址" class="w-50 m-2">
                <el-input v-model="proxy" />
            </el-form-item> -->
    </div>
</template>
<script lang='ts'>

export default {
    name: 'Configuration',
}
</script>
<style lang='less' scoped></style>
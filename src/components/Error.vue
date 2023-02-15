<script lang='ts' setup>
import { computed } from "vue";

const props = defineProps<{
    title: string,
    description: string,
    show: boolean
}>()

let show = computed(() => props.show)

</script>
<template>
    <Teleport to="body">
        <el-alert class="error" v-if="show" :title="title" type="error" :description="description" show-icon />
    </Teleport>
</template>
<script lang='ts'>

export default {
    name: 'Error',
}
</script>
<style lang='less' scoped>
.error {
    position: fixed;
    bottom: 0px;
    left: 0;
    width: 500px;
    z-index: 999;
}
</style>
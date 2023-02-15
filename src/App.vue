<script lang='ts' setup>
import { initialization } from '@src/model/config'

import AppHeader from '@src/components/base/AppHeader.vue'
import LeftMenu from '@src/components/base/LeftMenu.vue'

initialization()

</script>
<template>
    <div class="common-layout">
        <AppHeader></AppHeader>
        <div class="main common-layout">
            <el-container>
                <el-aside width="200px">
                    <LeftMenu></LeftMenu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script lang='ts'>

export default {
    name: 'App',
}
</script>
<style lang='less' scoped>
.common-layout {
    .main {
        margin-top: 40px;
        max-height: calc(100vh - 50px);
        overflow: hidden;
    }
}
</style>
<script lang='ts' setup>
import {
    Position,
    Operation,
    InfoFilled,
    Sugar,
} from '@element-plus/icons-vue'


</script>
<template>
    <el-row class="tac">
        <el-col>
            <el-menu class="left-menu" :default-active="$route.path" router>
                <el-menu-item index="/">
                    <el-icon>
                        <Position />
                    </el-icon>
                    <span>首页</span>
                </el-menu-item>
                <el-menu-item index="/configuration">
                    <el-icon>
                        <Operation />
                    </el-icon>
                    <span>设置</span>
                </el-menu-item>
                <el-menu-item index="/about">
                    <el-icon>
                        <InfoFilled />
                    </el-icon>
                    <span>关于</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script lang='ts'>

export default {
    name: 'LeftMenu',
}
</script>
<style lang='less' scoped>
.left-menu {
    height: calc(100vh - 50px);
}
</style>
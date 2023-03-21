<script lang='ts' setup>

</script>
<template>
    <div class="donate">
        <div class="h2-title">给小莫投食</div>
        <el-divider />
        <p>如果这个工具对你有所帮助，那么就顺便给快要饿死的小莫投喂点零食吧~</p>
        <div class="QR-code">
            <div class="qr-img">
                <el-image src="wx.png"></el-image>
                <p class="des">微信</p>
            </div>
            <div class="qr-img">
                <el-image src="zfb.png"></el-image>
                <p class="des">支付宝</p>
            </div>
        </div>
        <div class="footer"><el-image src="comment.png"></el-image></div>

    </div>
</template>
<script lang='ts'>

export default {
    name: 'Donate',
}
</script>
<style lang='less' scoped>
.donate {
    p {
        color: rgb(156, 156, 156);
        text-align: center;
    }

    .QR-code {
        display: flex;
        justify-content: space-around;

        .qr-img {
            width: 250px;
            margin: 0 20px;

            .des {
                text-align: center;
                color: #9c9c9c;
            }
        }
    }

    .footer {
        padding: 0 25px;
        text-align: right;
    }
}
</style>
<template>
    <header>
        <h1>大屏监控平台</h1>
    </header>
    <!-- 大容器 -->
    <section class="container">
        <!-- 左容器 -->
        <section class="itemLeft">
            <item>
                <page-one></page-one>
            </item>
            <item>
                <page-two></page-two>
            </item>
        </section>
        <!-- 中容器 -->
        <section class="itemCenter">
            <page-map></page-map>
        </section>
        <!-- 右容器 -->
        <section class="itemRight">
            <item>
                <page-three></page-three>
            </item>
            <item>
                <page-four></page-four>
            </item>
        </section>
    </section>
</template>

<script setup>
import Item from './components/item.vue';
import PageFour from './components/pageFour.vue';
import PageThree from './components/pageThree.vue';
import PageTwo from './components/pageTwo.vue';
import PageOne from './components/pageOne.vue';
import pageMap from './components/pageMap.vue';
import * as echarts from 'echarts';
import { provide } from 'vue';
provide('echarts', echarts);
</script>

<style lang="less" scoped>
header {
    height: 0.8rem;
    width: 100%;
    background-color: rgba(0, 0, 255, 0.2);
    // 标题文字样式
    h1 {
        font-size: 0.375rem;
        color: #fff;
        text-align: center;
        line-height: 1rem;
    }
}
// 大容器样式设置
.container {
    // 最大最小宽度
    min-width: 1200px;
    max-width: 2048px;
    margin: 0 auto;
    padding: 0.125rem 0.25rem 0;
    height: 700px;
    // background-color: gray;
    display: flex;
    // 设置三部分样式
    .itemLeft,
    .itemRight {
        flex: 3;
    }
    .itemCenter {
        flex: 4;
        height: 9.125rem;
        border: 1px solid #5a87c1;
        box-shadow: 2px 2px #5490de;
        background-color: rgba(115, 94, 208, 0.3);
        padding: 0.125rem;
        margin: 0.125rem;
    }
}
</style>

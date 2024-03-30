<template>
    <div>
        <h2>图表4</h2>
        <div class="cahrt">图表容器</div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject } from 'vue';
import $axios from 'axios';
const myRef = ref(null);
const options = {};
const $echarts = inject('echarts');
// onMounted(() => {
//     const myEcharts = $echarts.init(myRef.value);
//     myEcharts.setOption(options);
// });
</script>

<style lang="less" scoped></style>

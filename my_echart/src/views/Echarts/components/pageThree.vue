<template>
    <div>
        <h2>库存统计</h2>
        <div class="chart" ref="myRef"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue';
import { getThreeChartAPI } from '../../../api/threeChart';
const $echarts = inject('echarts');
const myRef = ref(null);
let data = reactive({});
let options = reactive({
    legend: {
        top: 'bottom',
    },
    // 提示气泡
    tooltip: {
        show: true,
    },
    series: [
        {
            type: 'pie',
            data: [],
            // 设置样式
            radius: [10, 100],
            center: ['50%', '45%'],
            roseType: 'area',
            itemStyle: {
                borderRadius: 10,
            },
        },
    ],
});
const getData = () => {
    options.series[0].data = data.data.chartData;
};
const requestData = async () => {
    data = await getThreeChartAPI();
    // console.log(data);
};

onMounted(() => {
    const myEcharts = $echarts.init(myRef.value);
    // 调用请求
    requestData().then(() => {
        getData();
        // console.log(options);
        myEcharts.setOption(options);
    });
});
</script>

<style lang="less" scoped>
.chart {
    height: 4rem;
}
h2 {
    height: 0.5rem;
    color: #fff;
    line-height: 0.5rem;
    font-size: 0.25rem;
    text-align: center;
}
</style>

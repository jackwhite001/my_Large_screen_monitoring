<template>
    <div>
        <h2>图表1</h2>
        <div class="chart" ref="myRef"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue';
import { getOneChartAPI } from '../../../api/oneChart';

const $echarts = inject('echarts');
const myRef = ref(null);
let data = reactive({});
let xdata = reactive([]);
let ydata = reactive([]);
let options = reactive({
    // 设置位置
    grid: {
        top: '3%',
        left: '1%',
        right: '6%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'value',
    },
    yAxis: {
        type: 'category',
        data: [],
    },
    series: [
        {
            data: [],
            type: 'bar',
            itemStyle: {
                BorderRadius: [0, 20, 20, 0],
                color: new $echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                        offset: 0,
                        color: '#005eaa',
                    },
                    {
                        offset: 0.5,
                        color: '#339ca8',
                    },
                    {
                        offset: 1,
                        color: '#cda819',
                    },
                ]),
            },
        },
    ],
});
const getData = () => {
    options.yAxis.data = data.data.chartData.map(item => item.title);
    options.series[0].data = data.data.chartData.map(item => item.num);
};
const requestData = async () => {
    data = await getOneChartAPI();
};

onMounted(() => {
    const myEcharts = $echarts.init(myRef.value);
    // 调用请求
    requestData().then(() => {
        getData();
        // console.log(xdata, ydata);
        // console.log(options);
        myEcharts.setOption(options);
    });
});
</script>

<style lang="less" scoped>
.chart {
    height: 4.5rem;
}
h2 {
    height: 0.5rem;
    color: #fff;
    line-height: 0.5rem;
    font-size: 0.25rem;
    text-align: center;
}
</style>

<template>
    <div>
        <h2>图表2</h2>
        <div class="chart" ref="myRef"></div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue';
import { getTwoChartAPI } from '../../../api/twoChart';
const $echarts = inject('echarts');
const myRef = ref(null);
let data = reactive({});
// 抽取options中 series的公共部分
let publicSets = {
    // 线条平滑效果，变成1曲线图
    smooth: true,
    showSymbol: false,
    // 数据堆叠
    stack: 'total',
    // 设置线段样式，线条宽度
    lineStyle: {
        width: 0,
    },
    // 选中高亮
    emphasis: {
        // 只选中 选中内容高亮
        focus: 'series',
    },
};
let options = reactive({
    // 提示框组件
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#e6b600',
            },
        },
    },
    // 设置图例
    legend: {
        data: ['服饰', '数码', '家电', '家居', '日化'],
    },
    // 图标位置大小
    grid: {
        left: '1%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
    },
    xAxis: {
        type: 'category',
        data: [],
        boundaryGap: false,
        // xy轴 文字设置
        axisLine: {
            lineStyle: {
                color: '#fff',
            },
        },
    },
    yAxis: {
        type: 'value',
        // xy轴 文字设置
        axisLine: {
            lineStyle: {
                color: '#fff',
            },
        },
    },
    series: [
        {
            data: [],
            name: '服饰',
            type: 'line',
            areaStyle: {
                opacity: 0.8,
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(120,255,165)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(1,191,236)',
                    },
                ]),
            },
        },
        {
            data: [],
            name: '数码',
            type: 'line',
            areaStyle: {
                opacity: 0.8,
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(0,221,255)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(77,119,255)',
                    },
                ]),
            },
        },
        {
            data: [],
            name: '家电',
            type: 'line',
            areaStyle: {
                opacity: 0.8,
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(55,162,255)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(116,21,219)',
                    },
                ]),
            },
        },
        {
            data: [],
            name: '家居',
            type: 'line',
            areaStyle: {
                opacity: 0.8,
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(225,0,135)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(135,0,157)',
                    },
                ]),
            },
        },
        {
            data: [],
            name: '日化',
            type: 'line',
            areaStyle: {
                opacity: 0.8,
                color: new $echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    {
                        offset: 0,
                        color: 'rgb(225,191,0)',
                    },
                    {
                        offset: 1,
                        color: 'rgb(224,62,76)',
                    },
                ]),
            },
        },
    ],
});
const getData = () => {
    options.xAxis.data = data.data.chartData.day;
    Object.values(data.data.chartData.num).forEach((item, index) => {
        console.log(item);
        // 给每一个series中data赋值
        options.series[index].data = item;
        // 提取公共部分 属性放进去
        Object.assign(options.series[index], publicSets);
    });
};
const requestData = async () => {
    data = await getTwoChartAPI();
};

onMounted(() => {
    const myEcharts = $echarts.init(myRef.value);
    // 调用请求
    requestData()
        .then(() => {
            getData();
            console.log(options);
            myEcharts.setOption(options);
        })
        .catch(e => {
            console.log(e);
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

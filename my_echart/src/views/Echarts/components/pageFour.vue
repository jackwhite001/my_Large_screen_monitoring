<template>
    <div>
        <h2>图表4</h2>
        <div class="chart" ref="myRef">图表容器</div>
    </div>
</template>

<script setup>
import { ref, onMounted, inject, reactive } from 'vue';
import { getFourChartAPI } from '../../../api/fourChart';
const $echarts = inject('echarts');
const myRef = ref(null);
let data = reactive({});
let publicSets = {
    // 标签显示
    label: {
        show: true,
    },
    // 数据堆叠
    stack: 'total',
    // 选中高亮
    emphasis: {
        // 只选中 选中内容高亮
        focus: 'series',
    },
};
let options = reactive({
    // 位置调整
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: 'true',
    },
    // 添加图例
    legend: {},
    // 弹窗气泡显示
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
        },
    },
    xAxis: {
        type: 'category',
        data: [],
        // 设置轴上字体颜色
        axisLine: {
            lineStyle: {
                color: '#fff',
            },
        },
    },
    yAxis: {
        type: 'value',
        // 设置轴上字体颜色
        axisLine: {
            lineStyle: {
                color: '#fff',
            },
        },
    },
    series: [
        {
            name: '服饰',
            type: 'bar',
            data: [],
        },
        {
            name: '数码',
            type: 'bar',
            data: [],
        },
        {
            name: '家电',
            type: 'bar',
            data: [],
        },
        {
            name: '家居',
            type: 'bar',
            data: [],
        },
        {
            name: '日化',
            type: 'bar',
            data: [],
        },
    ],
});
const getData = () => {
    options.xAxis.data = data.data.chartData.day;
    Object.values(data.data.chartData.num).forEach((item, index) => {
        // 给每一个series中data赋值
        options.series[index].data = item;
        // 提取公共部分 属性放进去
        Object.assign(options.series[index], publicSets);
    });
};
const requestData = async () => {
    data = await getFourChartAPI();
    console.log(data);
};

onMounted(() => {
    const myEcharts = $echarts.init(myRef.value);
    // 调用请求
    requestData().then(() => {
        getData();
        console.log(options);
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

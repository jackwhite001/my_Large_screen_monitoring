<template>
    <div class="map" ref="myMap"></div>
</template>

<script setup>
import { inject, reactive, onMounted, ref } from 'vue';
import { getMapAPI } from '../../../api/map';
const $echarts = inject('echarts');
let mapData = reactive({});
const myMap = ref(null);
let getData = async () => {
    mapData = await getMapAPI();
};
onMounted(() => {
    getData().then(() => {
        $echarts.registerMap('china', mapData.data);
        let myEcharts = $echarts.init(myMap.value);
        myEcharts.setOption({
            geo: {
                map: 'china',
                itemStyle: {
                    areaColor: '#0099ff',
                    borderColor: '#00ffff',
                    shadowColor: 'rgba(230,130,70,0.5)',
                    shadowBlur: 30,
                    emphasis: {
                        focus: 'self',
                    },
                },
                zoom: 1.2, //视觉比例大小,1.2即为原有大小的1.2倍
            },
            // 位置调整
            grid: {
                left: '10%',
                right: '4%',
                bottom: '3%',
                containLabel: 'true',
            },
            // 散点图设置
            tooltip: {
                // 设置气泡显示
                trigger: 'item',
            },
            title: {
                text: '城市销量',
                left: '45%',
                textStyle: {
                    color: '#fff',
                    fontSize: 20,
                    textShadowBlur: 10,
                    textShadowColor: '#33fffff',
                },
            },
            // 设置视觉映射
            visualMap: {
                type: 'continuous',
                min: 100,
                max: 5000,
                calculable: true,
                imRange: {
                    color: ['#50a3ba', '#eac736', '#d94e5d'],
                },
                textStyle: {
                    color: '#fff',
                },
            },
            series: [
                {
                    type: 'scatter',
                    itemStyle: {
                        color: 'red',
                    },
                    // 指定坐标系
                    coordinateSystem: 'geo',
                    data: [
                        { name: '北京', value: [116.46, 39.92, 4367] },
                        { name: '上海', value: [121.48, 31.22, 8675] },
                        { name: '深圳', value: [114.07, 22.62, 2461] },
                        { name: '广州', value: [113.23, 23.16, 187] },
                        { name: '西安', value: [108.45, 34, 3421] },
                    ],
                },
            ],
        });
    });
});
</script>

<style lang="less" scoped>
.map {
    width: 100%;
    height: 100%;
}
</style>

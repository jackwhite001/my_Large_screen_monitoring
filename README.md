
# 大屏监控系统 

b站千锋视频 

## 项目技术栈


前端： vue3 + vue-Router + echarts + axios 


后端： 采用express 和 router 搭建的API接口服务器，

### 前端vue3 项目

采用vue3 版本采用setup组合式API 创建项目 vue-cli创建: vue create proName

安装echarts ： npm i echarts -D

安装axios ： npm i axios -D

安装flexible 页面自适应： npm i flexible -D 

安装 less-loader 解析less 文件 我的node版本 16.18，vue-cli内置的webpack 4版本，使用less-loader， 6版本 ：npm i less-loader@6 -D 

具体配置看视频

main.js中 引入
```js {.line-numbers}
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// 引用插件
const app = createApp(App);
import 'lib-flexible/flexible';

// app.config.globalProperties.$echarts = echarts;
app.use(store).use(router).mount('#app');
```  

provide 和 inject 解决了全局挂载问题

echarts库需要在多个 组件中引入 ，在父组件中,分发到其他组件中 （组件通信）

```js {.line-numbers}
import * as echarts from 'echarts'
import { provide } from 'vue'
provide('echarts',echarts)
```

其他组件接收
```js {.line-numbers}
import { inject } from 'vue'
const $echarts = inject('echarts')
```

echarts库的使用 

1、vue3 组合式API中使用 ref 获取DOM元素 

2、对echarts进行初始化，在组件生命周期的 mounted阶段对应setup中 onMounted阶段

此阶段DOM元素初始化完成，可以操作DOM，

3、.setOption() 中是关于各种类型表图设置

4、需要在样式中设定，绑定DOM元素的宽高，否则无法正常显示

```js {.line-numbers}
import { ref, onMounted } from 'vue';
import * as echarts from 'echarts';
const myEcharts = ref(null);
onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    const myChart = echarts.init(myEcharts.value);
    // 设置参数
    myChart.setOption({
        // 设置标题
        title: {
            text: 'hello word',
        },
        xAxis: {
            data: ['x0', 'x2', 'x3', 'x4'],
        },
        yAxis: {},
        // 系列
        series: {
            name: '氪金',
            type: 'bar', //当前图表
            data: [999, 2000, 3000, 4000],
        },
    });
});
```

堆叠图形赋值，series 多数据赋值采用 forEach循环遍历 

优点：

1、将数据自动赋值 

2、抽取公共样式 自动加入，提高代码复用 

```js {.line-numbers}
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
// options设置
let options = reactive({
    legend: {
        top: 'bottom',
    },
    // 提示气泡
    tooltip: {
        show: true,
    },
    xAxis: {
        type: 'category',
        data: [],
    },
    yAxis: {
        type: 'value',
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
```


前端对axios 进行了二次封装 baseUrl是指向后端服务器地址

指定同一个地址，复用组件

```js {.line-numbers}
import $axios from 'axios';

const httpInstance = $axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
});

export default httpInstance;
```

编写API接口代码，独立封装每一个api请求接口的方法

```js {.line-numbers}
import httpInstance from '../utils/http';

export const getOneChartAPI = () => {
    return httpInstance({
        url: '/api/indexOne/data',
    });
};
```

在组件中调用

```js {.line-numbers}
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
```

### 前端项目打包 要点

打包项目记得把 router模式改为  createWebHashHistory ,# 后面的数据不参与服务器通信

```js {.line-numbers}
const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes,
});
```    

### 后端express 项目

需要使用 ： npm i express-generator -g 全局安装 

创建项目：express -e proName

初始化项目：npm i

安装cors 跨域，: npm i cors -D



在app.js中配置跨域 加入如下

```js {.line-numbers}
//导入允许跨域中间件
const cors = require('cors'); //导入中间件
// 使用跨域
app.use(cors()); //配置中间件
//处理跨域请求
app.all('*', function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH');
    next();
});
```

获取请求 路径的输出资源显示 ，方便查兰是否接口调用资源

```js {.line-numbers}
// 获取url资源
app.use((req, res, next) => {
    console.log('请求的资源是：', req.url);
    console.log('请求的host是：', req.get('Host'));
    next();
});

// 例如：
// GET /api/indexOne/data 304 0.726 ms - -
// GET /api/indexTwo/data 304 1.016 ms - -
// GET /api/indexMap/data 304 3.016 ms - -
// GET /api/indexThree/data 304 2.078 ms - -
// GET /api/indexTwo/data 304 0.752 ms - -
// GET /api/indexTwo/data 304 0.631 ms - -
// GET /api/indexOne/data 304 0.616 ms - -
// GET /api/indexTwo/data 304 0.834 ms - -
// GET /api/indexMap/data 304 0.543 ms - -
// GET /api/indexThree/data 304 0.750 ms - -
// GET /api/indexTwo/data 304 0.763 ms - -
```

在router下创建 api文件夹 在内部创建接口aoi.js

然后将请求json文件放在 assets静态资源文件夹下

配置接口
```js {.line-numbers}
const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/data', (req, res) => {
    res.sendFile(path.join(__dirname, '../../jsonData/four.json'));
});
module.exports = router;
```

在app.js中引入

```js {.line-numbers}
// 导入api接口文件 中间件
const indexOneApi = require('./routes/apis/indexOne');
const indexTwoApi = require('./routes/apis/indexTwo');
const indexThreeApi = require('./routes/apis/indexThree');
const indexFourApi = require('./routes/apis/indexFour');
const indexMapApi = require('./routes/apis/indexMap');

// 调用接口
app.use('/api/indexOne', indexOneApi);
app.use('/api/indexTwo', indexTwoApi);
app.use('/api/indexThree', indexThreeApi);
app.use('/api/indexFour', indexFourApi);
app.use('/api/indexMap', indexMapApi);
```

在bin/www中 function onListening 函数中加入

```js {.line-numbers}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log(
        `服务器启动成功.........地址：http://localhost:${port}`,
        '后面跟接口，例如:/api/indexOne/data'
    );
    debug('Listening on ' + bind);
}
```

方便自己查看地址

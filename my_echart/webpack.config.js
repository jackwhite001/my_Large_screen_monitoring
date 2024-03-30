const path = require('path');

module.exports = {
    lintOnSave: false,
    // 用于打包 时 在index.html文件中引入的静态罪案路径
    publicPath: (precess.env.NODE_ENV = 'production' ? './' : '/'),
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    // 设置sourceMap 资源映射
    devtool: 'cheap-module-source-map',
    // 模式
    mode: 'development',
};

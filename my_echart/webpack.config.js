const path = require('path');

module.exports = {
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    devtool: 'cheap-module-source-map',
    // 模式
    mode: 'development',
};

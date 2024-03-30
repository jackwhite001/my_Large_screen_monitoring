var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 导入body-parser 中间
const bodyParser = require('body-parser');
// 解析json
const jsonParser = bodyParser.json();
// 解析请求体
const urlencodedParser = bodyParser.urlencoded({ extended: false });
//导入允许跨域中间件
const cors = require('cors'); //导入中间件
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
// 导入api接口文件 中间件
const indexOneApi = require('./routes/apis/indexOne');
const indexTwoApi = require('./routes/apis/indexTwo');
const indexThreeApi = require('./routes/apis/indexThree');
const indexFourApi = require('./routes/apis/indexFour');
const indexMapApi = require('./routes/apis/indexMap');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
// 使用跨域
app.use(cors()); //配置中间件

app.use(logger('dev'));
app.use(express.json());
app.use(urlencodedParser);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 使用接口
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/indexOne', indexOneApi);
app.use('/api/indexTwo', indexTwoApi);
app.use('/api/indexThree', indexThreeApi);
app.use('/api/indexFour', indexFourApi);
app.use('/api/indexMap', indexMapApi);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});
//处理跨域请求
app.all('*', function (req, res, next) {
    //允许的来源
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS,PATCH');
    next();
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
// 获取url资源
app.use((req, res, next) => {
    console.log('请求的资源是：', req.url);
    console.log('请求的host是：', req.get('Host'));
    next();
});
module.exports = app;

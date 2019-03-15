const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
// const router = require('koa-router')();
const routers = require('./routers/index')
const config = require('./config/default')
const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
  console.log('---------------------------------')
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  console.log('---------------------------------')
  await next();
});

// 配置跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
  ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
  ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
  ctx.set('Access-Control-Allow-Credentials', true);
  ctx.set('Access-Control-Max-Age', 3600 * 24);
  await next();
});


app.use(routers.routes()).use(routers.allowedMethods())
app.listen(config.port);
console.log(`app is listen on ${config.port}`);

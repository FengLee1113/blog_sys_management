const Koa = require('koa');
const bodyParser = require('koa-bodyParser');
const router = require('koa-router')();
const fs = require('fs')
const app = new Koa();

app.use(bodyParser());

app.use(async (ctx, next) => {
	console.log('---------------------------------')
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	console.log('---------------------------------')
    await next();
});

const files = fs.readdirSync(__dirname + '/controllers');

const js_files = files.filter((f) => {
	return f.endsWith('.js')
})

for (const f of js_files) {
	const mapping = require(__dirname + '/controllers/' + f)
	mapping.forEach(item => {
		router[item.method](item.path, item.func)
	})
}

app.use(router.routes())
app.listen(3003);
console.log('app is listen on 3003');

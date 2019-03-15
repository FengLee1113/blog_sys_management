const login = async (ctx, next) => {
	const respBody = {
		code: 0,
		message: ''
	}
	const {params} = ctx.request.body
	const {belong, firstLevel, secondLevel} = params
	if (params) {
		if (belong && firstLevel) {
			respBody.message = '登录成功'
		}
	} else {
		respBody.code = 1;
		respBody.message = '未知异常'
	}
	ctx.status = 200
	ctx.body = respBody
}

module.exports = [
	{
		method: 'post',
		path: '/login',
		func: login
	}
]
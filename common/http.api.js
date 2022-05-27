
const install = (Vue, vm) => {

	// hello world
	vm.$api.hello 			= async (params = {}) => await vm.$u.http.get('/hello', params);
	
	// 用户
	vm.$api.goLogin 			= async (params = {}) => await vm.$u.http.get('/user/login',  {params: params});
	vm.$api.goRegister 			= async (params = {}) => await vm.$u.http.get('/user/register', params);
}

export default {
	install
}

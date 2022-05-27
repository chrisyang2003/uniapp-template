<template>
	
		<u-navbar
			:leftIcon="isindex() ? '' : 'arrow-left'"
			:autoBack="true"
			:leftText="isindex() ? '' : '返回'"
			:title="title"
			leftIconColor="#FFF"			
			:titleStyle="{ color: '#FFF', fontSize: '36rpx' }"
			bgColor="#374486"
			:placeholder="true"
		></u-navbar>
	
</template>

<script>
export default {
	name: 'my-navbar',

	props: {
		title: {
			type: String,
			default: '标题'
		},
		borderBottom: {
			type: Boolean,
			default: true
		},
		backIndex:{
			type:Number,
			default:1
		}
	},
	computed: {

		tabbar() {
			if (this.vuex_config.tabbar) {
				return this.vuex_config.tabbar;
			} else {
				return {
					isshow: false,
					list: []
				};
			}
		},
		isBack() {
			let status = true;
			this.tabbar.list.some(item => {
				let path = this.$util.getPath(item.path);
				if (path == this.pageUrl || path == '/' + this.pageUrl) {
					status = false;
					return true;
				}
			});
			console.log(status)
			return status;
		},

	},
	created() {
		// 获取引入了u-tabbar页面的路由地址，该地址没有路径前面的"/"
		let pages = getCurrentPages();
		// 页面栈中的最后一个即为项为当前页面，route属性为页面路径
		this.pageUrl = pages[pages.length - 1].route;
		this.pageNum = pages.length;
		console.log('navbar load...', this.pageUrl);
		
		
		
	},
	data() {
		return {
			pageUrl: '',
			pageNum: 0
		};
	},
	methods: {
		isindex(){
			if (this.pageUrl == 'pages/index/index' || this.pageUrl == 'pages/my/my'){
				return true
			}else{
				return false
			}
		},
		isb() {
			let status = true;
			console.log('@@@',this.tabbar);
			this.tabbar.list.some(item => {
				let path = this.$util.getPath(item.path);
				if (path == this.pageUrl || path == '/' + this.pageUrl) {
					status = false;
					return true;
				}
			});
			console.log(status)
			return status;
		},
		goBack() {			
			let status = false;
			let tabbar = this.vuex_config.tabbar;
			tabbar.list.forEach(item => {
				let path = this.$util.getPath(item.path);
				if (path == this.pageUrl || path == '/' + this.pageUrl) {
					status = true;
				}
			});
			if (status) return;
			if (this.pageNum == 1) {
				//只有当前页面了
				this.$u.route({
					url: '/pages/index/index'
				});
			} else {
				uni.navigateBack({
					delta: this.backIndex
				});
			}
		}
	}
};
</script>

<style></style>

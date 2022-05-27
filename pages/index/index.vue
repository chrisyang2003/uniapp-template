<template>
	<view class="content">
		<m-navbar title="首页"></m-navbar>

	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		onLoad() {
			console.log(this.mymix())
			let navbar = {
				titleColor: "#fff",
				bgColor: {
					background: "#374486"
				},
				backIconColor: "#fff",
				backTextStyle: {
					color: "#fff"
				},
				titleSize: "35",
				isshow: true
			}
			
			let theme = {
				color: "#ffffff",
				bgColor: "#374486",
				ladder: 10,
				number: 9,
				border: 5
			}
			
			let tabbar = {
				color: "#999",
				selectColor: "#000",
				bgColor: "#ffffff",
				height: "100",
				borderTop: true,
				iconSize: "40",
				midButton: false,
				midButtonSize: "60",
				list: [{
						image: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/home.png",
						selectedImage: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/home-hl.png",
						text: "首页",
						path: "/pages/index/index",
						midButton: false,
						count: 0,
						isDot: false,
						badgeColor: "#ffffff",
						badgeBgColor: "#374486"
					},
					{
						image: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/store.png",
						selectedImage: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/store-hl.png",
						text: "预订",
						path: "/pages/hotel/hotel",
						midButton: false,
						count: 0,
						isDot: false,
						badgeColor: "#ffffff",
						badgeBgColor: "#374486"
					},
					{
						image: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/my.png",
						selectedImage: "https://booking.demo.fastadmin.net/assets/addons/booking/img/tabbar/my-hl.png",
						text: "我的",
						path: "/pages/my/my",
						midButton: false,
						count: 0,
						isDot: false,
						badgeColor: "#ffffff",
						badgeBgColor: "#374486"
					}
				],
				isshow: true
			}
			console.log(tabbar);
			this.$u.vuex('navbar', navbar)
			
			this.$u.vuex('navbar', navbar)
			this.$u.vuex('theme', theme)
			this.$u.vuex('tabbar', tabbar)
			
			console.log(this.theme);
		},

		methods: {

		}
	}
</script>

<style>

</style>

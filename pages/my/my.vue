<template>
	<view>
		<m-navbar title="个人中心"></m-navbar>
		<!-- 会员中心 -->

		<view class="u-p-t-30 u-p-b-50 home" :style="[{ backgroundColor: theme.bgColor}]">
			<view class="userinfo">
				<view style="margin-top: 30rpx;">
					<u-avatar :src="src" size="60"></u-avatar>
					<u-button style="margin-top: 40rpx; z-index: 30;" text="立即登陆" size="small" @click="goPage('/pages/login/login')"></u-button>
				</view>
				<view>
					
				</view>
			</view>
			<view class="corrugated">
				<view class="wave-top wave-item" :style="[{ backgroundImage: 'url(' + wavetop + ')' }]"></view>
				<view class="wave-middle wave-item" :style="[{ backgroundImage: 'url(' + wavemiddle + ')' }]"></view>
				<view class="wave-bottom wave-item" :style="[{ backgroundImage: 'url(' + wavebottom + ')' }]"></view>
			</view>
		</view>
		<u-row style="background-color: white; padding-top: 50rpx; padding-bottom: 50rpx;">
			<u-col span="4">
				<view>
					<view class="center">
						<text v-text="(vuex_user.order && vuex_user.order.paid) || 0"></text>
					</view>
					<view class="center statis">待入住</view>
				</view>
			</u-col>
			<u-col span="4">
				<view>
					<view class="center"><text v-text="(vuex_user.order && vuex_user.order.created) || 0"></text></view>
					<view class="center statis">待支付</view>
				</view>
			</u-col>
			<u-col span="4">
				<view>
					<view class="center">
						<text v-text="(vuex_user.order && vuex_user.order.evaluate) || 0"></text>
					</view>
					<view class="center statis">待评论</view>
				</view>
			</u-col>
		</u-row>

		<!-- 导航 -->
		<view style="background-color: white; margin-top: 30rpx;">
			<u-cell-group>
					<u-cell icon="setting-fill" title="个人设置" :isLink="true"></u-cell>
					<u-cell icon="integral-fill" title="会员等级":isLink="true"></u-cell>
					<u-cell icon="integral-fill" title="退出登陆":isLink="true"></u-cell>
				</u-cell-group>
				
	<!-- 		<u-cell-group>
				<u-cell class="cell" icon="order" title="房间预订订单" @click="goPage('/pages/order/houseorder',true)"></u-cell>
				<u-cell class="cell" icon="integral-fill" title="我的积分" @click="goPage('/pages/score/score',true)"></u-cell>
				<u-cell class="cell" icon="account-fill" title="个人资料" @click="goPage('/pages/my/profile',true)"></u-cell>
				<u-cell class="cell" icon="coupon" title="我的优惠券" @click="goPage('/pages/coupon/user',true)"></u-cell>
				<u-cell class="cell" icon="backspace" v-if="vuex_token" title="退出登录" @click="goPage('out')"></u-cell>
			</u-cell-group> -->
		</view>
		
	</view>
</template>

<script>
	import {
		avatar
	} from '@/common/mixin.js';
	export default {
		mixins: [avatar],
		computed: {
			wavetop() {
				return 'https://booking.demo.fastadmin.net/assets/addons/booking/img/wave-top.png';
			},
			wavemiddle() {
				return 'https://booking.demo.fastadmin.net/assets/addons/booking/img/wave-mid.png';
			},
			wavebottom() {
				return 'https://booking.demo.fastadmin.net/assets/addons/booking/img/wave-bot.png';
			},
			isBind() {
				return false;
			}
		},
		onShow() {
			if (this.vuex_token) {
				// this.getUserIndex();
			} else {
				this.$u.vuex('vuex_user', {});
			}
			//移除事件监听
			uni.$off('uAvatarCropper', this.upload);
		},
		data() {
			return {
				// 状态栏高度，H5中，此值为0，因为H5不可操作状态栏
				statusBarHeight: uni.getSystemInfoSync().statusBarHeight,
				// 导航栏内容区域高度，不包括状态栏高度在内
				navbarHeight: 44,
				ursl: '',
				form: {
					avatar: ''
				},
				src: 'https://cdn.uviewui.com/uview/album/1.jpg'
			};
		},
		methods: {
			aaaa(){
				console.log('login');
			},
			getUserIndex: async function() {
				let res = await this.$api.getUserIndex();
				uni.stopPullDownRefresh();
				if (res.code == 1) {
					this.$u.vuex('vuex_user', res.data.userInfo || {});
				} else {
					this.$u.toast(res.msg);
					return;
				}
			},
			toSignin() {
				if (!this.vuex_user.is_install_signin) {
					this.$refs.uTips.show({
						title: '请先安装会员签到插件插件或启用该插件',
						type: 'error',
						duration: '3000'
					});

					return;
				}
				this.goPage('/pages/signin/signin', 1);
			},
			editAvatar: async function() {
				let res = await this.$api.goUserAvatar({
					avatar: this.form.avatar
				});
			}
		},
		//下拉刷新
		onPullDownRefresh() {
			if (this.vuex_token) {
				this.getUserIndex();
			} else {
				uni.stopPullDownRefresh();
				this.$u.toast('请先登录')
				this.$u.vuex('vuex_user', {});
			}
		}
	};
</script>

<style lang="scss">
	.center {
		text-align: center;
		font-size: 14px;
	}

	.statis {
		margin-top: 25rpx;
		font-size: 14px;
	}
	
	.cell{
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}




	.wrap {
		padding: 12px;
	}

	.demo-layout {
		height: 25px;
		border-radius: 4px;
	}

	.bg-purple {
		background: #CED7E1;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	page {
		background-color: #f4f6f8;
	}

	.home {
		position: relative;

		.userinfo {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 30rpx 0;
			z-index: 100;
			height: 310rpx;

			.u-skeleton-fillet {
				color: #ffffff;
			}
		}

		.corrugated {
			bottom: -2rpx;
			left: 0;
			position: absolute;
			width: 100%;
			height: 50%;
			overflow: hidden;
			z-index: 0;

			.wave-item {
				position: absolute;
				width: 200%;
				left: 0;
				height: 200rpx;
				background-repeat: repeat no-repeat;
				background-position: 0 bottom;
				transform-origin: center bottom;
			}

			.wave-top {
				opacity: 0.5;
				animation: wave-animation 3s;
				animation-delay: 1s;
				background-size: 50% 60rpx;
				z-index: 15;
			}

			.wave-middle {
				opacity: 0.75;
				animation: wavemove 10s linear infinite;
				background-size: 50% 80rpx;
				z-index: 10;
			}

			.wave-bottom {
				animation: wavemove 15s linear infinite;
				background-size: 50% 45rpx;
				z-index: 5;
			}
		}
	}

	@keyframes wavemove {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1);
		}

		50% {
			transform: translateX(-25%) translateZ(0) scaleY(0.55);
		}

		100% {
			transform: translateX(-50%) translateZ(0) scaleY(1);
		}
	}
</style>

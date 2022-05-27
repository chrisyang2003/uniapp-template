<template>
	<view>
		<m-navbar title="登录"></m-navbar>
		<view class="login">
			<view>
				<u-form labelPosition="top" :model="form">
					<u-form-item label="账号:" prop="account" left-icon="account" label-width="120">
						<u-input border="bottom" placeholder="请输入用户名" v-model="form.account" />
					</u-form-item>
					<u-form-item label="密码:" prop="password" left-icon="lock" label-width="120" >
						<u-input :password="true" border="bottom" type="password" v-model="form.password"
							placeholder="请输入密码"></u-input>
					</u-form-item>
				</u-form>

			</view>
			<view style="margin-top: 50rpx;">
				<u-button  color="#374486" shape="circle" @click="goLogin">
					登录
				</u-button>
			</view>
			<view style="margin-top: 50rpx; color: #909399; float: right;" @click="goPage('/pages/login/register')">注册账号</view>
		</view>
		<!-- <u-toast ref="uToast"></u-toast> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					account: '',
					password: ''
				},
			}
		},
		methods: {
			async goLogin(){
				let res = await this.$api.goLogin(this.form);
				if (res.code == 200) {
					this.$u.toast(res.msg);
					return;
				}else{
					this.$u.toast(res.msg)
				}
				// this.$u.vuex('vuex_token', res.data.token);
				// this.$u.vuex('vuex_user', res.data.user || {});
				// this.success(1);
			},
		}
	};
</script>

<style>
	.login {
		padding: 200rpx 100rpx 0 100rpx;
	}
</style>

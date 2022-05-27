<template>
	<view class="">
		<!-- 顶部导航 -->
		<m-navbar title="注册"></m-navbar>
		<view class="login">
			<view>
				<u-form :model="form" ref="uForm">
					
					<u-form-item style="padding-bottom: 15rpx;" label="用户名:" prop="username" label-width="60" borderBottom>
						<u-input border="none" placeholder="请填写用户名" v-model="form.username" />
					</u-form-item>
					
					<u-form-item style="padding-bottom: 15rpx;" label="密 码:" prop="password" label-width="60" borderBottom>
						<u-input border="none":password-icon="true" type="password" v-model="form.password" placeholder="请输入密码"></u-input>
					</u-form-item>
					
					<u-form-item style="padding-bottom: 15rpx;" label="手机号:" prop="mobile" label-width="60" borderBottom>
						<u-input border="none" placeholder="请输入手机号" v-model="form.mobile" type="number"></u-input>
					</u-form-item>
					
					<u-form-item style="padding-bottom: 15rpx;" label="验证码:" prop="code" label-width="60" borderBottom>
						<u-input border="none" placeholder="请输入验证码" v-model="form.code" type="text"></u-input>
						<u-button
							type="primary"
							slot="right"
							:custom-style="{ backgroundColor: theme.bgColor, color: theme.color }"
							size="mini"
							@click="getCode"
						>
							{{ codeTips }}
						</u-button>
					</u-form-item>
					
				</u-form>
			</view>
			<view style="margin-top: 60rpx;">
				<u-button hover-class="none" type="primary" :custom-style="{ backgroundColor: theme.bgColor, color: theme.color }" shape="circle" @click="register">
					注册
				</u-button>
			</view>
		</view>
		<u-code seconds="60" ref="uCode" @change="codeChange"></u-code>
	</view>
</template>

<script>
export default {
	onReady() {
			this.$refs.uForm.setRules(this.rules);
	},
	data() {
		return {
			form: {
				username: '',
				password: '',
				mobile: '',
				code: ''
			},
			rules: {
				mobile: [
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'change'
					},
					{
						// 自定义验证函数，见上说明
						validator: (rule, value, callback) => {
							return this.$u.test.mobile(value);
						},
						message: '手机号码不正确',
						trigger: ['change', 'blur']
					}
				],
				code: [
					{
						required: true,
						message: '请输入短信验证码',
						trigger: 'change'
					}
				]
			},
			codeTips: '',
		};
	},
	methods: {
		codeChange(text) {
			this.codeTips = text;
		},
		// 获取验证码
		getCode: async function() {
			this.$refs.uCode.start();

		},
		register() {

			this.$refs.uForm.validate(valid => {
				if (valid) {
					this.goRegister()
				} else {
					this.$u.toast('验证失败');
				}
			});
		},
		//去注册
		async goRegister(){
			let res = await this.$api.goRegister(this.form);
			if (!res.code) {
				this.$u.toast(res.msg);
				return;
			}
			this.$u.vuex('vuex_token', res.data.token);
			this.$u.vuex('vuex_user', res.data.user || {});
		}
	}
};
</script>

<style>
page {
	background-color: #ffffff;
}

.login {
	padding: 20% 10%;
}
.agree {
	margin-left: -25rpx;
}
</style>

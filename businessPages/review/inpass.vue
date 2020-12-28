<template>
	<view class="container">
		<!-- 已提交审核 -->
		<view>
			<!-- <view class="btn rz fz-14 flex_center" v-if="!signStatus" @click="copy()">复制签约链接</view>
			<view class="notice fz-12" v-if="!signStatus">请将签约地址复制至手机浏览器打开，即可完成签约</view>
			<view class="btn nrz fz-14 flex_center" v-else>已完成签约</view> -->
			
			<!-- <view class="btn rz fz-14 flex_center" @click="copy()">入驻协议</view> -->
			<!-- <view class="tip">
				<view class="fz-12">请完成平台的入驻协议，并签名</view>
			</view> -->
			
			<!-- 提交认证 -->
			<view class="tip">
				<view class="fz-14">请保存下方二维码，完成微信官方认证后，</view>
				<view class="fz-14">提交注册成功截图，认证成功后才能正常收款哦</view>
			</view>
			<view class="tip">
				<image src="https://lianketong.oss-cn-shenzhen.aliyuncs.com/wx_images/business/wxcode.jpg" class="tip-img"></image>
			</view>
			<view class="btn rz fz-14 flex_center" @click="upImg()" v-if="!isImg">提交微信认证截图</view>
			<view class="btn nrz fz-14 flex_center" v-else>已提交</view>
		</view>
	</view>
</template>

<script>
	export default{
		name:'inpass',
		data() {
			return {
				status:1,
				note: '',
				signStatus:false,
				CopyUrl:'',
				isImg:false,
			}
		},
		computed:{
			userId(){
				return this.$store.state.userInfo.id;
			},
		},
		methods:{
			// 上传图片
			upImg(index,type){
				uni.chooseImage({
					count:1,
					success: res => {
						let file = res.tempFilePaths[0];
						uni.getFileInfo({
							filePath:file,
							success: (res) => {
								if(res.size < 5000||res.size>1048576){
									uni.showToast({
										title:'请上传5kb-1M的图片',
										icon:'none'
									})
								}else{
									uni.uploadFile({
										url: `${this.$store.state.baseUrl}/upload/?serviceType=user`,
										filePath: file,
										fileType: 'image',
										name:' file',
										success:res=>{
											let url = JSON.parse(res.data).data;
											this.$fly.post('/adapayEnter/uploadEnterScreen'+`?userId=${this.userId}&imgURL=${url}`).then(res=>{
												uni.showToast({
													title:res.message,
													icon:'none'
												})
												if(res.code == 0){
													this.isImg = true;
												}
												
											})
										}
									})
									
								}
							}
						})
					}
				})
			},
			async init(){
				try{
					uni.showLoading({
						title:'加载中'
					})
					let signStatus = await this.$fly.post('/adapayEnter/findMerchantEntryByUserId?userId='+this.userId);
					this.signStatus = signStatus.data.signStatus;
					let data = signStatus.data;
					let prams = {
						email:data.email,
						phone:data.linkPhone,
						legalPerson:data.legalPerson,
						legalPersonID:data.legalPersonID,
						signName:data.signName,
						address:data.address
					}
					
					// let url = `?email=${prams.email}&phone=${prams.phone}&legalPerson=${prams.legalPerson}&legalPersonID=${prams.legalPersonID}&signName=${prams.signName}&address=${prams.address}`
					// // this.$store.commit('SETSTATUSDATA',statusData);
					// let signContract = await this.$fly.post('/entry/signContract'+url);
					// this.CopyUrl = signContract.data.data;
					uni.hideLoading();
					
				}catch(e){
					uni.showToast({
						title: '服务器繁忙，请稍后重试',
						icon: 'none'
					})
				}
			},
			// 复制
			copy(){
				uni.setClipboardData({
					data:this.CopyUrl,
					success: () => {
						uni.showToast({
							title:'复制成功！'
						})
					},
					fail: (err) => {
						// console.log('copy',err)
					}
				})
			},
		},
		onShow() {
		},
		onLoad:function(query){
			this.status = query.status;
			this.note = query.note;
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		min-height: 100vh;
		padding-bottom: 50rpx;
		height: auto;
	}
	.tip{
		padding-top: 100rpx;
		text-align: center;
		.fz-14{
			color: #999999;
		}
		.fz-12{
			color: #CBCBCB;
		}
		.tip-img{
			width: 268rpx;
			height: 268rpx;
		}
	}
	.btn{
		width: 670rpx;
		height: 38px;
		border-radius: 19px;
		border: 2rpx solid #FF9D11;
		color: #FF9D11;
		background: #fff;
		margin: 0 auto;
		margin-top: 100rpx;
		&.rz{
			background: #FF9D11;
			color: #fff;
		}
		&.nrz{
			background: #DDDDDD;
			border: 2rpx solid #DDDDDD;
			color: #fff;
		}
	}
	.notice{
		color: #ccc;
		margin-top: 20rpx;
		text-align: center;
	}
</style>

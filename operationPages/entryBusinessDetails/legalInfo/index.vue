<template>
	<view class="info fz-14" v-show="ifShow">
		<view class="main">
			<!-- 法人姓名 -->
			<view class="item flex_center">
				<view class="item-name">法人姓名</view>
				<view class="item-content">
					<input v-model="form.corporateName" disabled class="frame" type="text" placeholder="请输入法人姓名" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
				</view>
			</view> 
			<!-- 证件号码 -->
			<view class="item flex_center">
				<view class="item-name">身份证号</view>
				<view class="item-content">
					<input v-model="form.corporateIdNo" disabled class="frame" type="text" placeholder="请输入身份证号" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
				</view>
			</view> 
			<!-- 证件照 -->
			<view class="item flex_center">
				<view class="item-name">身份证照</view>
				<view class="item-content flex_center fz-12">
					<view class="flex_center" style="margin-right: 20rpx;" v-for="item in imgArr">
						<!-- 正面 -->
						<view class="upload flex_center" style="margin-right: 0;">
							<view class="uploadPic flex_center" v-if="item">
								<image :src="item" mode="aspectFit" @click="previewImg(item)"></image>
							</view>
							<view class="frame flex_center" v-else>
								<uni-icons class="flex_center" type="plusempty" :size="24" color="#CBCBCB"></uni-icons>
							</view>
<!--							<view>{{item.name}}</view>-->
						</view>
						<view @click="upload(index,'credentialUrl')">重新上传</view>
					</view>
					
				</view>
			</view>
			<!-- 有效期 -->
			<view class="item flex_center">
				<view class="item-name">有效期</view>
				<view class="item-content flex_center">
					<view class="">
						<!-- 有效期选择 -->
						{{form.idCardStartDate | dateTime}}
					</view>
					<view class="line">—</view>
					<view class="">
						<!-- 有效期选择 -->
						{{form.idCardEndDate | dateTime}}
					</view>
				</view>
			</view>
			<!-- 证件号码 -->
			<view class="item flex_center">
				<view class="item-name">联系电话</view>
				<view class="item-content">
					<input v-model="form.contactTel" disabled class="frame" type="text" placeholder="请输入联系电话" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
				</view>
			</view> 
			<!-- 联系邮箱 -->
			<view class="item flex_center">
				<view class="item-name">联系邮箱</view>
				<view class="item-content">
					<input v-model="form.contactEmail" disabled class="frame" type="text" placeholder="请输入联系邮箱" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
				</view>
			</view> 
		</view>
	</view>
</template>

<script>
	export default{
		name:'legalInfo',
		props:["show"],
		data() {
			return {
				form:{}
			}
		},
		computed:{
			ifShow(){
				return this.show;
			},
			imgArr(){
				let arr = [];
				let obj = {
					idNoFrontPic:true,
					idNoBackPic:true,
				};
				// console.log(this.form)
				if(JSON.stringify(this.form) == "{}"){
					return;
				}
				this.form.enterPicParam = JSON.parse(this.form.enterPicParam)
				for(let i in this.form.enterPicParam){
					if(obj[i]){
						arr.push(this.form.enterPicParam[i])
					}
				}
				return arr;
			},
		},
		methods:{
			upload(index,type){
				uni.chooseImage({
					count:1,
					success: res => {
						// console.log(res)
						let file = res.tempFilePaths[0];
						uni.getFileInfo({
							filePath:file,
							success: (res) => {
								if(res.size < 5000){
									uni.showToast({
										title:'请上传不小于5KB的图片'
									})
								}else{
									uni.uploadFile({
										url: `${this.$store.state.baseUrl}/upload/?serviceType=user`,
										filePath: file,
										fileType: 'image',
										name:' file',
										success:res=>{
											let url = JSON.parse(res.data).data;
											this.imgArr[index][type] = url;
										}
									})
								}
							}
						})
					}
				})
			},
			init(form){
				this.form = form;
			},
			// 图片预览
			previewImg(img){
				uni.previewImage({
					loop:true,
					current:0,
					urls: [img],
					success:res=>{
						console.log(res)
					}
				})
			},
		},
		filters:{
			dateTime(time){
				if (!time) {
					return ''
				}
				if (time && time.length>8) {
					return time
				}
				return time && time.slice(0,4)+'-'+time.slice(4,6)+'-'+time.slice(6);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.info{
		line-height: 28rpx;
		.title{
			color: #999999;
			padding: 20rpx;
		}
		.main{
			.item{
				justify-content: flex-start;
				background: #fff;
				padding: 30rpx 20rpx;
				// height: 100rpx;
				border-bottom: 2rpx solid #D3D3D3;
				.item-name{
					color: #999999;
					width: 20%;
				}
				.item-content{
					justify-content: flex-start;
					color: #333;
					width: 80%;
					.frame{
						width: 90%;
					}
					.more{
						width: 24rpx;
						display: block;
					}
					.line{
						color:#999 ;
						margin: 0 10rpx;
					}
					.date{
						color: #CBCBCB;
					}
					.active{
						color: #333;
					}
					.upload{
						flex-direction: column;
						color: #CBCBCB;
						margin-right: 30rpx;
						line-height: 24rpx;
						.frame{
							width: 120rpx;
							height: 120rpx;
							border: 2rpx dashed #CBCBCB;
							margin-bottom: 10rpx;
						}
						.uploadPic{
							width: 120rpx;
							height: 120rpx;
							margin-bottom: 10rpx;
							.pic{
								width: 120rpx;
								height: 120rpx;
								display: block;
							}
							image{
								width: 120rpx;
								height: 120rpx;
								display: block;
							}
						}
					}
				}
			}
		}
	}
	.btn{
		width: 670rpx;
		height: 74rpx;
		border-radius: 37rpx;
		background: #FF9D11;
		color: #fff;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30rpx;
	}
</style>

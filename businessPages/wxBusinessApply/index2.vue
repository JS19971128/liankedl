<template>
	<view class="container">
		<view class="fz-12 top">
			<view class="step flex_center">
				<view class="step-item active flex_center" @click="clickURl('/businessPages/wxBusinessApply/index')">
					<view class="num flex_center">1</view>
					<view class="">法人信息</view>
				</view>
				<view class="line">----</view>
				<view class="step-item active flex_center">
					<view class="num flex_center">2</view>
					<view class="">商家信息</view>
				</view>
				<view class="line">----</view>
				<view class="step-item flex_center" @click="clickURl('/businessPages/wxBusinessApply/index3')">
					<view class="num flex_center">3</view>
					<view class="">银行信息</view>
				</view>
				<view class="line">----</view>
				<view class="step-item flex_center" @click="clickURl('/businessPages/wxBusinessApply/index4')">
					<view class="num flex_center">
						<uni-icons class="flex_center" type="checkmarkempty" :size="24" color="#999999"></uni-icons>
					</view>
					<view class="">店铺设置</view>
				</view>
			</view>
		</view>
		<view class="info fz-14">
			<view class="title">企业信息</view>
			<view class="main">
				<!-- 经营类型 -->
				<view class="item flex_center">
					<view class="item-name">经营类型</view>
					<view class="item-content ">
						<!-- 经营类型选择 -->
						<picker mode="selector" :range="jylx" :value="enterprise.jylxIndex" range-key="label" @change="bindTypeChange($event,'jylx')">
							<view class="flex_between">
								<view>
								<input type="text" v-model="enterprise.jylxLabel" disabled placeholder="请选择商户的经营类型" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
								</view>
								<view>
									<image src="https://lianketong.oss-cn-shenzhen.aliyuncs.com/wx_images/common/xiala.png" mode="widthFix"></image>
								</view>
							</view>
						</picker>
					</view>
				</view>
				<!-- 经营类目 -->
				<view class="item flex_center" @click="show=true">
					<view class="item-name">经营类目</view>
					<view class="item-content">
						<input type="text" v-model="enterprise.industryName" disabled placeholder="请选择经营类目与行业" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
					</view>
				</view>
				<!-- 商家名称 -->
				<view class="item flex_center">
					<view class="item-name">商家名称</view>
					<view class="item-content">
						<input type="text" v-model="enterprise.companyName" placeholder="必须与营业执照上的名称一致" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
					</view>
				</view>
				<!-- 商家简称 -->
				<view class="item flex_center">
					<view class="item-name">商家简称</view>
					<view class="item-content">
						<input type="text" v-model="enterprise.shortName" placeholder="请输入10个字以内的简称" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
					</view>
				</view>
				<!-- 企业性质 -->
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">企业性质</view>
					<view class="item-content ">
						<!-- 企业性质 -->
						<picker mode="selector" :range="qyxz" :value="enterprise.qyxzIndex" range-key="label" @change="bindTypeChange($event,'qyxz')">
							<view class="flex_between">
								<view>
								<input type="text" v-model="enterprise.qyxzLabel" disabled placeholder="请选择企业性质" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
								</view>
								<view>
									<image src="https://lianketong.oss-cn-shenzhen.aliyuncs.com/wx_images/common/xiala.png" mode="widthFix"></image>
								</view>
							</view>
						</picker>
					</view>
				</view>
				<!-- 注册号 -->
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">注册号</view>
					<view class="item-content">
						<input type="text" v-model="enterprise.socialCreditCode" placeholder="请输入营业执照上的注册号" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
					</view>
				</view>
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">注册地址</view>
					<view class="item-content">
						<input type="text" v-model="enterprise.reg_addr" placeholder="请输入营业执照上的注册地址" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
					</view>
				</view>
				<!-- 经营资质 -->
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">营业执照</view>
					<view class="item-content flex_center fz-12">
						<view class="upload flex_center" v-for="(item,index) in imgArr" :key="index">
							<view class="uploadPic flex_center" v-if="item.credentialUrl" @click="upload(index,'credentialUrl')">
								<image :src="item.credentialUrl" mode="aspectFit"></image>
							</view>
							<view class="frame flex_center" v-else @click="upload(index,'credentialUrl')">
								<uni-icons class="flex_center" type="plusempty" :size="24" color="#CBCBCB"></uni-icons>
							</view>
							<view>{{item.name}}</view>
						</view>
					</view>
				</view>
				<!-- 经营期限 -->
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">经营期限</view>
					<view class="item-content ">
						<!-- 经营类型选择 -->
						<picker mode="selector" :range="jyqx" :value="enterprise.jyqxIndex" range-key="label" @change="bindTypeChange($event,'jyqx')">
							<view class="flex_between">
								<view>
								<input type="text" v-model="enterprise.jyqxLabel" disabled placeholder="请选择经营期限" placeholder-style="color:#CBCBCB;font-size:28rpx"/>
								</view>
								<view>
									<image src="https://lianketong.oss-cn-shenzhen.aliyuncs.com/wx_images/common/xiala.png" mode="widthFix"></image>
								</view>
							</view>
						</picker>
					</view>
				</view>
				<!-- 起始时间 -->
				<view class="item flex_center" v-if="enterprise.jylxLabel!='小微商户'">
					<view class="item-name">起始时间</view>
					<view class="item-content">
						<picker mode="date" :value="enterprise.businessDateStart" @change="startDateChange">
							<view class="flex_between" :class="{date:enterprise.businessDateStart=='',active:enterprise.businessDateStart!==''}">{{enterprise.businessDateStart||'请选择营业执照上的经营起始时间'}}</view>
						</picker>
					</view>
				</view>
				<!-- 期限时间 -->
				<view class="item flex_center" v-if="enterprise.jyqxLabel!=='长期' && enterprise.jylxLabel!='小微商户'">
					<view class="item-name">期限时间</view>
					<view class="item-content">
						<picker mode="date" :value="enterprise.businessDateLimit" @change="stopDateChange">
							<view class="flex_between" :class="{date:enterprise.businessDateLimit=='',active:enterprise.businessDateLimit!==''}">{{enterprise.businessDateLimit||'请选择营业执照上的经营期限时间'}}</view>
						</picker>
					</view>
				</view>
			</view>
		</view>
		<view class="btn fz-14 flex_center" @click="next(false)">保存并下一步</view>
		
		<w-picker
			class="address"
			mode="linkage"
			:level="3"
			:visible.sync="show" 
			:options="industrytype"
			default-type="label"
			@confirm="onConfirm($event,'linkage')" 
			@cancel="onCancel" 
			ref="region" 
		></w-picker>
	</view>
</template>

<script>
	import jylm from '@/common/util/wx_jylm.js';
	import industrytype from '@/common/util/industrytype.js';
	import pickerData from '@/businessPages/wxBusinessApply/pickerData'
	import pickerDataAlipay from '@/businessPages/wxBusinessApply/pickerDataAlipay.vue'
	export default{
		data() {
			return {
				// {label:'个人商户',type:'PERSON',key:'个人'},
				jylx:[{label:'小微商户',key:'2'},{label:'个体商户',key:'1'},{label:'企业商户',key:'1'}],
				jylxLabel:'',
				merchantType:'',
				jylxIndex:0,
				jylxKey:'',
				
				industrytype:[],
				industryName:'',
				show:false,
				
				qyxz:[
					{
						label:'民营企业',
						value:'3'
					},
					{
						label:'国营企业',
						value:'2'
					},
					
					{
						label:'外资企业',
						value:'4'
					},
					{
						label:'政府机构',
						value:'1'
					},
					{
						label:'个体工商户',
						value:'5'
					},
					{
						label:'事业单位',
						value:'7'
					}
				],
				qyxzIndex:0,
				qyxzLabel:'',
				
				jylm:[],
				jylmLabel:'',
				merchantCategory:'',
				jylmIndex:0,
				jylmKey:'',
				
				jyhy:[],
				jyhyIndex:0,
				jyhyLabel:'',
				industryTypeCode:'',
				
				jyqx:[{label:'长期',key:true},{label:'短期',key:false}],
				jyqxLabel:'',
				jyqxIndex:0,
				longTerm:true,
				
				signName:'',
				showName:'',
				businessLicense:'',
				businessDateStart:'请选择营业执照上的经营起始时间',
				businessDateLimit:'请选择营业执照上的经营期限时间',
			}
		},
		components:{
			pickerData,pickerDataAlipay
		},
		computed:{
			imgArr(){
				let arr = [];
				let obj = {
					licensePic:true,
					// permitPic:true,
					// openWishPic:true
				};
				for(let i of this.$store.state.shop.merchantCredential){
					if(obj[i.credentialType]){
						arr.push(i)
					}
				}
				return arr;
			},
			merchantCredential(){
				return this.$store.state.shop.merchantCredential
			},
			enterprise(){
				return this.$store.state.shop.enterprise;
			}
		},
		methods:{ 
			//选择经营类目
			onConfirm(e){
				let col2 = e.obj.col2;
				let col1 = e.obj.col1;
				let col3 = e.obj.col3;
				this.enterprise.industryName = `${col1.label} --- ${col2.label} --- ${col3.label}`;
				// console.log(col3.id,'经营行业id')
				this.enterprise.industryType = col3.id;
			},
			//取消选择
			onCancel(){
				this.show = false;
			},
			changeNature(laber){
				if(laber == '小微商户'){
					this.enterprise.nature = 8
				}
				if(laber == '个体商户'){
					this.enterprise.nature = 5
				}
				if(laber == '企业商户'){
					this.enterprise.nature = 3
				}
			},
			bindTypeChange($event,type){
				if(type==='jylx'){
					this.enterprise.jylxLabel = this.jylx[$event.detail.value].label;
					this.enterprise.jylxIndex = $event.detail.value;
					this.enterprise.comType = this.jylx[$event.detail.value].key;
					this.changeNature(this.enterprise.jylxLabel)
					console.log(this.enterprise)
					this.categoryName()
				}else if(type==='jylm'){
					this.enterprise.jylmLabel = this.jylm[$event.detail.value].label;
					this.enterprise.merchantCategory = this.jylm[$event.detail.value].type;
					this.enterprise.jylmIndex = $event.detail.value;
					this.enterprise.jylmKey = this.jylm[$event.detail.value].label;
					this.categoryName()
				}else if(type==='jyhy'){
					this.enterprise.jyhyLabel = this.jyhy[$event.detail.value].name;
					this.enterprise.industryTypeCode = this.jyhy[$event.detail.value].id;
					this.enterprise.jyhyIndex = $event.detail.value;
				}else if(type==='jyqx'){
					this.enterprise.jyqxLabel = this.jyqx[$event.detail.value].label
					this.enterprise.jyqxIndex = $event.detail.value;
					this.enterprise.longTerm = this.jyqx[$event.detail.value].key
				}else if(type==='qyxz'){
					this.enterprise.qyxzLabel = this.qyxz[$event.detail.value].label;
					this.enterprise.qyxzIndex = $event.detail.value;
					this.enterprise.nature = this.qyxz[$event.detail.value].value;
				}
			},
			// 选择起始日期
			startDateChange($event){
				this.enterprise.businessDateStart = $event.detail.value;
				console.log($event)
			},
			// 选择结束日期
			stopDateChange($event){
				this.enterprise.businessDateLimit = $event.detail.value;
			},
			// 上传证件照
			upload(index,type){
				uni.chooseImage({
					count:1,
					success: res => {
						// console.log(res)
						let file = res.tempFilePaths[0];
						uni.getFileInfo({
							filePath:file,
							success: (res) => {
								if(res.size < 5000||res.size>1048576){
									uni.showToast({
										title:'请上传5k - 1M的图片'
									})
								}else{
									uni.uploadFile({
										url: `${this.$store.state.baseUrl}/upload/?serviceType=user`,
										filePath: file,
										fileType: 'image',
										name:' file',
										success:res=>{
											if(res.statusCode.toString().startsWith(2)){
												let url = JSON.parse(res.data).data;
												let picUrl = url;
												this.imgArr[index][type] = url;
											}
											else{
												uni.showToast({
													title:`抱歉，错误${res.statusCode}，图片上传失败，请稍后再试`,
													duration:2500,
													icon:'none'
												})
											}
										}
									})
								}
							}
						})
					}
				})
			},
			clickURl(url){
				this.next(true)
				uni.redirectTo({
					url
				})
			},
			//地址选择
			regionCodeFun(e){
				this.enterprise.regionCode = e.regionCode;
				this.enterprise.addressName = e.addressName;
			},
			next(ifnext){
				const {enterprise,imgArr,merchantCredential} = this;
				let data = {...enterprise};
				console.log(enterprise,data)
				if(enterprise.jylxLabel!='小微商户'){
					if(data.jyqxLabel=='短期'){
						data.longTerm = false
					}else if(data.jyqxLabel=='长期'){
						data.longTerm = true
					}
					if(data.longTerm){
						data.businessDateLimit = '2099-12-31'
					}
					
					for(let i in data){
						if(data[i]==='' && i!=='longTerm'){
							
							console.log(data[i])
							wx.showToast({
							  title:'请填写完整所有信息',
							  icon: 'none',
							  duration: 2500
							})
							return ;
						}
						
					}
					
					for(let i of imgArr){
						if(!i.credentialUrl && i.credentialType!='openWishPic'){
							wx.showToast({
							  title:'请上传营业执照',
							  icon: 'none',
							  duration: 2500
							})
							return ;
						}
					}
					
					for(let i of imgArr){
						for(let j of merchantCredential){
							if(i.credentialType===j.credentialType){
								j.credentialUrl = i.credentialUrl;
							}
						}
					}
				}else{
					console.log(enterprise)
					if(!enterprise.jylxLabel || !enterprise.industryType || !enterprise.companyName || !enterprise.shortName){
						wx.showToast({
						  title:'请填写完整所有信息',
						  icon: 'none',
						  duration: 2500
						})
						return ;
					}
				}
				
				
				this.$store.commit('SETENTERPRISE',data);
				this.$store.commit('SETMERCHANTCREDENTIAL',merchantCredential);
				if(!ifnext){
					uni.redirectTo({
						url:"/businessPages/wxBusinessApply/index3"
					})
				}
			},
			init(){
				this.jylm = jylm;
				
				this.industrytype = industrytype;
				// this.categoryName();

			},
			async categoryName(){
				try{
					let {enterprise} = this;
					let {jylxKey,jylmKey} = enterprise
					
					let category = await this.$fly.get(`/entry/getIndustryTypeCodeList`,{
						name:`${jylxKey}-${jylmKey}`
					});
					for(let i of category){
						let name = i.name;
						let sl = name.slice(name.indexOf('-')+1);
						i.name = sl.slice(sl.indexOf('-')+1);
					}
					this.jyhy = category;
				}catch(e){
					//TODO handle the exception
					console.error(e)
				}finally{
					
				}
			}
		},
		onLoad() {
			this.init();
		}
	}
</script>

<style lang="scss" scoped>
	.container{
		padding-bottom: 130rpx;
		box-sizing: border-box;
		min-height: 100vh;
		height: auto;
	}
	.top{
		padding: 50rpx 0;
		background: #fff;
		border-top: 2rpx solid #D3D3D3;
	}
	.step{
		width: 590rpx;
		margin: 0 auto;
		justify-content: flex-start;
		line-height: 50rpx;
		color: #999999;
		.line{
			height: 90rpx;
			vertical-align: center;
		}
		.step-item{
			flex-direction: column;
			.num{
				width: 90rpx;
				height: 90rpx;
				border: 2rpx solid #999999;
				border-radius: 50%;
				background: #fff;
			}
		}
		.active{
			color: #FF9D11;
			.num{
				border: 2rpx solid #FF9D11;
				background: #FF9D11;
				color: #fff;
			}
		}
	}
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
					input{
						width: 90%;
						line-height: 28rpx;
						height: 28rpx;
						color: #333;
						font-size: 28rpx;
					}
					image{
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
		z-index: 999;
	}
</style>
<template>
	<view class="container">
		<view class="fz-12 top">
			<view class="step flex_center">
				<view class="step-item active flex_center">
					<view class="num flex_center">1</view>
					<view class="">法人信息</view>
				</view>
				<view class="line">----</view>
				<view class="step-item flex_center" @click="clickURl('/businessPages/wxBusinessApply/index2')">
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
			<view class="title">法人信息</view>
			<view class="main">
				<!-- 法人姓名 -->
				<view class="item flex_center">
					<view class="item-name">法人姓名</view>
					<view class="item-content">
						<input type="text" v-model="legalPersonFrom.corporateName" placeholder="请输入法人姓名" placeholder-style="color:#CBCBCB;font-size:28rpx" />
					</view>
				</view>
				<!-- 证件号码 -->
				<view class="item flex_center">
					<view class="item-name">身份证号</view>
					<view class="item-content">
						<input type="text" v-model="legalPersonFrom.corporateIdNo" placeholder="请输入法人18位身份证号码" placeholder-style="color:#CBCBCB;font-size:28rpx" />
					</view>
				</view>
				<!-- 证件照 -->
				<view class="item flex_center">
					<view class="item-name">身份证照</view>
					<view class="item-content flex_center fz-12">
						<view class="upload flex_center" v-for="(item,index) in imgArr" :key="index">
							<!-- 正面 -->
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
				<!-- 身份证期限 -->
				<view class="item flex_center">
					<view class="item-name">期限</view>
					<view class="item-content ">
						<!-- 经营类型选择 -->
						<picker mode="selector" :range="IDArr" :value="legalPersonFrom.IDIndex" range-key="label" @change="bindTypeChange($event,'IDArr')">
							<view class="flex_between">
								<view>
									<input type="text" v-model="legalPersonFrom.IDlabel" disabled placeholder="请选择身份证期限" placeholder-style="color:#CBCBCB;font-size:28rpx" />
								</view>
								<view>
									<image src="https://lianketong.oss-cn-shenzhen.aliyuncs.com/wx_images/common/xiala.png" mode="widthFix"></image>
								</view>
							</view>
						</picker>
					</view>
				</view>
				<!-- 有效期 -->
				<view class="item flex_center">
					<view class="item-name">有效期</view>
					<view class="item-content flex_center">
						<view class="">
							<!-- 有效期选择 -->
							<picker mode="date" @change="startDateChange">
								<view class="flex_between" :class="{date:legalPersonFrom.idCardStartDate=='',active:legalPersonFrom.idCardStartDate!==''}">{{legalPersonFrom.idCardStartDate || 'yymmdd'}}</view>
							</picker>
						</view>
						<view class="line" v-if="!legalPersonFrom.isIDLong">—</view>
						<view class="" v-if="!legalPersonFrom.isIDLong">
							<!-- 有效期选择 -->
							<picker mode="date" @change="stopDateChange">
								<view class="flex_between" :class="{date:legalPersonFrom.idCardEndDate=='',active:legalPersonFrom.idCardEndDate!==''}">{{legalPersonFrom.idCardEndDate||"yymmdd"}}</view>
							</picker>
						</view>
					</view>
				</view>
				<!-- 联系电话 -->
				<view class="item flex_center">
					<view class="item-name">联系人</view>
					<view class="item-content">
						<input type="text" v-model="legalPersonFrom.corporate" placeholder="请输入联系人" placeholder-style="color:#CBCBCB;font-size:28rpx" />
					</view>
				</view>
				<view class="item flex_center">
					<view class="item-name">联系电话</view>
					<view class="item-content">
						<input type="number" v-model="legalPersonFrom.corporateTel" placeholder="请输入联系电话" placeholder-style="color:#CBCBCB;font-size:28rpx" />
					</view>
				</view>
				<!-- 联系邮箱 -->
				<view class="item flex_center">
					<view class="item-name">联系邮箱</view>
					<view class="item-content">
						<input type="text" v-model="legalPersonFrom.contactEmail" placeholder="请输入联系邮箱" placeholder-style="color:#CBCBCB;font-size:28rpx" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn fz-14 flex_center" @click="next(false)">保存并下一步</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IDArr: [{
					label: '短期',
					key: false
				}, {
					label: '长期',
					key: true
				}],
				isIDLong: false,
			}
		},
		computed: {

			merchantCredential() {
				return this.$store.state.shop.merchantCredential
			},

			legalPersonFrom() {
				return this.$store.state.shop.legalPerson
			},
			enterprise() {
				return this.$store.state.shop.enterprise;
			},
			bank() {
				return this.$store.state.shop.bank;
			},
			shopIndex() {
				return this.$store.state.shop.shopIndex;
			},

			userInfo() {
				return this.$store.state.userInfo
			},
			imgArr() {
				let arr = [];
				let obj = {
					idNoFrontPic: true,
					idNoBackPic: true,
					// storeFrontPic:true
				};
				for (let i of this.$store.state.shop.merchantCredential) {
					if (obj[i.credentialType]) {
						arr.push(i)
					}
				}
				return arr
			},
		},
		methods: {
			initJinjian() {
				let id = this.userInfo.id;
				let {
					legalPersonFrom,
					enterprise,
					bank,
					shopIndex,
					merchantCredential
				} = this;
				this.$fly.post('/adapayEnter/findMerchantEntryByUserId?userId=' + id).then(res => {
					if (res.code == 0) {
						console.log(this.legalPersonFrom, res.data)
						let data = res.data;
						let legalPersonFromObj = {
							...legalPersonFrom,
							corporateName: data.legalPerson || data.corporateName,
							corporateIdNo: data.legalPersonID || data.corporateIdNo,
							corporateTel: data.linkPhone || data.corporateTel,
							contactEmail: data.email || data.contactEmail,


							IDlabel: '短期',
							IDIndex: 0,
							isIDLong: false,
							corporateIdValidType: 1,

							cardName: data.legalPerson || data.cardName,
							contactName: data.legalPerson || data.contactName,
							customerName: data.legalPerson || data.customerName,

							contactIdNo: data.legalPersonID || data.contactIdNo,
							idNo: data.legalPersonID || data.idNo,

							contactTel: data.linkPhone || data.contactTel
						}
						let idCardStartDate = data.idCardStartDate.split('');
						if (idCardStartDate[4] != '-' && idCardStartDate[7] != '-') {
							idCardStartDate.splice(4, 0, '-');
							idCardStartDate.splice(7, 0, '-');
							legalPersonFromObj.idCardStartDate = idCardStartDate.join('')
						} else {
							legalPersonFromObj.idCardStartDate = idCardStartDate.join('')
						}
						let idCardEndDate = data.idCardEndDate.split('');
						if (idCardEndDate[4] != '-' && idCardEndDate[7] != '-') {
							idCardEndDate.splice(4, 0, '-');
							idCardEndDate.splice(7, 0, '-');
							legalPersonFromObj.idCardEndDate = idCardEndDate.join('')
							legalPersonFromObj.corporateIdExpDate = idCardEndDate.join('')
						} else {
							legalPersonFromObj.idCardEndDate = idCardEndDate.join('')
							legalPersonFromObj.corporateIdExpDate = idCardEndDate.join('')
						}

						// idCardEndDate.splice(4, 0, '-');
						// idCardEndDate.splice(7, 0, '-');
						// legalPersonFromObj.idCardEndDate = idCardEndDate.join('')
						// legalPersonFromObj.corporateIdExpDate = idCardEndDate.join('')
						if (data.idCardEndDate == '20991231') {
							legalPersonFromObj.corporateIdExpDate = '长期'
							legalPersonFromObj.IDlabel = '长期'
							legalPersonFromObj.IDIndex = 1
							legalPersonFromObj.isIDLong = true
							legalPersonFromObj.corporateIdValidType = 2
						}
						this.$store.commit('SETLEGALPERSON', legalPersonFromObj);
						console.log(this.$store.state.shop.enterpriseObj,'1')
						let enterpriseObj = {
							...enterprise,
							companyName: data.signName || data.companyName,
							shortName: data.showName || data.shortName,
							socialCreditCode: data.businessLicense || data.socialCreditCode,
							jyqxLabel: '短期',
							jyqxIndex: 0
						}
						console.log(enterpriseObj,'2')
						let businessDateLimit = data.businessDateLimit.split('');
						if (businessDateLimit[4] != '-' && businessDateLimit[7] != '-') {
							businessDateLimit.splice(4, 0, '-');
							businessDateLimit.splice(7, 0, '-');
							legalPersonFromObj.businessDateLimit = businessDateLimit.join('')
						} else {
							legalPersonFromObj.businessDateLimit = businessDateLimit.join('')
						}
						let businessDateStart = data.businessDateStart.split('');
						if (businessDateStart[4] != '-' && businessDateStart[7] != '-') {
							businessDateStart.splice(4, 0, '-');
							businessDateStart.splice(7, 0, '-');
							legalPersonFromObj.businessDateStart = businessDateStart.join('')
						} else {
							legalPersonFromObj.businessDateStart = businessDateStart.join('')
						}
						console.log(enterpriseObj,'3')
						// let businessDateLimit = data.businessDateLimit.split('');
						// businessDateLimit.splice(4, 0, '-');
						// businessDateLimit.splice(7, 0, '-');
						// enterpriseObj.businessDateLimit = businessDateLimit.join('')

						// let businessDateStart = data.businessDateStart.split('');
						// businessDateStart.splice(4, 0, '-');
						// businessDateStart.splice(7, 0, '-');
						// enterpriseObj.businessDateStart = businessDateStart.join('')
						// debugger
						if (data.businessDateLimit == '20991231') {
							enterpriseObj.jyqxLabel = '长期'
							enterpriseObj.jyqxIndex = 1
						}

						this.$store.commit('SETENTERPRISE', enterpriseObj);
						console.log(this.$store.state.shop.enterpriseObj,'4')
						let bankObj = {
							...bank,
							cardNo: data.accountNo || data.cardNo
						}
						this.$store.commit('SETBANK', bankObj);
						console.log(data)
						console.log(shopIndex)
						let shopIndexObj = {
							...shopIndex,
							shopBusinessName: data.shopBusinessName,
							profits: data.profits,
							area: data.area,
							address: data.address,
							shopStartTime: data.shopStartTime,
							shopStopTime: data.shopStopTime,
							areaCode: data.areaCode,
							areaCodeAreas: data.areaCodeAreas,
							areaCodeCity: data.areaCodeCity,
							comCityName: data.city || data.comCityName,
							comProvinceName: data.province || data.comProvinceName,
							latitude: data.latitude,
							longitude: data.longitude,
							shopBusinessId: data.shopBusinessId
						}
						// shopIndexObj.push(shopIndex)
						console.log(shopIndexObj)

						if (data.merchantCredential) {
							for (let i of data.merchantCredential) {
								if (i.credentialType == 'SIGN_BOARD') {
									shopIndexObj.positive = i.credentialUrl
								}
								if (i.credentialType == 'INTERIOR_PHOTO') {
									shopIndexObj.piclist = i.credentialUrl
								}
							}
						}

						this.$store.commit('SETSHOPINDEX', shopIndexObj);
						console.log(3)
						if (data.merchantCredential) {

							for (let i of data.merchantCredential) {
								if (i.credentialType == 'FRONT_OF_ID_CARD') {
									for (let j of merchantCredential) {
										if (j.credentialType == 'idNoFrontPic') {
											j.credentialUrl = i.credentialUrl
										}
									}
								}

								if (i.credentialType == 'BACK_OF_ID_CARD') {
									for (let j of merchantCredential) {
										if (j.credentialType == 'idNoBackPic') {
											j.credentialUrl = i.credentialUrl
										}
									}
								}

								if (i.credentialType == 'BUSINESS_LICENSE') {
									for (let j of merchantCredential) {
										if (j.credentialType == 'licensePic') {
											j.credentialUrl = i.credentialUrl
										}
									}
								}

								if (i.credentialType == 'PERMIT_FOR_BANK_ACCOUNT') {
									for (let j of merchantCredential) {
										if (j.credentialType == 'permitPic') {
											j.credentialUrl = i.credentialUrl
										}
									}
								}

							}
						}
						this.$store.commit('SETMERCHANTCREDENTIAL', merchantCredential);

						console.log(this.$store.state.shop.merchantCredential)
						console.log(this.$store.state.shop.enterprise)
						console.log(this.$store.state.shop.shopIndex)
						console.log(this.$store.state.shop.merchantCredential)
					}
				})
			},
			// 上传证件照
			upload(index, type) {
				uni.chooseImage({
					count: 1,
					success: res => {
						let file = res.tempFilePaths[0];
						uni.getFileInfo({
							filePath: file,
							success: (res) => {
								if (res.size < 5000 || res.size > 1048576) {
									uni.showToast({
										title: '请上传5k - 1M的图片'
									})
								} else {
									uni.uploadFile({
										url: `${this.$store.state.baseUrl}/upload/?serviceType=user`,
										filePath: file,
										fileType: 'image',
										name: ' file',
										success: res => {
											if (res.statusCode.toString().startsWith(2)) {
												let url = JSON.parse(res.data).data;
												this.imgArr[index][type] = url;
											} else {
												uni.showToast({
													title: `抱歉，错误${res.statusCode}，图片上传失败，请稍后再试`,
													duration: 2500,
													icon: 'none'
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
			// 选择起始日期
			startDateChange($event) {
				this.legalPersonFrom.idCardStartDate = $event.detail.value;
			},
			// 选择结束日期
			stopDateChange($event) {
				this.legalPersonFrom.idCardEndDate = $event.detail.value;
			},
			clickURl(url) {
				this.next(true)
				uni.redirectTo({
					url
				})
			},
			bindTypeChange($event) {
				this.legalPersonFrom.IDlabel = this.IDArr[$event.detail.value].label;
				this.legalPersonFrom.IDIndex = $event.detail.value;
				this.legalPersonFrom.isIDLong = this.IDArr[$event.detail.value].key;
			},
			next(ifnext) {
				let {
					legalPersonFrom,
					imgArr,
					merchantCredential,
					IDArr
				} = this;
				let data = {
					...legalPersonFrom,
					corporateIdValidType: 1,
					corporateIdExpDate: legalPersonFrom.idCardEndDate || legalPersonFrom.corporateIdExpDate,

					cardName: legalPersonFrom.corporateName || legalPersonFrom.cardName,
					contactName: legalPersonFrom.corporateName || legalPersonFrom.contactName,
					customerName: legalPersonFrom.corporateName || legalPersonFrom.customerName,

					contactIdNo: legalPersonFrom.corporateIdNo || legalPersonFrom.contactIdNo,
					idNo: legalPersonFrom.corporateIdNo || legalPersonFrom.idNo,

					contactTel: legalPersonFrom.corporateTel || legalPersonFrom.contactTel
				}
				console.log(data)
				if (data.isIDLong) {
					data.idCardEndDate = '20991231'
					data.corporateIdExpDate = '长期'
					data.corporateIdValidType = 2
				}

				// console.log(data)
				for (let i in data) {
					if (data[i] === '') {
						wx.showToast({
							title: '请填写完整所有信息',
							icon: 'none',
							duration: 2500
						})
						return;
					}
				}
				for (let i of imgArr) {
					if (!i.credentialUrl) {
						wx.showToast({
							title: '请上传相应证件',
							icon: 'none',
							duration: 2500
						})
						return;
					}
				}

				for (let i of imgArr) {
					for (let j of merchantCredential) {
						if (i.credentialType === j.credentialType) {
							j.credentialUrl = i.credentialUrl;
						}
					}
				}

				// console.log(merchantCredential)
				// console.log(data)
				this.$store.commit('SETLEGALPERSON', data);
				this.$store.commit('SETMERCHANTCREDENTIAL', merchantCredential);
				if (!ifnext) {
					uni.redirectTo({
						url: "/businessPages/wxBusinessApply/index2"
					})
				}

			}
		},
		onLoad(res) {
			console.log(res)
			// legalPersonFrom
			if (!this.legalPersonFrom.contactTel) {
				this.legalPersonFrom.contactTel = this.userInfo.username
			}

			if (res.shopCenter) {
				this.initJinjian()
			}
		},
		created() {
			// this.initJinjian()
		}
	}
</script>

<style lang="scss" scoped>
	.container {
		padding-bottom: 130rpx;
		box-sizing: border-box;
		min-height: 100vh;
		height: auto;
	}

	.top {
		padding: 50rpx 0;
		background: #fff;
		border-top: 2rpx solid #D3D3D3;
	}

	.step {
		width: 590rpx;
		margin: 0 auto;
		justify-content: flex-start;
		line-height: 50rpx;
		color: #999999;

		.line {
			height: 90rpx;
			vertical-align: center;
		}

		.step-item {
			flex-direction: column;

			.num {
				width: 90rpx;
				height: 90rpx;
				border: 2rpx solid #999999;
				border-radius: 50%;
				background: #fff;
			}
		}

		.active {
			color: #FF9D11;

			.num {
				border: 2rpx solid #FF9D11;
				background: #FF9D11;
				color: #fff;
			}
		}
	}

	.info {
		line-height: 28rpx;

		.title {
			color: #999999;
			padding: 20rpx;
		}

		.main {
			.item {
				justify-content: flex-start;
				background: #fff;
				padding: 30rpx 20rpx;
				// height: 100rpx;
				border-bottom: 2rpx solid #D3D3D3;

				.item-name {
					color: #999999;
					width: 20%;
				}

				.item-content {
					justify-content: flex-start;
					color: #333;
					width: 80%;

					input {
						width: 90%;
						padding: 0;
						font-size: 28rpx;
						line-height: 28rpx;
						color: #333;
					}

					image {
						width: 24rpx;
						display: block;
					}

					.line {
						color: #999;
						margin: 0 10rpx;
					}

					.date {
						color: #CBCBCB;
					}

					.active {
						color: #333;
					}

					.upload {
						flex-direction: column;
						color: #CBCBCB;
						margin-right: 30rpx;
						line-height: 24rpx;

						.frame {
							width: 120rpx;
							height: 120rpx;
							border: 2rpx dashed #CBCBCB;
							margin-bottom: 10rpx;
						}

						.uploadPic {
							width: 120rpx;
							height: 120rpx;
							margin-bottom: 10rpx;

							image {
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

	.btn {
		width: 670rpx;
		height: 38px;
		border-radius: 19px;
		background: #FF9D11;
		color: #fff;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 30rpx;
		z-index: 99;
	}
</style>

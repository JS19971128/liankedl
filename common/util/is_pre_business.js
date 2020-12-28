function isprebusiness(_this) {
	var userInfoId = _this.$store.state.userInfo.id
	_this.$fly.get(`/user/getOldShopper?userId=${userInfoId}`).then(res => {
		if (res.data.oldshopper) {
			return true
		} else {
			return false
		}
	}).catch(err => {
		
	})
}
//暂时没用
function queryMerchantEntryByUserId(_this){
	return
	// var userInfoId = _this.$store.state.userInfo.id
	// _this.$fly.get(`/queryMerchantEntryByUserId?${userInfoId}`).then(res => {
	// 	console.log(res,'queryMerchantEntryByUserId')
	// }).catch(err => {
	// 	console.log(err, '获取老商家失败')
	// })
}
export {
	isprebusiness,queryMerchantEntryByUserId
}

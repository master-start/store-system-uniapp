/**
 * uni-app上拉加载和下拉刷新混合(支持搜索功能)
 * @author maybe
 */

export default {
	data() {
		return {
			loading: false, // 是否加载数据
			finished: false, // 是否加载完成
			list: [], // 数据列表
			page: 0, // 由于分页一般页面要+1，所以为了方便分页查询，这里初始设置页码为0
			size: 10, // 每页显示的条数
			total: 0, // 数据总条数
			search: {}, // 搜索对象
			tempSearch: {} // 提供给混合初始化搜索对象
		};
	},
	async onLoad() {
		// 拷贝搜索初始化对象属性和数据
		this.tempSearch = _deepClone(this.search);
		console.log(this.tempSearch)
		// 查询列表
		await this._getListFactory();
	},
	// 下拉刷新
	async onPullDownRefresh() {
		console.log('下拉刷新');
		this._initPageData();
		this._resetSearch();
		await this._getListFactory();
		uni.stopPullDownRefresh();
	},
	// 上拉加载
	async onReachBottom() {
		console.log('上拉加载');
		this._getListFactory();
	},
	// 所有混合的方法均已'_'开头
	methods: {
		async _searchData() {
			this._initPageData();
			await this._getListFactory();
		},
		// 重置搜索
		_resetSearch() {
			this.search = _deepClone(this.tempSearch)
			// console.log('重置搜索完成', this.search)
		},
		// 初始化页面的数据
		_initPageData(size) {
			this.finished = false;
			this.page = 0;
			this.list = [];
			this.size = size || 10;
			this.total = 0;
		},
		async _getListFactory() {
			// 如果已经全部加载完成直接终止执行
			if (this.finished) return;
			this.loading = true;
			this.page++;
			await this._getList();
			this.loading = false;
			// 判断是否全部加载完成
			if (this.list.length == this.total) {
				this.finished = true;
			}
		},
		// 数据请求方法需要在页面内重写
		async _getList() {}
	}
}
// 深拷贝
const _deepClone = (source) => {
	let target;
	if (typeof source === 'object') {
		target = Array.isArray(source) ? [] : {}
		for (let key in source) {
			if (source.hasOwnProperty(key)) {
				if (typeof source[key] !== 'object') {
					target[key] = source[key]
				} else {
					target[key] = _deepClone(source[key])
				}
			}
		}
	} else {
		target = source
	}
	return target
};

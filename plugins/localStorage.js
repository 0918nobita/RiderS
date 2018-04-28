import createPersistedState from 'vuex-persistedstate';

export default ({store}) => {
	createPersistedState({
		key: 'net.zero918nobita.Rider-S'
	})(store)
}

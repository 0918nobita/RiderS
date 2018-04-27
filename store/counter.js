export const state = () => ({
	count: 0
});

// 状態を変更する処理は mutation として export する
export const mutations = {
	// カウンタの値を 1 増加させる
	updateCounter(state) {
		state.count ++;
	}
};

// 実際に各コンポーネントから呼び出す処理を action として export する
export const actions = {
	updateCounter(context) {
		// コミットすることで状態変更が反映される
		context.commit('updateCounter');
	}
};

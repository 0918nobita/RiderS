export const state = () => ({
    count: 0,
});

export const mutations = {
    add (state) {
        state.count ++;
    }
};

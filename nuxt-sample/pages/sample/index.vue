<template>
    <section class='container'>
        <div>
            <h1>サンプルページ</h1>
            <p>count = {{count}}</p>
            <button @click='addCount'>カウントアップ</button>
        </div>
    </section>
</template>

<script>
export default {
    computed: {
        count () {
            return this.$store.state.counter.count;
        }
    },
    methods: {
        addCount (e) {
            this.$store.commit('counter/add');
        }
    }
};
</script>


<template>
    <section class='container'>
        <div>
            <h1>サンプルページ</h1>
        </div>
    </section>
</template>

<script>
export default {}

const task = new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
        /*success*/ (position) => {
            console.log('latitude: ' + position.coords.latitude);
            console.log('longitude: ' + position.coords.longitude);
            resolve();
        },
        /*error*/ (error) => {
            console.log('位置情報の取得に失敗しました');
            reject();
        }
    );
});

task.then();
</script>

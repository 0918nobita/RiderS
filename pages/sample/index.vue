<template>
    <section class='container'>
        <div>
            <h1>サンプルページ</h1>
        </div>
    </section>
</template>

<script>
import config from '~/assets/config';
import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

export default {
    mounted: function() {
        this.$nextTick(function() {
            async function main() {
                const success = async (position) => {
                    await reverse_geocoding(position.coords.latitude, position.coords.longitude);
                },
                error = (e) => {
                    console.log('位置情報の取得に失敗しました。');
                };

                navigator.geolocation.getCurrentPosition(success, error);

                async function reverse_geocoding(latitude, longitude) {
                    await axios.get(GEOCODE_ENDPOINT, {params: {
                        latlng: latitude + ', ' + longitude,
                        key: config.key,
                        language: 'ja',
                    }}).then(result => {
                        console.log(result.data.results[0].formatted_address);
                    });
                }
            }

            main();
        })
    },
};
</script>

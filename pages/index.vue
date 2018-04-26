<template>
  <section class="container">
    <div>
      <p id="alpha"></p>
      <p id="beta"></p>
      <p id="gamma"></p>
      <p id="latitude"></p>
      <p id="longitude"></p>
      <p id="address"></p>
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
        	const alpha = document.getElementById('alpha'),
        		beta = document.getElementById('beta'),
        		gamma = document.getElementById('gamma'),
        		latitude = document.getElementById('latitude'),
        		longitude = document.getElementById('longitude'),
        		address = document.getElementById('address');

        	window.addEventListener('deviceorientation', (e) => {
        		alpha.textContent = 'alpha: ' + e.alpha;
        		beta.textContent = 'beta: ' + e.beta;
        		gamma.textContent = 'gamma: ' + e.gamma;
        	});

            async function main() {
                const success = async (position) => {
                	latitude.textContent = '緯度: ' + position.coords.latitude;
                	longitude.textContent = '経度: ' + position.coords.longitude;
                    await reverse_geocoding(position.coords.latitude, position.coords.longitude);
                },
                error = (e) => {
                    address.textContent = '緯度、経度の取得に失敗しました。';
                };

                navigator.geolocation.getCurrentPosition(success, error);

                async function reverse_geocoding(latitude, longitude) {
                    await axios.get(GEOCODE_ENDPOINT, {params: {
                        latlng: latitude + ', ' + longitude,
                        key: config.key,
                        language: 'ja',
                    }}).then(result => {
                    	address.textContent = result.data.results[0].formatted_address;
                    }).catch(() => {
                        address.textContent = '番地、住所の取得に失敗しました。インターネット接続をご確認ください。';
                    });
                }
            }

            main();
        })
    },
};
</script>

<style>
</style>

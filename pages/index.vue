<template>
  <section class="container">
    <div>
      <div id="console">
        <p id="alpha"></p>
        <p id="beta"></p>
        <p id="gamma"></p>
        <p id="latitude"></p>
        <p id="longitude"></p>
        <p id="address"></p>
        <p>起動回数: {{count}} 回</p>
      </div>
      <div id="map"></div>
    </div>
  </section>
</template>

<script>
import config from '~/assets/config';
import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

export default {
    head: {
        script: [
            { src: 'https://maps.googleapis.com/maps/api/js?key=' + config.key }
        ]
    },
    computed: {
        count () {
            this.$store.commit('counter/add');
            return this.$store.state.counter.count;
        }
    },
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
                        showMap(latitude, longitude);
                    }).catch(() => {
                        address.textContent = '番地、住所の取得に失敗しました。インターネット接続をご確認ください。';
                    });
                }

                async function showMap(latitude, longitude) {
                    const position = {lat: latitude, lng: longitude};
                    const map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 18,
                        center: position
                    });
                    const marker = new google.maps.Marker({
                        position: position,
                        map: map,
                        title: 'コ↑コ↓'
                    });
                }
            }

            main();
        })
    },
};
</script>

<style scoped lang="sass">
html, body
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;

#console
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;

#map
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
</style>

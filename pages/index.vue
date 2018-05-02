<template>
  <section class="container">
    <div>
      <topBar/>
      <div id="map"></div>
      <div id="output">
          <textarea></textarea>
      </div>
    </div>
  </section>
</template>

<script>
import TopBar from '~/components/TopBar.vue';
import config from '~/assets/config';
import axios from 'axios';

const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

export default {
    head: {
        script: [
            { src: 'https://maps.googleapis.com/maps/api/js?key=' + config.google }
        ]
    },
    components: {
        TopBar
    },
    mounted: function() {
        this.$store.dispatch('counter/updateCounter');

        this.$nextTick(function() {
        	const output = document.getElementById('output');
            
            output.value += '起動回数: ' + this.$store.state.counter.count + ' 回¥n';

            async function main() {
                const success = async (position) => {
                	output.value += '緯度: ' + position.coords.latitude + '¥n';
                	output.value += '経度: ' + position.coords.longitude + '¥n';
                    await reverse_geocoding(position.coords.latitude, position.coords.longitude);
                },
                error = (e) => {
                    address.textContent = '緯度、経度の取得に失敗しました。';
                    output.value += '緯度、軽度の取得に失敗しました。¥n';
                };

                navigator.geolocation.getCurrentPosition(success, error);

                async function reverse_geocoding(latitude, longitude) {
                    await axios.get(GEOCODE_ENDPOINT, {params: {
                        latlng: latitude + ', ' + longitude,
                        key: config.google,
                        language: 'ja',
                    }}).then(result => {
                    	output.value += result.data.results[0].formatted_address + '¥n';
                        showMap(latitude, longitude);
                    }).catch(() => {
                        address.textContent = '番地、住所の取得に失敗しました。インターネット接続をご確認ください。';
                        output.value += '番地、住所の取得に失敗しました。インターネット接続をご確認ください。¥n';
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
                    const coordinates = [
                        new google.maps.LatLng(34.97985540888427, 135.96275437115062),
                        new google.maps.LatLng(34.98017567359328, 135.96473609566365),
                    ];
                    const polyline = new google.maps.Polyline({
                        path: coordinates,
                        geodesic: true,
                        strokeColor: '#ff0000',
                        strokeOpacity: 1.0,
                        strokeWeight: 2,
                        map: map
                    });
                    strava();
                }

                async function strava() {
                    await axios.get("https://www.strava.com/api/v3/activities/", {params: {
                            id: "1484749096",
                            access_token: config.strava
                    }}).then(result => {
                        console.log(result);
                        output.value += result + '¥n';
                    }).catch(() => {
                        console.log("Strava との連携に失敗しました");
                        output.value += result + '¥n';
                    });
                }
            }

            main();
        })
    },
};
</script>

<style scoped lang="scss">
html, body {
    padding: 0;
    margin: 0;
    width: 100vw;
    height: 100vh;
}

#console {
    position: absolute;
    top: 50px;
    left: 0;
    z-index: 1;
}

#map {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 0;
}

#output {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100vw;
    height: 200px;
    textarea {
        width: 100%;
        height: 100%;
        resize: none;
    }
}
</style>

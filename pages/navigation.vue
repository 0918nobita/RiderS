<template>
  <section class="container">
    <div>
      <div id="map"></div>
      <div id="output">
        <textarea id="textarea" readonly></textarea>
      </div>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '~/assets/config';

const GEOCODE_ENDPOINT   = 'https://maps.googleapis.com/maps/api/geocode/json',
      DIRECTION_ENDPOINT = 'https://maps.googleapis.com/maps/api/directions/json';

export default {
  head: {
    script: [
      { src: 'https://maps.googleapis.com/maps/api/js?key=' + config.google }
    ]
  },
  mounted: function() {
    this.$nextTick(function() {
      const textarea = document.getElementById('textarea');

      speechSynthesis.onvoiceschanged = function() {
        const voices = speechSynthesis.getVoices().filter((item) => {
          return (item.lang === 'ja-JP');
        });

        if (voices.length > 0 && localStorage.getItem('strava') !== null) {
          const synthes = new SpeechSynthesisUtterance();
          synthes.voice = voices[0];
          synthes.text = 'ライダーズ、起動しました';
          speechSynthesis.speak(synthes);
        }
      };

      navigator.geolocation.getCurrentPosition(
        /* Success */ async (position) => {
          textarea.value += '緯度: ' + position.coords.latitude + '\n';
          textarea.value += '経度: ' + position.coords.longitude + '\n';
          await reverse_geocoding(position.coords.latitude, position.coords.longitude);
        },
        /* Failed */ e => {
          textarea.value += '緯度、軽度の取得に失敗しました。\n';
        }
      );

      async function reverse_geocoding(latitude, longitude) {
        await axios.get(GEOCODE_ENDPOINT, {params: {
          latlng: latitude + ', ' + longitude,
          key: config.google,
          language: 'ja',
        }}).then(result => {
          console.log(result.data);
          textarea.value += result.data.results[0].formatted_address + '\n';
          showMap(latitude, longitude);
        }).catch(err => {
          console.log(err);
          textarea.value += '番地、住所の取得に失敗しました。インターネット接続をご確認ください。\n';
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
        
        await axios.get(DIRECTION_ENDPOINT, {params: {
          place_id: 'ChIJ685WIFYViEgRHlHvBbiD5nE',
          destination: 'place_id:ChIJA01I-8YVhkgRGJb0fW4UX7Y'
        }}).then(result => { 
          console.log(result);
        }).catch(() => {
          console.log('ルート探索に失敗しました');
        });
      }
    });
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

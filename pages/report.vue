<template>
  <section class="container">
    <div>
      <p>緯度: {{ latitude }}</p>
      <p>経度: {{ longitude }}</p>
      <p>精度: {{ accuracy }}</p>
      <p>速度: {{ speed }}</p>
      <p>部室からの距離: {{ distance }}</p>
      <button id="record">記録！</button>
      <p>状態: {{ state }}</p>
    </div>
  </section>
</template>

<script>
import config from '~/assets/config';
const firebase = require('firebase');
require('firebase/firestore');

export default {
  data () {
    return {
      latitude: '',
      longitude: '',
      accuracy: '',
      speed: '',
      distance: '',
      state: ''
    };
  },
  mounted: function() {
    this.$nextTick(() => {
      firebase.initializeApp(config.firebase);

      const db = firebase.firestore();
      db.settings({ timestampsInSnapshots: true });

      const watchID = navigator.geolocation.watchPosition(position => {
        this.$data.latitude = position.coords.latitude;
        this.$data.longitude = position.coords.longitude;
        this.$data.accuracy = position.coords.accuracy;
        this.$data.speed = position.coords.speed;
        this.$data.distance = distance(this.$data.latitude, this.$data.longitude, 34.980178, 135.964737);
      });

      document.getElementById('record').addEventListener('click', () => {
        db.collection('point').add({
          latitude: this.$data.latitude,
          longitude: this.$data.longitude,
          description: 'Generated by front-end'
        }).then(docRef => console.log('Success: ', docRef.id))
          .catch(error => console.error('Error: ', error));
      });
    });

    function distance(lat1, lon1, lat2, lon2) {
      // 緯度経度をラジアンに変換
      const deg2rad = deg => deg * Math.PI / 180;
      const radLat1 = deg2rad(lat1); // 緯度１
      const radLon1 = deg2rad(lon1); // 経度１
      const radLat2 = deg2rad(lat2); // 緯度２
      const radLon2 = deg2rad(lon2); // 経度２

      const r = 6378137.0; // 赤道半径

      const averageLat = (radLat1 - radLat2) / 2;
      const averageLon = (radLon1 - radLon2) / 2;
      return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(averageLat), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(averageLon), 2)));
    }
  }
}
</script>

<style lang="scss">
</style>

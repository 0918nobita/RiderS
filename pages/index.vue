<template>
  <section class="container">
    <div>
      <div id="title">Rider-S</div>
      <div id="content">
        <p>{{ message }}</p>
        <p>Powered by Strava</p>
      </div>
      <router-link to="/navigation" id="start_button" v-if="showButton">Start</router-link>
    </div>
  </section>
</template>

<script>
import config from '~/assets/config';

export default {
  data () {
    return {
      message: '',
      showButton: false
    };
  },
  mounted () {
    this.$nextTick(function() {
      let message = 'Error';
      if (localStorage.getItem('strava_code') === null) {
        message = 'コードを取得できていません';
        window.open(config.url + '/strava_settings', 'Strava連携');
      } else if (localStorage.getItem('strava_access_token') === null) {
        message = 'アクセストークンを取得できていません';
      } else {
        message = 'Success';
        this.$data.showButton = true;
      }
      this.$data.message = message;
    });
  }
};
</script>

<style lang="scss">
#start_button {
  display: block;
  position: fixed;
  width: 150px;
  height: 150px;
  line-height: 150px;
  font-size: 20px;
  text-decoration: none;
  text-align: center;
  color: white;
  background: #008DDD;
  border-radius: 50%;
  left: calc(50% - 50px / 2);
  bottom: 20px;
}
</style>

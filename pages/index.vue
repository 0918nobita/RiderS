<template>
  <section class="container">
    <div>
      <topBar/>
      <div id="content">
        <!--<p>{{ message }}</p>-->
        <p>Powered by Strava</p>
      </div>
      <router-link to="/report" id="start_button" v-if="showButton">Start</router-link>
    </div>
  </section>
</template>

<script>
import axios from 'axios';
import config from '~/assets/config';
import TopBar from '~/components/TopBar.vue';

export default {
  data () {
    return {
      /**message: '',*/
      showButton: /* false */ true
    };
  },
  components: {
    TopBar
  },
  mounted () {
    this.$nextTick(function() {
      /*let message = 'Error';
      if (localStorage.getItem('strava_code') === null) {
        message = 'コードを取得できていません';
        location.href = 'http://www.strava.com/oauth/authorize?' +
          'client_id=' + config.strava.client_id +
          '&redirect_uri=' + config.strava.redirect_uri +
          '&response_type=code&scope=public';
      } else if (localStorage.getItem('strava_access_token') === null) {
        message = 'アクセストークンを取得できていません';
        const params = new URLSearchParams();
              params.append('client_id', config.strava.client_id);
              params.append('client_secret', config.strava.client_secret);
              params.append('code', localStorage.getItem('strava_code'));
        
        axios.post('https://www.strava.com/oauth/token', params)
          .then(response => {
            localStorage.setItem('strava_access_token', response.data.access_token);
          })
          .catch(error => {
            console.log(error);
          });
      } else {
        message = 'Success';
        this.$data.showButton = true;
      }
      this.$data.message = message;*/
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

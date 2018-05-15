<template>
  <div>
    <p>Redirecting..</p>
  </div>
</template>

<script>
import axios from 'axios';
import config from '~/assets/config';

export default {
  mounted () {
    this.$nextTick(function() {
      if (localStorage.getItem('strava_code') === null) {
        location.href = 'http://www.strava.com/oauth/authorize?' +
          'client_id=' + config.strava.client_id +
          '&redirect_uri=' + config.strava.redirect_uri +
          '&response_type=code&scope=public';
      } else if (localStorage.getItem('strava_access_token') === null) {
        
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
      }
    });
  }
};
</script>

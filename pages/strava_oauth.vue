<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>

<script>
import config from '~/assets/config';

export default {
  mounted() {
    this.$nextTick(function() {
      localStorage.setItem('strava_code', this.$route.query.code);
      location.href = config.url + '/strava_settings';
    });
  }
};
</script>

<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>

<script>
import config from '~/assets/config';

export default {
  mounted() {
    localStorage.setItem('strava', this.$route.query.code);
    location.href = config.url + '/navigation';
  }
};
</script>


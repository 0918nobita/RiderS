<template>
  <div>
    <p>Redirecting...</p>
  </div>
</template>

<script>
import config from '~/assets/config';

export default {
  data: function() {
    return {
      code: 'default'
    }
  },
  asyncData(context) {
    return {
      code: context.query['code']
    }
  },
  mounted: function() {
    localStorage.setItem('strava', this.$data.code);
    location.href = config.url + '/navigation';
  }
};
</script>


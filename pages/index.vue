<template>
  <section class="container">
    <div>
      <div id="title">Rider-S</div>
      <router-link to="/navigation" id="start_button">Start</router-link>
    </div>
  </section>
</template>

<script>
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

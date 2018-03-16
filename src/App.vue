<template>
  <div id="app">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  /* #app {} */
  .content-container {
    margin-top: 20px;
  }
</style>

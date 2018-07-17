<template>
  <div id="app">
    <header>
      <Navigation></Navigation>
    </header>
    <div class="container section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navigation from './components/Navigation'
export default {
  name: 'app',
  components: { Navigation }
}
</script>

<style>

</style>

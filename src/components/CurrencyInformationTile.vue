<template>
  <div class="box">
    <!-- Bulma Level Block : Currency Price Tile -->  
    <div class="level is-mobile">
      <div class="level-left">
        <div class="level-item">
          <span class="heading">{{ item.date }}</span>
        </div>
      </div>
      <div class="level-right">
        <div class="level-item">
          <span class="heading">{{ item.sym }}</span>
        </div>
      </div>
    </div>
    <div class="has-text-centered">
      <p class="heading">1 {{ item.crypto }}</p>
      <p :class="[item.change == 1 ? 'has-text-primary' :
                 item.change == 2 ? 'has-text-danger': '',
                 'subtitle' ]">${{ item.price }}</p>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  props: ['item']
}
</script>

<style scoped>

</style>
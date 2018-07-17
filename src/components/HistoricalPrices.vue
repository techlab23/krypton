<template>
<div class="columns is-mobile is-multiline">
    <div class="column is-12">
      <!-- Bulma Hero Block : Historical Price -->  
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Historical Prices</h1>
            <div class="tags">
              <span class="tag">{{ $route.params.currency }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="column is-half-mobile" v-for="item in historical">
        <CurrencyInformationTile :item="item"></CurrencyInformationTile>
    </div>

    <div class="column" v-if="historical.length === 0">
      <div class="box has-text-centered">
        <p class="subtitle">Data is not yet available</p>
      </div>
    </div>
    
  </div>
</template>

<script>
/* eslint-disable */
import CurrencyInformationTile from './CurrencyInformationTile'
export default {
  components: { CurrencyInformationTile },
  data () {
    return {
      historical: []
    }
  },
  created () {
    this.historical = this.$ls.get(this.$route.params.currency, [])
  }
}
</script>

<style scoped>
  .tags {
    justify-content: center;
  }
</style>
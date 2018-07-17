<template>
  <div class="columns is-mobile is-multiline">
    <div class="column is-12">
      <!-- Bulma Hero Block : Current Price -->  
      <section class="hero is-warning">
        <div class="hero-body">
          <div class="container has-text-centered">
            <h1 class="title">Current Prices</h1>
            <div class="tags">
              <span class="tag" v-for="item in trackCryptos">{{ item }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <div class="column is-half-mobile" v-for="item in current">
      <router-link :to="{ name: 'HistoricalPrices', params: { currency: item.crypto } }">
        <CurrencyInformationTile :item="item"></CurrencyInformationTile>
      </router-link>
    </div>

    <LoadingIndicator v-if="loading"></LoadingIndicator>

    <div class="column" v-if="!loading && current.length === 0">
      <div class="box has-text-centered">
        <p class="subtitle">Data is not yet available</p>
      </div>
    </div>

  </div>
</template>

<script>
/* eslint-disable */
import _ from 'underscore'
import LoadingIndicator from './LoadingIndicator'
import CurrencyInformationTile from './CurrencyInformationTile'
export default {
  components: { CurrencyInformationTile, LoadingIndicator },
  data () {
    return {
      current: [],
      trackCryptos: ['BTC', 'ETH', 'LTC'],
      loading: true
    }
  },
  computed: {
    subscriptions () {
      return this.trackCryptos.map(m => '5~CCCAGG~'+ m +'~USD')
    }
  },
  created () {
    if (navigator.onLine) {
      this.fetchCurrentPrices()
      this.fetchHistoricalPrices()
      this.subscribe()
      this.startListening()
    }
    else {
      this.current = this.$ls.get('current', [])
      this.loading = false
    }
  },
  beforeDestroy () {
    this.unsubscribe()
  },
  methods: {
    subscribe () {      
      this.$socket.emit('SubAdd', {subs: this.subscriptions})
    },
    unsubscribe () {
      this.$socket.emit('SubRemove', {subs: this.subscriptions})
    },
    startListening () {
      this.$socket.on('m', data => {
        const info = data.split('~')
        const currency = info[2]
        const change = info[4]
        const price = info[5]

        if(change == 1 || change == 2) {
          const item = this.current.find(m => m.crypto == currency)
          if(item) {
            item.price = price
            item.change = change
            this.$ls.set('current', this.current)
          }
        }
      })
    },
    fetchCurrentPrices () {
      const API_URL = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=' + this.trackCryptos.join(',') + '&tsyms=USD'
      this.loading = true
      this.axios.get(API_URL)
      .then(response => {
        this.current = _.map(response.data, (value, key) => {
          return { crypto: key, price: value.USD, sym: 'USD' }
        })
        this.$ls.set('current', this.current)
        this.loading = false
      })
    },
    fetchHistoricalPrices () {
      const NUM_OF_DAYS = 10
      this.loading = true
      this.trackCryptos.forEach(currency => {
        const API_URL = 'https://min-api.cryptocompare.com/data/histoday?fsym='
                        + currency +'&tsym=USD&limit=' + (NUM_OF_DAYS-1)
        this.axios.get(API_URL)
        .then(response => {
          let transformedData = _.map(response.data.Data, value => {
            return { crypto: currency, sym: 'USD', price: value.close, 
                     date: this.$moment.unix(value.time).format('DD/MM/YYYY') }
          })
          let sortedData = _.sortBy(transformedData, value => - new Date(value.date))
          this.$ls.set(currency, sortedData)
          this.loading = false
        })
      })
    }
  }
}
</script>

<style scoped>
.tags {
  justify-content: center
}
</style>
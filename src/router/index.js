import Vue from 'vue'
import Router from 'vue-router'
import CurrentPrices from '@/components/CurrentPrices'
import HistoricalPrices from '@/components/HistoricalPrices'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'CurrentPrices',
      component: CurrentPrices
    },
    {
      path: '/historical/:currency',
      name: 'HistoricalPrices',
      component: HistoricalPrices
    }
  ]
})

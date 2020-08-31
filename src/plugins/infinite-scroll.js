import Vue from 'vue'
import infiniteScroll from 'vue-infinite-scroll'

export default () => {
  Vue.directive('infinite-scroll', infiniteScroll)
}

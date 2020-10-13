import api from '@/data-sources/api'

export default ({ $axios }, inject) => {
  inject('api', api($axios))
}

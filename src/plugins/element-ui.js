import Vue from 'vue'
import '@/assets/styles/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import { Select, Option, Input, Loading } from 'element-ui'

export default () => {
  locale.use(lang)
  Vue.use(Select)
  Vue.use(Option)
  Vue.use(Input)

  Vue.prototype.$loading = Loading.service
  Vue.prototype.$notify = Notification
}

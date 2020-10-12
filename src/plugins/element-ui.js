import Vue from 'vue'
import '@/assets/styles/element-variables.scss'
import lang from 'element-ui/lib/locale/lang/pt-br'
import locale from 'element-ui/lib/locale'

import { Select, Button, Option, Input, Loading, Notification } from 'element-ui'

// Defina o idioma para português
locale.use(lang)
// Registre globalmente os componentes, diretiva e serviços usados no site
Vue.use(Select)
Vue.use(Option)
Vue.use(Input)
Vue.use(Button)

Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service
Vue.prototype.$notify = Notification

import Vue from 'vue'
import Element from 'element-ui'
import './element-variables.scss'
import locale from 'element-ui/lib/locale/lang/en'

export default () => {
  Vue.use(Element, { locale })
}

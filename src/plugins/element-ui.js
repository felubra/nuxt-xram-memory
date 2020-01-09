import Vue from 'vue'
import './element-variables.scss'

import { Notification } from 'element-ui'
export default () => {
  Vue.prototype.$notify = Notification
}

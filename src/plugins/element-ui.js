import Vue from 'vue'
import './element-variables.scss'

import {
  Input,
  Button,
  Form,
  FormItem,
  Notification,
  Alert,
  Image
} from 'element-ui'
export default () => {
  Vue.use(Image)
  Vue.use(Input)
  Vue.use(Alert)
  Vue.use(Button)
  Vue.use(Form)
  Vue.use(FormItem)

  Vue.prototype.$notify = Notification
}

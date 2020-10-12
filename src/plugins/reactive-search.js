import Vue from 'vue'
import {
  ReactiveBase,
  DataSearch,
  MultiDropdownList,
  SingleDropdownList,
  SelectedFilters,
  ReactiveComponent,
  ReactiveList
} from '@appbaseio/reactivesearch-vue'

export default () => {
  const components = [
    ReactiveBase,
    DataSearch,
    MultiDropdownList,
    SingleDropdownList,
    SelectedFilters,
    ReactiveComponent,
    ReactiveList
  ]

  components.map(function(component) {
    Vue.use(component)
    return null
  })
}

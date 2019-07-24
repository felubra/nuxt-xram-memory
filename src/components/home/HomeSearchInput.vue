<template>
  <!-- eslint-disable -->
  <DataSearch
    v-inner-input-focus
    class="SearchBar"
    component-id="text"
    :field-weights="[10,7]"
    :data-field="['title', 'teaser']"
    icon-position="right"
    :autosuggest="false"
    placeholder="Pesquisar no acervo"
    :show-clear="false"
    :debounce="250"
    fuzziness="AUTO"
    :inner-class="{
            input: 'SearchBar__Input'
          }"
    filter-label="Texto"
    v-active-filter-animation="'text'"
    v-bind="$attrs"
    v-on="$listeners"
  />
  <!-- eslint-enable -->
</template>
<script>
import { activeFilterAnimation } from './SearchFilters'
import { innerInputFocus } from '~/utils'
export default {
  name: 'HomeSearchInput',
  directives: {
    activeFilterAnimation,
    innerInputFocus
  },
  inheritAttrs: false
}
</script>

<style>
.SearchBar {
  max-width: 730px;
}

.SearchBar__Input {
  background: #fff !important; /* #TODO: este estilo não está pegando */
}
</style>

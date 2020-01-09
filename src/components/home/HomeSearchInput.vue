<template>
  <!-- eslint-disable -->
  <DataSearch
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

<style lang="stylus">
.SearchBar {
  max-width: 730px;
}

.SearchBar input {
  transition: border-color 0.25s ease;
  font-size: 16px;
}

.SearchBar input:focus,
.SearchBar input:hover,
.SearchBar input:active {
  border-color: $link-color;
}

.SearchBar input::placeholder {
  transition: border-color 0.25s ease;
}

.SearchBar input:active::placeholder,
.SearchBar input:hover::placeholder,
.SearchBar input:focus::placeholder {
  color: #333;
}

.SearchBar__Input {
  background: #fff !important; /* #TODO: este estilo não está pegando */
}


.SearchBar--as-filter input {
  border: none;
  border-bottom: solid 1px #e1dada;
  font-size: 18px;
  background: transparent !important;
  border-width: 3px;
  padding-left: 5px;
}

.SearchBar.SearchBar--as-filter input:focus,
.SearchBar.SearchBar--as-filter input:hover,
.SearchBar.SearchBar--as-filter input:active {
   border-color: $link-color-active;
}
</style>

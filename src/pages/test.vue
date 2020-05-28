<template>
  <div>
    <LocalSearchBase index-u-r-l="media/lunr_index/index.json">
      <LocalSearchInput component-id="mainQuery" />
      <LocalSearchDropDown component-id="mainFilter" />
    </LocalSearchBase>
  </div>
</template>

<script>
import LocalSearchBase from '@/components/search/LocalSearchBase'
import LocalSearchInput from '@/components/search/LocalSearchInput'
import LocalSearchDropDown from '@/components/search/LocalSearchDropDown'

export default {
  name: 'TestPage',
  components: {
    LocalSearchBase,
    LocalSearchInput,
    LocalSearchDropDown
  }
}
</script>

<style>
</style>

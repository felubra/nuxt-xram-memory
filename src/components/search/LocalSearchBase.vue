<script>
export default {
  name: 'LocalSearchBase',
  data() {
    return {
      //TODO: indexState: EMPTY,
      //TODO: results: [],
      searchState: {},
      filterState: {}
    }
  },
  methods: {
    searchBy(componentId, value) {
      if (value) {
        this.$set(this.searchState, componentId, value)
      } else {
        this.$delete(this.searchState, componentId)
      }
    },
    filterBy(componentId, value) {
      if (value) {
        this.$set(this.filterState, componentId, value)
      } else {
        this.$delete(this.filterState, componentId)
      }
    }
  },
  provide() {
    return {
      searchBy: this.searchBy,
      filterBy: this.filterBy
    }
  },
  render(h) {
    return h('div', [
      this.$scopedSlots.default({
        text: this.message
      })
    ])
  }
}
</script>

<style>
</style>

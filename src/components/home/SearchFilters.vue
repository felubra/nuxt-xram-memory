<template>
  <div class="FilterList">
    <single-dropdown-list
      v-active-filter-animation="'type'"
      :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'          }"
      :react="{or: ['search', 'newspaper', 'keywords', 'subjects', 'published_year']}"
      :show-filter="true"
      :size="25"
      class-name="FilterList__FilterItem"
      component-id="type"
      data-field="_type"
      filter-label="Tipo"
      placeholder="Todos"
      title="Tipo"
      :u-r-l-params="true"
    />
    <single-dropdown-list
      v-active-filter-animation="'newspaper'"
      :default-query="customFilterQuery"
      :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'            }"
      :react="{or: ['search', 'type', 'keywords', 'subjects', 'published_year']}"
      :show-count="false"
      :show-filter="true"
      :size="25"
      class-name="FilterList__FilterItem"
      component-id="newspaper"
      data-field="newspaper.title"
      filter-label="Site/Veículo"
      nested-field="newspaper"
      placeholder="Todos"
      title="Site/Veículo"
      :u-r-l-params="true"
    />
    <multi-dropdown-list
      v-active-filter-animation="'keywords'"
      :default-query="customFilterQuery"
      :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'                }"
      :react="{or: ['search', 'type', 'newspaper',  'published_year']}"
      :show-count="false"
      :show-filter="true"
      :show-search="true"
      :size="100"
      class-name="FilterList__FilterItem"
      component-id="keywords"
      data-field="keywords.name"
      filter-label="Palavras-chave"
      nested-field="keywords"
      placeholder="Todas"
      title="Palavras-chave"
      :u-r-l-params="true"
    >
      <template slot="renderItem" slot-scope="{ label }">
        <div>{{lowerSlugify(label)}}</div>
      </template>
    </multi-dropdown-list>

    <multi-dropdown-list
      v-active-filter-animation="'subjects'"
      :default-query="customFilterQuery"
      :inner-class="{
              title: 'microtext',
              select: 'FilterItem__DropdownToggle',
              list: 'FilterItem__DropdownList'                }"
      :react="{or: ['search', 'type', 'newspaper',  'published_year']}"
      :show-count="false"
      :show-filter="true"
      :show-search="true"
      :size="100"
      class-name="FilterList__FilterItem"
      component-id="subjects"
      data-field="subjects.name"
      filter-label="Assuntos"
      nested-field="subjects"
      placeholder="Todos"
      title="Assunto"
      :u-r-l-params="true"
    >
      <template slot="renderItem" slot-scope="{ label }">
        <div>{{label}}</div>
      </template>
    </multi-dropdown-list>
    <!--
          <DynamicRangeSlider
            :inner-class="{              title: 'microtext',              slider: 'FilterList__Slider',            }"
            :react="{or: ['search']}"
            class-name="FilterList__FilterItem"
            component-id="published_year"
            data-field="published_year"
            filter-label="Publicado entre"
            title="Publicado entre"
            :URLParams="true"
          />
    -->
  </div>
</template>

<script>
import slugify from 'slugify'

export const activeFilterAnimation = {
  inserted(el, { value }, { context }) {
    if (context.$route && Object.keys(context.$route.query).includes(value)) {
      el.classList.add('FilterList__FilterItem--ActiveFromURL')
    }
  }
}

export default {
  name: 'SearchFilters',
  directives: {
    activeFilterAnimation
  },
  methods: {
    lowerSlugify(keyword) {
      return slugify(keyword.toLowerCase())
    },
    customFilterQuery(value, props) {
      try {
        return {
          query: {
            match_all: {}
          },
          size: 0,
          aggs: {
            reactivesearch_nested: {
              nested: {
                path: props.nestedField
              },
              aggs: {
                [props.dataField]: {
                  terms: {
                    field: props.dataField,
                    size: props.size,
                    order: {
                      _count: 'desc'
                    }
                  }
                }
              }
            }
          }
        }
      } catch {
        return {}
      }
    }
  }
}
</script>
<style lang="stylus">
.FilterList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
}

.FilterList__FilterItem {
  margin: 1rem 0;
  width: 100%;
}

.FilterList__FilterItem > h2 {
  color: #A1A1A1;
}

button.FilterItem__DropdownToggle {
  border: none;
  background: transparent;
  border-bottom: solid 1px #E1DADA;
  border-width: 3px;
}

button.FilterItem__DropdownToggle:focus {
  background: transparent;
  border-color: #d84848;
}

.FilterList__FilterItem:focus-within > h2, .FilterList__FilterItem:focus > h2 {
  color: $link-color;
}

.FilterList__FilterItem--ActiveFromURL button.FilterItem__DropdownToggle, .FilterList__FilterItem--ActiveFromURL input.SearchBar__Input {
  animation: filterActive 2s;
}

.FilterList__Slider .vue-slider-process {
  background-color: #ce5454 !important;
}

.FilterList__Slider .vue-slider-tooltip {
  background: #e4e4e4 !important;
  border-color: #dcdbdb !important;
  padding: 4px 6px !important;
  color: #000 !important;
}

@media only screen and (min-width: 768px) {
  .FilterList {
    display: flex;
    flex-direction: row;
  }

  .FilterList__FilterItem {
    width: auto;
    min-width: 250px;
    margin: 1rem 4rem;
  }
}
</style>

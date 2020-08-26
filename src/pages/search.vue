<template>
  <client-only>
    <LocalSearchBase
      v-slot:default="{searchResults, resultCount, lastSearchTime, isLoading, hasError}"
      class="Page SearchPage"
      :initial-state="initialState"
      :index-u-r-l="$config.lunrIndexUrl"
    >
      <transition
        appear
        name="fade"
        mode="out-in"
      >
        <div v-if="hasError">
          <section class="CenteredPage">
            <header>
              <Microtext
                tag="h2"
                arrow="down"
              >
                Sem dados
              </Microtext>
            </header>
            <main>
              <p>Desculpe-nos, mas a pesquisa não está disponível no momento. Por-favor, volte mais tarde.</p>
            </main>
          </section>
        </div>
        <div
          v-else
          key="loaded"
        >
          <div class="SearchBar">
            <LocalSearchInput
              component-id="query"
              placeholder="Pesquisar no acervo"
            >
              <template v-slot:suffix>
                <i class="material-icons">search</i>
              </template>
            </LocalSearchInput>
          </div>

          <CollapsibleContainer class="Filters">
            <div class="Filter">
              <label for="typeFilter"><Microtext>Tipo</Microtext></label>
              <LocalSearchDropDown
                :label-fn="getLabelForType"
                field-name="type"
                component-id="typeFilter"
              />
            </div>
            <div class="Filter">
              <label for="siteFilter"><Microtext>Site/Veículo</Microtext></label>
              <LocalSearchDropDown
                field-name="newspaper.title"
                component-id="newspaperFilter"
              />
            </div>
            <div class="Filter">
              <label for="keywordsFilter"><Microtext>Palavras-chave</Microtext></label>
              <LocalSearchDropDown
                field-name="keywords"
                component-id="keywordsFilter"
              />
            </div>
            <div class="Filter">
              <label for="subjectsFilter"><Microtext>Assuntos</Microtext></label>
              <LocalSearchDropDown
                field-name="subjects"
                component-id="subjectsFilter"
              />
            </div>
          </CollapsibleContainer>

          <div>
            <ResultStats
              :time="lastSearchTime"
              :total-results="resultCount"
            />
          </div>
          <NewsGrid
            v-loading="isLoading"
            class="NewsGrid"
            :items="searchResults"
            element-loading-text="Carregando..."
            element-loading-background="transparent"
          />
        </div>
      </transition>
    </LocalSearchBase>
  </client-only>
</template>

<script>
import LocalSearchBase from '@/components/search/LocalSearchBase'
import LocalSearchInput from '@/components/search/LocalSearchInput'
import LocalSearchDropDown from '@/components/search/LocalSearchDropDown'
import NewsGrid from '@/components/news/NewsGrid'
import ResultStats from '@/components/home/ResultStats.vue'
import CollapsibleContainer from '@/components/common/CollapsibleContainer'
import { CONTENT_TYPE_LABELS } from '@/config/constants'

export default {
  name: 'TestPage',
  components: {
    LocalSearchBase,
    LocalSearchInput,
    LocalSearchDropDown,
    NewsGrid,
    ResultStats,
    CollapsibleContainer
  },
  asyncData ({ route }) {
    return {
      initialState: {
        filterState: route.query,
        searchState: {
          query: route.query.text
        }
      }
    }
  },
  data () {
    return {
      initialState: {}
    }
  },
  methods: {
    getLabelForType (machineName) {
      try {
        return CONTENT_TYPE_LABELS[machineName]
      } catch {
        return machineName
      }
    }
  }
}
</script>

<style scoped>
.TestPage {
  flex: 1;
  display: flex;
  position: relative;
}

.TestPage > div {
  min-height: 10vh;
  width: 100%;
}
.SearchPage .SearchBar {
  max-width: 53rem;
  margin: 3rem auto 0;
}
.Filters {
  margin-top: 1rem;
}
.Filter {
  margin: 1rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

@media only screen and (min-width: 768px) {
  .Filter {
    width: auto;
    min-width: 250px;
    margin: 1rem 2rem;
  }
}
</style>

<style lang="stylus">
.Filter .el-input__inner,
.SearchPage .SearchBar .el-input__inner {
  border: none;
  background: transparent;
  color: rgb(60, 60, 60);
  border: none;
  border-bottom: 3px solid #e1dada;
  border-radius: 0;
}

.SearchPage .SearchBar .el-input__inner {
  padding: .5rem;
}

.Filter label .microtext {
  color: #a1a1a1;
}

.Filter .el-input.el-input--suffix > input {
  padding-left: .5rem;
}

.Filter div.el-select__tags > input {
  margin-left: .5rem;
}

.Filter:focus-within label .microtext {
  color: $link-color;
}

.Filter .el-input__suffix-inner i {
  color: #a1a1a1 !important;
}

.Filter .el-tag {
  font-size: 14px;
  color: $micro-text-color;
  border-color: $micro-text-color;
}

.Filter .el-tag .el-tag__close {
  color: $text-color;
}

.SearchPage .SearchBar .el-input__inner {
  font-size: 1.2rem;
}

.Filter .el-input__inner::placeholder,
.SearchPage .SearchBar input.el-input__inner::placeholder {
  transition: color 0.25s ease, border-color 0.25s ease;
}
.Filter:focus-within .el-input__inner::placeholder,
.Filter:focus .el-input__inner::placeholder,
.Filter:active .el-input__inner::placeholder,
.Filter:hover .el-input__inner::placeholder,
.SearchPage .SearchBar input.el-input__inner:active::placeholder,
.SearchPage .SearchBar input.el-input__inner:hover::placeholder,
.SearchPage .SearchBar input.el-input__inner:focus::placeholder {
  color: #333;
}

.SearchPage .SearchBar .el-input__inner::placeholder {
  color: #aaa;
}

.Filter .el-input__inner::placeholder {
  padding: 0;
}

.SearchPage .SearchBar i.material-icons {
  color: $link-color;
}

.SearchBar .el-input__inner:focus {
  border-color: $link-color-active;
}
</style>

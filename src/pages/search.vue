<template>
  <client-only>
    <LocalSearchBase
      v-slot:default="{
        searchResults,
        resultCount,
        lastSearchTime,
        isLoading,
        isDownloading,
        isEmpty,
        hasError,
        hasLoaded,
        clear,
      }"
      :order-by="orderedBy"
      class="Page SearchPage"
      :initial-state="initialState"
      :index-u-r-l="indexURL"
      @updateDownloadProgress="updateDownloadProgress"
    >
      <transition
        v-if="!isEmpty"
        appear
        name="fade"
        mode="out-in"
      >
        <!-- 3 estados principais são possíveis nesta página: -->
        <!-- 1o Estado: baixando ou carregando o índice, quando exibiremos o indicador de carregamento.
        TODO: considerar o download do índice como carregamento também
        TODO: abstrair SearchFilters -->
        <div
          v-if="isDownloading || isLoading"
          key="loading"
          v-loading="true"
          :items="searchResults"
          :element-loading-text="isDownloading ? `${downloadProgress}%` : `Carregando...`"
          element-loading-background="transparent"
        />
        <!-- 2o Estado: índice carregado, quando exibiremos os resultados de busca e os filtros. -->
        <div
          v-else-if="hasLoaded"
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
          <div class="ResultStatsAndOrdering">
            <div class="OrderSelector">
              <Microtext arrow="down">
                Ordernar por
              </Microtext>
              <el-select
                v-model="orderedBy"
                value-key="field"
              >
                <el-option
                  v-for="option in availableOrderings"
                  :key="option.field"
                  :value="option"
                  :label="option.title"
                />
              </el-select>
            </div>
            <ResultStats
              :time="lastSearchTime"
              :total-results="resultCount"
            />
          </div>
          <!-- Dentro deste estágio, temos duas possibilidades: -->
          <transition
            name="fade"
            mode="out-in"
          >
            <!-- Substado 1: temos resultados -->
            <NewsGrid
              v-if="resultCount > 0"
              key="hasResults"
              class="NewsGrid"
              :items="searchResults"
            />
            <!-- Substado 2: NÃO temos resultados -->
            <div
              v-else-if="resultCount == 0"
              key="noResults"
              class="NoResults"
            >
              Sua busca não encontrou nenhum resultado.
              <br>
              <el-button @click="clear">
                Tente novamente
              </el-button>
            </div>
          </transition>
        </div>
        <!-- 3o Estado: erro (de download do índice ou de carregamento do índice) -->
        <section
          v-else-if="hasError"
          key="error"
          class="CenteredPage"
        >
          <header>
            <Microtext
              tag="h2"
              arrow="down"
            >
              Erro
            </Microtext>
          </header>
          <main>
            <p>Desculpe-nos, mas a pesquisa não está disponível no momento. Por-favor, volte mais tarde.</p>
          </main>
        </section>
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
import { CONTENT_TYPE_LABELS, AVAILABLE_ORDERINGS } from '@/config/constants'

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
  async asyncData ({ route, $axios, $config }) {
    return {
      indexURL: $config.lunrIndexURL,
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
      indexURL: '',
      downloadProgress: 0,
      initialState: {},
      orderedBy: AVAILABLE_ORDERINGS[0],
      availableOrderings: Object.freeze(AVAILABLE_ORDERINGS)
    }
  },
  methods: {
    getLabelForType (machineName) {
      try {
        return CONTENT_TYPE_LABELS[machineName]
      } catch {
        return machineName
      }
    },
    updateDownloadProgress (percent) {
      this.downloadProgress = percent
    }
  }
}
</script>

<style scoped>
.SearchPage {
  flex-grow: 1;
  padding: 3rem 0 0;
}
.SearchPage .SearchBar {
  max-width: 53rem;
  margin: 0 auto;
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
.ResultStatsAndOrdering {
  display: flex;
  justify-content: space-between;
  margin: 3rem 4rem 0;
  flex-direction: column;
}
.OrderSelector {
  display: flex;
  flex-direction: column;
  order: -1;
}

.ResultStats {
  margin: 1rem 0 0;
}

.SearchBar .el-input__inner:focus {
  border-color: $link-color-active;
}

.NoResults {
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media only screen and (min-width: 768px) {
  .ResultStats {
    margin: 0;
  }
  .ResultStatsAndOrdering {
    flex-direction: row;
  }
  .OrderSelector {
    order: 1;
  }
}
</style>

<template>
  <section class="container">
    <ReactiveBase app="archived_news-index" url="http://127.0.0.1:9200" >
       <DataSearch
        className="result-list-container"
        categoryField="authors.raw"
        componentId="BookSensor"
        :dataField="['title', 'title.search']"
        :URLParams="true"
      />
      <ReactiveList
      componentId="SearchResult"
      dataField="title.raw"
      className="result-list-container"
      :pagination="true"
      :from="0"
      :size="5"
      :react="{and: ['BookSensor']}"
    >
        <div slot="onData" slot-scope="{ item }">
          {{item.title}}
        </div>

      </ReactiveList>
    </ReactiveBase>
  </section>
</template>

<script>
export default {}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>

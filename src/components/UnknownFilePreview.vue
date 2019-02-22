<template>
  <div class="UnknownFilePreview">
    <div class="UnknownFilePreview__Preview">
      <p class="UnknownFilePreview__Message microtext">Visualização não disponível.</p>
      <div class="UnknownFilePreview__Actions UnknownFilePreview__Actions--big">
        <a :href="file_url" class="UnknownFilePreview__Action">
          <i class="material-icons">get_app</i>
        </a>
        <!-- TODO: compartilhar... -->
      </div>
    </div>
    <div class="UnknownFilePreview__Footer">
      <div class="UnknownFilePreview__DocumentInfo">
        <p class="UnknownFilePreview__Label microtext">Arquivo</p>
        <h1 class="UnknownFilePreview__Title">{{title}}</h1>
        <p class="UnknownFilePreview__Description">{{description}}</p>
        <p class="UnknownFilePreview__Size">{{size}}</p>
        <p class="UnknownFilePreview__SendDate">{{sendDate}}</p>
      </div>
      <div class="UnknownFilePreview__Actions UnknownFilePreview__Actions">
        <a :href="file_url" class="UnknownFilePreview__Action UnknownFilePreview__Action--stacked">
          <i class="material-icons">get_app</i>
        </a>
        <!-- TODO: compartilhar... -->
      </div>
    </div>
  </div>
</template>

<script>
import DocumentPreview from './DocumentPreview'
export default {
  name: 'UnknownFilePreview',
  extends: DocumentPreview
}
</script>

<style scoped>
.UnknownFilePreview {
  background: #fefefe;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.UnknownFilePreview__Preview {
  flex: 1;
  color: #333;
  text-align: center;
  padding-top: 40%;
}

.UnknownFilePreview__Message {
  color: inherit;
  margin: 1rem;
}

.UnknownFilePreview__Footer {
  background: #a8a8a8;
  color: #fefefe;
  padding: 0.5rem;
  font-family: 'Cabin', sans-serif;
  display: flex;
}

.UnknownFilePreview__Label {
  color: inherit;
  font-size: 0.75rem;
  margin-top: 0;
}
.UnknownFilePreview__Title {
  margin: 0;
  font-weight: normal;
}
.UnknownFilePreview__Description {
  margin: 0;
  font-size: 1rem;
}

.UnknownFilePreview__DocumentInfo {
  flex-grow: 2;
}
.UnknownFilePreview__Actions {
  flex-basis: 1.5rem;
  text-align: right;
  font-size: 1.5rem;
}
.UnknownFilePreview__Actions--big {
  text-align: center;
}

.UnknownFilePreview__Actions--big i {
  font-size: 3.5rem;
}

.UnknownFilePreview__Action {
  color: inherit;
  display: inline-block;
}

.UnknownFilePreview__Action--stacked {
  display: block;
}

.UnknownFilePreview__Size,
.UnknownFilePreview__SendDate {
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 0;
}
</style>

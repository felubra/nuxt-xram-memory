<template>
  <div>
    <ReactiveBase app="artifact_news" url="http://127.0.0.1:9200" :theme="defaultTheme">
      <nuxt />
    </ReactiveBase>
  </div>
</template>

<style>
html {
  font-family: 'Vollkorn', serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}
</style>

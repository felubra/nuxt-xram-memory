<template>
  <div>
    <ReactiveBase app="artifact_news" url="https://cvajs5fgeg:xjdngkcr5e@xram-memory-testing-1939220761.us-west-2.bonsaisearch.net" :theme="defaultTheme">
      <nuxt />
    </ReactiveBase>
  </div>
</template>

<script>
export default {
  name: 'DefaultLayout',
  computed: {
    defaultTheme() {
      return {
        typography: {
          fontFamily: 'Vollkorn, serif',
          fontSize: '16px'
        },

        colors: {
          textColor: '#333333',
          backgroundColor: '#fff',
          primaryTextColor: '#AA0000',
          primaryColor: '#2196F3',
          titleColor: '#AA0000',
          alertColor: '#d9534f',
          borderColor: '#B9B9B9'
        }
      }
    }
  }
}
</script>


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

body {
  padding: 0;
  margin: 0;
}

.microtext {
  text-transform: uppercase;
  color: #aa0000;
  font-family: 'Cabin', sans-serif;
  font-size: 0.625rem;
}
</style>

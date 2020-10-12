<template>
  <v-btn nuxt fab small @click="goBack()">
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BackButton',
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus" scoped></style>

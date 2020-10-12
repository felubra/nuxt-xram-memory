<template>
  <v-btn
    nuxt
    fab
    small
    @click="$router.go(-1)"
  >
    <v-icon>mdi-arrow-left</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: 'BackButton'
}
</script>

<template>
  <el-button circle @click="goBack()">
    <i class="material-icons">arrow_back</i>
  </el-button>
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

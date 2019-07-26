<template>
  <el-button icon="el-icon-back" circle @click="goBack()"></el-button>
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

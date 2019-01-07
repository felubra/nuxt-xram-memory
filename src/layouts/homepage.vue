<template>
  <el-container>
    <el-header height="250px">
      <el-row 
        type="flex" 
        justify="space-around">
        <el-col 
          :span="5" 
          class="logo">
          <xram-memory-logo width="250px"/>
        </el-col>
      </el-row>
    </el-header>
    <el-main>
      <nuxt/>
    </el-main>
    <el-footer>
      <el-row 
        type="flex" 
        justify="space-around">
        <el-col :span="24">
          <xram-memory-footer/>
        </el-col>
      </el-row>
    </el-footer>
  </el-container>
</template>

<script>
import XramMemoryLogo from '@/components/xram-memory/logo.vue'
export default {
  components: {
    XramMemoryLogo
  }
}
</script>


<style scoped>
div.logo {
  padding-top: 150px;
  text-align: center;
}
</style>

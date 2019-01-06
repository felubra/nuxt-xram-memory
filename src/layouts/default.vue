<template>
  <el-container>
    <el-header>
      <el-row 
        type="flex" 
        justify="center">
        <el-col 
          :span="3" 
          class="logo">
          <xram-memory-logo/>
        </el-col>
        <el-col :span="15">
          <xram-memory-menu/>
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
import XramMemoryMenu from '@/components/xram-memory/menu.vue'
export default {
  components: {
    XramMemoryLogo,
    XramMemoryMenu
  }
}
</script>


<style>
</style>

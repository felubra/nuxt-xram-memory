<script>
/**
 * Página inicial
 *
 * - Requisitos:
 *  - Uma entrada para a busca do site
 *  - Listas de coleções em destaque
 */
import XramMemorySearchBar from '@/components/xram-memory/search-bar.vue'
export default {
  layout: 'homepage',
  components: {
    XramMemorySearchBar
  }
}
</script>

<template>
  <div>
    <el-row 
      type="flex"
      justify="space-around">
      <el-col :span="7">
        <xram-memory-search-bar/>
      </el-col>
    </el-row>
    <el-row
      v-for="featured_collection in featured_collections"
      :key="featured_collection.id"
      type="flex"
      justify="space-around"
    >
      <el-col :span="18">
        <xram-memory-collection 
          :mode="showcase" 
          :collection="featured_collection"/>
      </el-col>
    </el-row>
  </div>
</template>

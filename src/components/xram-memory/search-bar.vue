<script>
/**
 * Um componente para uma barra de pesquisa.
 *
 * Requisitos:
 *  - TODO: Deverá enviar um get para o endpoint de pesquisa do site.
 */
export default {
  name: 'XramMemorySearchBar'
}
</script>

<template>
  <div>
    <el-input
      :autofocus="true"
      placeholder="Pesquisar o acervo"
      suffix-icon="el-icon-search"/>
  </div>
</template>


<style>
.el-input.is-active .el-input__inner,
.el-input__inner:focus {
  border-color: #c1b6b6;
}
</style>

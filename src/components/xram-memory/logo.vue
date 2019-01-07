<script>
/**
 * Componente para o logotipo do site.
 *
 * Requisitos:
 *  - TODO: Imagem deve estar envolvida num link para a página inicial do site.
 */
export default {
  name: 'XramMemoryLogo',
  props: {
    width: {
      type: String,
      default: '100%'
    }
  }
}
</script>


<template>
  <div>
    <img
      :width="width"
      src="/img/logo.svg"
      alt="XRAM-Memory logo"
      title="Logotipo do XRAM-Memory">
  </div>
</template>

<style scoped>
</style>

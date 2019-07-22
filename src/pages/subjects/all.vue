<template>
  <section class="Page CenteredPage">
    <h1 class="off-screen">Todos os assuntos</h1>
    <header>
      <Microtext arrow="down">Assuntos (em ordem alfabética)</Microtext>
      <AlphabeticalPicker />
    </header>
    <main></main>
  </section>
</template>

<script>
import Microtext from '~/components/common/Microtext'

export default {
  name: 'AllSubjectsPage',
  components: {
    Microtext
  }
}
</script>

<style lang="stylus" scoped></style>

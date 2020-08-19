<template>
  <div class="CollapsibleContainer">
    <section :class="{'visible': visible}">
      <slot></slot>
    </section>
    <footer>
      <slot name="filterToggle">
        <Microtext class-name="ShowFilters">
          <a href="#toggle" @click.prevent="toggleFilters">
            <i class="material-icons">filter_list</i>
            {{visible ? 'Esconder filtros' : 'Mostrar filtros'}}
          </a>
        </Microtext>
      </slot>
    </footer>
  </div>

</template>

<script>
import Microtext from '@/components/common/Microtext'
export default {
  name: 'CollapsibleContainer',
  components: {
    Microtext
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    toggleFilters() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped>
.CollapsibleContainer {
  overflow: hidden;
}
.CollapsibleContainer > section {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.25s ease-out;
  justify-content: center;
  flex-wrap: wrap;
}

.CollapsibleContainer > section.visible {
  max-height: 1000px;
  overflow-y: auto;
}

.CollapsibleContainer > footer {
  text-align: right;
  padding: 0.5rem 0;
}
.ShowFilters > a {
  display: inline-flex;
  align-items: center;
}

@media only screen and (min-width: 768px) {
  .CollapsibleContainer > section {
    flex-direction: row;
    margin-top: 2rem;
    max-height: 1000px;
    overflow: visible;
  }
  .ShowFilters {
    display: none;
  }
}
</style>

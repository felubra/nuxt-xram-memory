<template>
  <section class="Page">
    <header v-if="hasSlot(['header', 'image'])">
      <slot name="image"></slot>
      <slot name="header"></slot>
    </header>
    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>
    <main>
      <slot name="subtitle"></slot>
      <slot></slot>
    </main>
  </section>
</template>

<script>
export default {
  name: 'AbstractPage',
  methods: {
    hasSlot(name = 'aside') {
      if (Array.isArray(name)) {
        return name.some(
          slotName => !!this.$slots[slotName] || !!this.$scopedSlots[slotName]
        )
      } else {
        return !!this.$slots[name] || !!this.$scopedSlots[name]
      }
    }
  }
}
</script>

<style scoped>
aside {
  background: #f3f1f1;
}

.Page.Page--aside-after aside {
  order: 2;
}
h2 {
  font-weight: 500;
}
.Page__Subtitle {
  display: none;
}

section.Page {
  align-content: center;
}
header {
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  align-items: center;
  min-height: 35vh;
}

main {
  flex-grow: 1;
  background: #ffffff;
  font-weight: 1rem;
}

@media only screen and (min-width: 768px) {
  .Page__Subtitle {
    display: block;
    margin: 0 0 1rem;
  }
  aside {
    flex-basis: 350px;
    flex-shrink: 0;
    margin-top: 70px;
  }
  .Page.Page--aside-after aside {
    order: 0;
  }
}
</style>

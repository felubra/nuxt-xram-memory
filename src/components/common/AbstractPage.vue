<template>
  <section class="Page">
    <header v-if="!!theTitle || !!theImage || hasSlot(['header', 'image'])">
      <slot name="image">
        <img v-if="theImage" :src="theImage" alt>
      </slot>
      <div class="content-container">
        <slot name="header">
          <h1 v-if="theTitle">{{theTitle}}</h1>
        </slot>
      </div>
    </header>
    <aside v-if="hasSlot('aside')">
      <slot name="aside"></slot>
    </aside>
    <main>
      
        <slot name="subtitle">
          <h2 v-if="theSubtitle" class="Page__Subtitle">{{theSubtitle}}</h2>
        </slot>
        <slot>
          <div v-html="theBody"></div>
        </slot>
      
    </main>
  </section>
</template>

<script>
import xss from 'xss'
import { appClassesXSSFilter, getMediaUrl } from '@/utils/'

export default {
  name: 'AbstractPage',
  props: {
    image: {
      type: String,
      default: () => ''
    },
    subtitle: {
      type: String,
      default: () => ''
    },
    title: {
      type: String,
      default: () => ''
    },
    body: {
      type: String,
      default: () => ''
    }
  },
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
  },
  computed: {
    theTitle() {
      return xss(this.title, appClassesXSSFilter)
    },
    theSubtitle() {
      return xss(this.subtitle, appClassesXSSFilter)
    },
    theBody() {
      return xss(this.body, appClassesXSSFilter)
    },
    theImage() {
      const urlVal = xss(this.image, appClassesXSSFilter)
      return urlVal ? getMediaUrl(urlVal) : ''
    }
  }
}
</script>

<style scoped>
aside {
  background: #f3f1f1;
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
  min-height: 15vh;
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
  }
}
</style>

<script setup lang="ts">
// https://github.com/vueuse/head
// you can use this to manipulate the document head in any components,
// they will be rendered correctly in the html results with vite-ssg
useHead({
  title: 'NHost Vitesse',
  meta: [
    { name: 'description', content: 'Opinionated Vite Starter Template with NHost' },
    {
      name: 'theme-color',
      content: computed(() => isDark.value ? '#00aba9' : '#ffffff'),
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: computed(() => preferredDark.value ? '/icons/favicon-dark.svg' : '/icons/favicon.svg'),
    },
  ],
})
</script>

<template>
  <RouterView />
</template>

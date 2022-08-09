<script setup lang="ts">
interface Props {
  title: () => string;
  caption: () => string;
  link: string | null;
  icon: string;
  submenu?: any;
}
const { title, caption = "", link = "#", icon = "", submenu } = defineProps<Props>();
</script>
<template>
  <q-item v-if="link" clickable :to="link" exact>
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title() }}</q-item-label>
      <q-item-label caption>
        {{ caption() }}
      </q-item-label>
    </q-item-section>
  </q-item>
  <q-expansion-item
    v-else
    expand-separator
    :icon="icon"
    :label="title()"
    :caption="caption()"
  >
    <q-list>
      <EssentialLink v-for="link in submenu" :key="link.title" v-bind="link" />
    </q-list>
  </q-expansion-item>
</template>

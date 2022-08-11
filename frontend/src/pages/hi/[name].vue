<script setup lang="ts">
import { useRouter } from 'vue-router'
const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

watchEffect(() => {
  user.setNewName(props.name)
})
</script>

<template>
  <QPage>
    <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <div text-4xl>
        <div i-carbon-pedestrian inline-block />
      </div>
      <p>
        {{ t('intro.hi', { name: props.name }) }}
      </p>

      <p text-sm opacity-75>
        <em>{{ t('intro.dynamic-route') }}</em>
      </p>

      <template v-if="user.otherNames.length">
        <p text-sm mt-4>
          <span opacity-75>{{ t('intro.aka') }}:</span>
          <ul>
            <li v-for="otherName in user.otherNames" :key="otherName">
              <router-link :to="`/hi/${otherName}`" replace>
                {{ otherName }}
              </router-link>
            </li>
          </ul>
        </p>
      </template>

      <div>
        <button
          btn m="3 t6" text-sm
          @click="router.back()"
        >
          {{ t('button.back') }}
        </button>
      </div>
    </div>
  </QPage>
</template>
<route lang="yaml">
meta:
  layout: quasarDefault
</route>

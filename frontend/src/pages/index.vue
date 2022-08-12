<script setup lang="ts">
const user = useUserStore();
const name = $ref(user.savedName);

const router = useRouter();
const go = () => {
  if (name) router.push(`/hi/${encodeURIComponent(name)}`);
};

const { t } = useI18n();
</script>

<template>
  <QPage padding>
    <div class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
      <div text-4xl>
        <div i-carbon-campsite inline-block />
      </div>
      <p>
        <a
          rel="noreferrer"
          href="https://github.com/suplere/vitesse-quasar-nhost-template"
          target="_blank"
        >
          Vitesse
        </a>
      </p>
      <p>
        <em text-sm opacity-75>{{ t("intro.desc") }}</em>
      </p>

      <div py-4 />

      <input
        id="input"
        v-model="name"
        :placeholder="t('intro.whats-your-name')"
        :aria-label="t('intro.whats-your-name')"
        type="text"
        autocomplete="false"
        p="x4 y2"
        w="250px"
        text="center"
        bg="transparent"
        border="~ rounded gray-200 dark:gray-700"
        outline="none active:none"
        @keydown.enter="go"
      />
      <label class="hidden" for="input">{{ t("intro.whats-your-name") }}</label>

      <div>
        <button btn m-3 text-sm :disabled="!name" @click="go">
          {{ t("button.go") }}
        </button>
      </div>
      <div>
        <p>
          <em text-sm opacity-75>{{ t("intro.testMessage") }}</em>
        </p>
        <div>
          <p>Email: <span class="text-teal">user@example.com</span></p>
          <p>Password: <span class="text-teal">user1234</span></p>
        </div>
        <p>
          <RouterLink to="/auth/register">{{
            t("intro.testMessageCreteOwn")
          }}</RouterLink>
        </p>
      </div>
    </div>
  </QPage>
</template>

<route lang="yaml">
meta:
  layout: quasarDefault
</route>

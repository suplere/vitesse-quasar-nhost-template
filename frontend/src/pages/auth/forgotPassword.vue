<script setup lang="ts">
import { useResetPassword } from "@nhost/vue";
import { QSpinnerGears, QForm, useQuasar } from "quasar";
const appUrl = import.meta.env.VITE_FRONTEND_URL;
const forgotPasswordForm = $ref<QForm | null>(null);
const q = useQuasar();
const router = useRouter();
const { resetPassword } = useResetPassword({
  redirectTo: `${appUrl}/profile`,
});
const email = $ref("");
const { t } = useI18n();
const onSubmit = () => {
  forgotPasswordForm?.validate().then(async (success) => {
    if (success) {
      q.loading.show({
        message: t("forgotPassword.userMessage"),
        backgroundColor: "grey",
        spinner: QSpinnerGears,
        customClass: "loader",
      });
      try {
        // const res = await auth.recoverPassword(email);
        const { isError, error } = await resetPassword(email);
        q.loading.hide();
        if (isError) {
          console.error(error);
          q.notify({
            color: "negative",
            message: `${t("forgotPassword.errorTitle")}: ${error?.message}`,
          });
        } else {
          q.notify({
            color: "positive",
            message: `${t("forgotPassword.successTitle")}`,
          });
          router.push("/");
        }
      } catch (err) {
        q.loading.hide();
      }
    }
  });
};
</script>

<template>
  <QPage padding>
    <QForm
      class="authentication q-gutter-y-md"
      ref="forgotPasswordForm"
      @submit="onSubmit"
    >
      <div class="row justify-center q-my-xl" height="326px" width="300px">
        <router-link to="/">
          <QImg
            alt="Logo"
            src="/icons/pwa-512x512.png"
            contain
            height="326px"
            width="300px"
          ></QImg>
        </router-link>
      </div>
      <h5 class="text-center text-lg font-bold">{{ t("auth.forgotPasswordTitle") }}</h5>
      <div class="inst q-mb-lg text-center">
        {{ t("auth.forgotPasswordMessage") }}
      </div>
      <QInput
        v-model="email"
        outlined
        autocomplete="email"
        color="primary"
        data-cy="email"
        for="email"
        label="EMAIL"
        lazy-rules
        name="email"
        type="email"
        :rules="[
          (val) => !!val || `${t('validation.requiredField')}`,
          (val) =>
            (val.includes('@') && val.includes('.')) ||
            `${t('validation.emailNotValid')}`,
        ]"
      ></QInput>
      <QBtn
        class="full-width q-mt-md"
        color="primary"
        data-cy="submit"
        :label="t('forgotPassword.button')"
        @click="onSubmit"
      >
        <template v-slot:loading>
          <QSpinnerGears></QSpinnerGears>
        </template>
      </QBtn>
    </QForm>
  </QPage>
</template>
<route lang="yaml">
meta:
  requiresNotAuth: true
  layout: quasarDefault
</route>
<style lang="scss">
.authentication {
  margin: auto;
  max-width: 30em;
  width: 100%;
  .q-img {
    height: 190px;
  }
}

.q-page >>> .q-img__image {
  height: 184px;
  background-size: 35% !important;
  background-position: 50% 100% !important;
}
</style>

<script setup lang="ts">
import { useSignInEmailPassword } from "@nhost/vue";
import { QForm, QSpinnerGears, useQuasar } from "quasar";

const emailAuthenticationForm = $ref<QForm | null>(null);
const isPwd = $ref(true);
const email = $ref("");
const password = $ref("");
const { t } = useI18n();
const q = useQuasar();
const router = useRouter();
const { signInEmailPassword } = useSignInEmailPassword();
const onSubmit = () => {
  emailAuthenticationForm?.validate().then(async (success) => {
    if (success) {
      q.loading.show({
        message: t("login.userMessage"),
        backgroundColor: "grey",
        spinner: QSpinnerGears,
        customClass: "loader",
      });
      try {
        // const res = await auth.loginUser(email, password);
        const { isSuccess, error } = await signInEmailPassword(email, password);
        q.loading.hide();
        if (!isSuccess) {
          console.error(error);
          q.notify({
            message: `${t("login.errorTitle")}: ${error?.message}`,
            color: "negative",
          });
        } else {
          router.push({ path: "/" });
        }
      } catch (err) {
        console.error(err);
        q.loading.hide();
      }
    }
  });
};
</script>

<template>
  <QPage padding>
    <div class="authentication">
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
      <h5 class="text-center text-lg font-bold">{{ t("auth.loginTitle") }}</h5>
      <QForm
        class="authentication q-gutter-y-md"
        ref="emailAuthenticationForm"
        @submit="onSubmit"
      >
        <QInput
          v-model="email"
          outlined
          autocomplete="email"
          color="primary"
          data-cy="email"
          for="email"
          lazy-rules
          name="email"
          :label="t('form.email')"
          type="email"
          :rules="[
            (val) => !!val || `${t('validation.requiredField')}`,
            (val) =>
              (val.includes('@') && val.includes('.')) ||
              `${t('validation.emailNotValid')}`,
          ]"
        />
        <QInput
          v-model="password"
          for="password"
          name="password"
          lazy-rules
          outlined
          autocomplete="current-password"
          color="primary"
          data-cy="password"
          :label="t('form.password')"
          :rules="[(val) => !!val || `${t('validation.requiredField')}`]"
          :type="isPwd ? 'password' : 'text'"
          @keyup.enter="onSubmit()"
        >
          <template v-slot:append>
            <QIcon
              class="cursor-pointer"
              :name="isPwd ? 'visibility_off' : 'visibility'"
              @click="isPwd = !isPwd"
            />
          </template>
        </QInput>

        <QBtn
          class="full-width q-mt-md"
          color="primary"
          data-cy="submit"
          type="submit"
          :label="t('login.button')"
        >
        </QBtn>

        <p class="q-mt-md q-mb-none text-center">
          <router-link class="text-blue" to="/auth/register">
            <span>{{ t("auth.toRegister") }}</span>
          </router-link>
        </p>
        <p class="q-ma-sm text-center">
          <router-link class="text-blue" to="forgotPassword">{{
            t("auth.toForgotPassword")
          }}</router-link>
        </p>
      </QForm>
    </div>
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

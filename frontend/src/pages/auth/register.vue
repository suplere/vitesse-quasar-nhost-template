<script setup lang="ts">
import { useSignUpEmailPassword } from "@nhost/vue";
import { QForm, QSpinnerGears, useQuasar } from "quasar";

const emailAuthenticationForm = $ref<QForm | null>(null);
const { signUpEmailPassword } = useSignUpEmailPassword();
const isPwd = $ref(true);
const email = $ref("");
const password = $ref("");
const passwordMatch = $ref("");
const firstname = $ref("");
const lastname = $ref("");
const mobile = $ref("");
const { t } = useI18n();
const q = useQuasar();
const router = useRouter();

const onSubmit = () => {
  emailAuthenticationForm?.validate().then(async (success) => {
    if (success) {
      q.loading.show({
        message: t("register.userMessage"),
        backgroundColor: "grey",
        spinner: QSpinnerGears,
        customClass: "loader",
      });
      try {
        // const res = await auth.createAccount(email, password, {
        //   firstname,
        //   lastname,
        //   mobile,
        // });
        const { error, isError } = await signUpEmailPassword(email, password, {
          metadata: { firstname, lastname, mobile },
          locale: "cs",
          displayName: `${lastname} ${firstname}`,
          // allowedRoles: ["user"],
          // defaultRole: "user",
        });
        q.loading.hide();
        if (isError) {
          console.error(error);
          q.notify({
            message: `${t("register.errorTitle")}: ${error?.message}`,
            color: "negative",
          });
        } else {
          q.notify({
            message: t("register.messageSent"),
            color: "positive",
          });
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
      <h5 class="text-center text-lg font-bold">{{ t("auth.registerTitle") }}</h5>
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
        <QInput
          lazy-rules
          outlined
          autocomplete="new-password"
          color="primary"
          data-cy="verifyPassword"
          :label="t('form.passwordMatch')"
          v-model="passwordMatch"
          :rules="[
            (val) => !!val || `${t('validation.requiredField')}`,
            (val) => val === password || `${t('validation.passwordDontMatch')}`,
          ]"
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
        <QInput
          v-model="firstname"
          outlined
          autocomplete="firstname"
          color="primary"
          data-cy="firstname"
          for="firstname"
          lazy-rules
          name="firstname"
          :label="t('form.firstname')"
          type="text"
          :rules="[(val) => !!val || `${t('validation.requiredField')}`]"
        />
        <QInput
          v-model="lastname"
          outlined
          autocomplete="lastname"
          color="primary"
          data-cy="lastname"
          for="lastname"
          lazy-rules
          name="lastname"
          :label="t('form.lastname')"
          type="text"
          :rules="[(val) => !!val || `${t('validation.requiredField')}`]"
        />
        <QInput
          v-model="mobile"
          outlined
          autocomplete="mobile"
          color="primary"
          data-cy="mobile"
          for="mobile"
          name="mobile"
          :label="t('form.mobile')"
          mask="+420 ### ### ###"
          type="text"
        />
        <QBtn
          class="full-width q-mt-md"
          color="primary"
          data-cy="submit"
          type="submit"
          :label="t('register.button')"
        >
        </QBtn>

        <p class="q-mt-md q-mb-none text-center">
          <router-link class="text-blue" to="/auth/login">
            <span>{{ t("auth.toLogin") }}</span>
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

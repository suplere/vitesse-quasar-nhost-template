<script setup lang="ts">
import { useChangePassword } from "@nhost/vue";
import { QForm, QSpinnerGears, useQuasar } from "quasar";

const props = defineProps<{
  redirect: boolean | null;
}>();
const forgotPasswordForm = $ref<QForm | null>(null);
const q = useQuasar();

const password = $ref("");
const confirmPassword = $ref("");
const isPwd = $ref(true);
const { t } = useI18n();
const router = useRouter();
const { changePassword } = useChangePassword();
const onSubmit = () => {
  forgotPasswordForm?.validate().then(async (success) => {
    q.loading.show({
      message: t("newPassword.userMessage"),
      backgroundColor: "grey",
      spinner: QSpinnerGears,
      customClass: "loader",
    });
    if (success) {
      try {
        const { isError, error } = await changePassword(password);
        if (!isError) {
          q.notify({
            color: "positive",
            message: t("newpassword.paswordChange"),
          });
          if (props.redirect) router.push("/");
        } else {
          console.error(error);
          q.notify({
            color: "negative",
            message: `${t("newpassword.error")}: ${error?.message}`,
          });
        }
      } catch (err) {
        q.notify({
          color: "negative",
          message: `${t("newpassword.error")}: ${err}`,
        });
      }
    }
    q.loading.hide();
  });
};
</script>
<template>
  <QForm class="authentication q-gutter-y-md" ref="forgotPasswordForm" @submit="onSubmit">
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
      v-model="confirmPassword"
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
    <QBtn
      class="full-width q-mt-md"
      color="primary"
      data-cy="submit"
      :label="t('newPassword.button')"
      @click="onSubmit"
    >
      <template v-slot:loading>
        <QSpinnerGears></QSpinnerGears>
      </template>
    </QBtn>
  </QForm>
</template>

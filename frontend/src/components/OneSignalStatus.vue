<script setup lang="ts">
import { useOneSignal } from "@onesignal/onesignal-vue3";

const {
  showCategorySlidedown,
  isPushNotificationsEnabled,
  setSubscription,
  setExternalUserId: setExtId,
  deleteTags,
  showNativePrompt,
} = useOneSignal();
const { t } = useI18n();
const { state: subscription, execute } = useAsyncState(
  () => isPushNotificationsEnabled().then((t) => t),
  false
);
const auth = useAuthStore();
const oneSignal = useOnesignalStore();
const labelText = computed(() =>
  subscription.value ? t("page.profile.notifyOn") : t("page.profile.notifyOff")
);
const showSlidedown = () => {
  showCategorySlidedown({ force: true });
};
const subscribeUser = () => {
  showNativePrompt().then(() => {
    setSubscription(true).then(() => {
      if (auth.user?.id && auth.hash.uidHash) setExtId(auth.user?.id, auth.hash.uidHash);
      oneSignal.sendWelcomeNotification();
      execute();
    });
  });
};
const unSubscribeUser = () => {
  setSubscription(false).then(() => {
    deleteTags(["test1", "test2"]);
    if (auth.hash.uidHash) setExtId("", auth.hash.uidHash);
    execute();
  });
};
</script>
<template>
  <q-card>
    <q-item>
      <q-item-section avatar>
        <q-btn
          v-if="subscription"
          round
          color="positive"
          icon="notifications_active"
          @click="unSubscribeUser"
        />
        <q-btn
          v-else
          round
          color="negative"
          icon="notifications_off"
          @click="subscribeUser"
        />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ labelText }}</q-item-label>
      </q-item-section>
      <q-item-section v-if="subscription">
        <q-btn color="primary" @click="showSlidedown">{{
          t("page.profile.showCategory")
        }}</q-btn>
      </q-item-section>
    </q-item>
  </q-card>
</template>

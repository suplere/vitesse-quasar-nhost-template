<script setup lang="ts">
import { useUserDisplayName } from "@nhost/vue";
import { nhost } from "~/modules/nhost";
import {
  NotifyUsersDocument,
  NotifyUsersQuery,
  NotifyUsersQueryVariables,
  useGetUsersQuery,
} from "~/utils/__generated__/graphql";

const { t } = useI18n();
const { result } = useGetUsersQuery();
const usersOptions = computed(() => {
  if (result.value) {
    const users = result.value.users;
    return users.map((u) => {
      return {
        label: u.displayName,
        value: u.id,
      };
    });
  } else {
    return [];
  }
});
const selectedIds = ref<string[]>([]);
const user = useUserDisplayName();

const sendTestMessage = async (to: string[]) => {
  const url = import.meta.env.VITE_FRONTEND_URL;
  const variables: NotifyUsersQueryVariables = {
    userIds: to,
    webpush_notify: {
      url,
      headings: {
        en: `Greatings from TestApp`,
        cs: `Pozdrav z TestAplikace`,
      },
      subtitle: {
        en: `${user.value}`,
        cs: `${user.value}`,
      },
      contents: {
        en: `Gretings from tes app - test Onesignal. Sender ${user.value}`,
        cs: `${user.value} posílá pozdrav z Test app - testování Onesignal`,
      },
    },
  };
  const res = await nhost.graphql.request<NotifyUsersQuery>(
    NotifyUsersDocument,
    variables
  );
  if (!res.error) {
    console.log(res.data.notifyUsers?.numIds);
  }
};

const sendAll = () => sendTestMessage([]);

const sendUsers = () => sendTestMessage(selectedIds.value);
</script>

<template>
  <QPage padding>
    <QCard>
      <QCardSection>
        <div class="text-h6 text-center">{{ t("page.onesignal.title") }}</div>
        <QSelect
          v-model="selectedIds"
          :label="t('page.onesignal.selectSuserLabel')"
          :options="usersOptions"
          emit-value
          map-options
          multiple
        ></QSelect>
        <div class="text-subtitle2">{{ t("page.onesignal.selectedUsers") }}</div>
        <div class="text-subtitle">{{ selectedIds }}</div>
      </QCardSection>
      <QCardActions align="right">
        <QBtn color="positive" @click="sendAll">{{
          t("page.onesignal.notifyAllUser")
        }}</QBtn>
        <QBtn color="info" @click="sendUsers">{{
          t("page.onesignal.notifySelectedUsers")
        }}</QBtn>
      </QCardActions>
    </QCard>
  </QPage>
</template>
<route lang="yaml">
meta:
  requiresAuth: true,
  layout: quasarDefault
</route>

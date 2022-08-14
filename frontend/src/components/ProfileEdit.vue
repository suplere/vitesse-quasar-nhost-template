<script setup lang="ts">
import { nhost } from "~/modules/nhost";
import { useUserData, useUserEmail } from "@nhost/vue";
import { QInput } from "quasar";
import AvatarEdit from "~/components/AvatarEdit.vue";

interface UserMetaData {
  firstname: string;
  lastname: string;
  mobile: string;
}

interface UpdateUser {
  id: string;
  displayName: string;
  email: string;
  avatarUrl: string;
  metadata: UserMetaData;
}
const { t } = useI18n();
const userData = useUserData();
const userEmail = useUserEmail();
const isNotTestUSer = computed(() => userEmail.value !== "user@example.com");
const remountCounter = ref(0);
const schema = [
  {
    id: "avatarUrl",
    span: 12,
    component: AvatarEdit,
    dynamicProps: ["filename", "idFile", "email"],
    filename: () => `profile_${state.id}`,
    idFile: () => state.id,
    email: () => state.email,
  },
  {
    id: "metadata.firstname",
    span: 6,
    filled: true,
    component: QInput,
    dense: true,
    label: () => t("form.firstname"),
    required: true,
  },
  {
    id: "metadata.lastname",
    span: 6,
    filled: true,
    component: QInput,
    dense: true,
    label: () => t("form.lastname"),
    required: true,
  },
  {
    id: "displayName",
    span: 6,
    filled: true,
    component: QInput,
    dense: true,
    label: () => t("form.displayName"),
  },
  {
    id: "metadata.mobile",
    span: 6,
    filled: true,
    component: QInput,
    dense: true,
    label: () => t("form.mobile"),
  },
];
const oneSignal = useOnesignalStore();
// const auth = useAuthStore();
const state = reactive<UpdateUser>({
  id: "",
  displayName: "",
  email: "",
  avatarUrl: "",
  metadata: {
    firstname: "",
    lastname: "",
    mobile: "",
  },
});

const saveUserData = async () => {
  const variables = {
    id: state.id,
    object: {
      displayName: state.displayName,
      metadata: state.metadata,
      avatarUrl: state.avatarUrl,
    },
  };
  try {
    const saveData = await nhost.graphql.request(
      `
    mutation updateUser($id: uuid!, $object: users_set_input!) {
      updateUser(pk_columns: {id: $id}, _set: $object) {
        id
        displayName
        email
        metadata
        avatarUrl
      }
    }
    `,
      variables
    );
    state.displayName = saveData.data.updateUser.displayName;
    state.metadata = saveData.data.updateUser.metadata;
    state.avatarUrl = saveData.data.updateUser.avatarUrl;
    remountCounter.value++;
  } catch (error) {
    console.error(error);
  }
};

const updateState = (e: UpdateUser) => {
  state.displayName = e.displayName;
  state.metadata = e.metadata;
  state.avatarUrl = e.avatarUrl;
};

const close = (e: any) => console.log("close", e);
const save = (e: any) => console.log("save", e);
watch(
  userData,
  (val) => {
    if (val) {
      state.id = val.id;
      state.displayName = val.displayName;
      state.avatarUrl = val.avatarUrl;
      state.email = val.email as string;
      state.metadata = (val.metadata as unknown) as UserMetaData;
    }
  },
  { immediate: true }
);
</script>
<template>
  <QCard class="full-width">
    <QCardSection>
      <div class="text-center text-h6">{{ t("page.profile.title") }}</div>
      <div class="text-center text-subtitle q-mb-sm">{{ state.email }}</div>

      <BlitzForm
        :key="JSON.stringify(remountCounter)"
        :schema="schema"
        v-model="state"
        mode="edit"
        :columnCount="12"
        :internalLabels="true"
        @update:modelValue="updateState"
        @cancel="close"
        @save="save"
      />
    </QCardSection>
    <QCardActions align="right">
      <QBtn @click="saveUserData" color="primary">{{ t("profile.saveUserData") }}</QBtn>
    </QCardActions>
  </QCard>
  <OneSignalStatus v-if="oneSignal.oneSignalEnabled" />
  <QCard class="full-width">
    <QCardSection>
      <div class="text-center text-h6">{{ t("auth.changePasswordTitle") }}</div>
      <ChangePassword v-if="isNotTestUSer" class="q-my-sm" :redirect="false" />
      <div v-else class="text-center text-subtitle">
        {{ t("auth.changePasswordTitleError") }}
      </div>
    </QCardSection>
  </QCard>
</template>

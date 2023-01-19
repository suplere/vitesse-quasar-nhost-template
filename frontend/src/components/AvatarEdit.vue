<script setup lang="ts">
import MD5 from "crypto-js/md5";
import { nhost } from "~/modules/nhost";

const props = defineProps<{
  modelValue: string | undefined;
  filename: string;
  idFile: string;
  email: string | undefined;
}>();

const emits = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();
const { t } = useI18n();
const showDialog = ref(false);

const showPhotoUpload = () => {
  showDialog.value = true;
};

const url = ref<string>("");

watch(
  () => props.modelValue,
  async (newVal, oldVal) => {
    if (!newVal) {
      url.value = "/images/avatar.png";
    } else {
      url.value = newVal;
    }
  },
  {
    immediate: true,
  }
);

const uploadComplete = async (e: string | null) => {
  console.log(e);
  emits("update:modelValue", e);
  showDialog.value = false;
};

const deleteAvatar = async () => {
  await nhost.storage.delete({
    fileId: props.idFile,
  });
  if (props.email) {
    const emailHASH = MD5(props.email).toString();
    const url = `https://s.gravatar.com/avatar/${emailHASH}?r=g&default=blank`;
    emits("update:modelValue", url);
  } else {
    emits("update:modelValue", null);
  }
};
</script>

<template>
  <div class="text-center row">
    <div class="col-12 text-center">
      <QAvatar class="q-mb-sm shadow-5" size="80px" @click="showPhotoUpload()">
        <q-img :src="url"></q-img>
      </QAvatar>
    </div>

    <div class="col-12 text-center">
      <QBtn color="negative" @click="deleteAvatar">{{ t("button.deleteAvatar") }}</QBtn>
    </div>

    <q-dialog v-model="showDialog">
      <file-uploader
        class="q-my-lg"
        :label="t('form.uploadFile')"
        :name="props.filename"
        :idFile="props.idFile"
        :maxSize="150"
        @uploadComplete="uploadComplete"
      />
    </q-dialog>
  </div>
</template>

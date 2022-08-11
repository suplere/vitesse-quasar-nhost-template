<script lang="ts">
import { createUploaderComponent } from "quasar";
import { nhost } from "~/modules/nhost";
import { fromImage } from "imtool";

export default createUploaderComponent({
  name: "FileUploader",
  props: {
    name: {
      type: String,
    },
    maxSize: {
      type: Number,
    },
    idFile: {
      type: String,
    },
  },
  emits: ["uploadComplete", "failed", "removed"],
  injectPlugin({ props, emit, helpers }) {
    const promises = ref([]);
    const workingThreads = ref(0);

    const storageProps = computed(() => ({
      id: () => props.idFile,
      name: () => props.name,
      maxSize: () => props.maxSize,
    }));

    const isUploading = computed(() => workingThreads.value > 0);
    const isBusy = computed(() => promises.value.length > 0);

    function abort() {}
    function upload() {
      const queue = helpers.queuedFiles.value.slice(0);
      helpers.queuedFiles.value = [];
      queue.forEach((file) => {
        runFactory([file]);
      });
    }

    function runFactory(files: File[]) {
      workingThreads.value++;
      files.forEach((file) => {
        uploadFileToStorage(file);
      });
    }

    function uploadFileToStorage(file: File) {
      const id = storageProps.value.id();
      const name = storageProps.value.name() || "file";
      const maxSize = storageProps.value.maxSize();
      nhost.storage
        .delete({
          fileId: props.idFile as string,
        })
        .then(async () => {
          const tool = await fromImage(file);
          if (maxSize) {
            return tool.thumbnail(maxSize, false).toFile(name);
          }
          return file;
        })
        .then((fileToUpload) =>
          nhost.storage.upload({
            file: fileToUpload,
            bucketId: "default",
            id,
            name,
          })
        )
        .then((nhostStorage) => {
          workingThreads.value--;
          if (nhostStorage.fileMetadata) {
            helpers.updateFileStatus(file, "uploaded");
            return nhost.storage.getPublicUrl({
              fileId: nhostStorage.fileMetadata?.id,
            });
          }
          return null;
        })
        .then((url) => {
          emit("uploadComplete", url);
        });
    }

    return {
      isUploading,
      isBusy,

      abort,
      upload,
    };
  },
});
</script>

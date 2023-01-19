import { useOneSignal } from "@onesignal/onesignal-vue3";
import { acceptHMRUpdate, defineStore } from "pinia";
import { isOnesignalConfigured } from "~/modules/onesignal";

export const useOnesignalStore = defineStore("onesignal", () => {
  const { setExternalUserId, deleteTags } = useOneSignal();

  const setExtId = (id: string, hash: string) => {
    return setExternalUserId(id, hash);
  };

  const removeExtIdAndTags = (hash: string) => {
    return Promise.all([
      deleteTags(["test1", "test2"]),
      setExternalUserId("", hash),
    ]);
  };

  const sendWelcomeNotification = () => {
    const { t } = useI18n();
    if ("serviceWorker" in navigator && "PushManager" in window) {
      navigator.serviceWorker.ready.then((swreg) => {
        return swreg.showNotification(t("onesignal.notification.title"), {
          body: t("onesignal.notification.body"),
          icon: "/icons/pwa-192x192.png",
          badge: "/icons/pwa-192x192.png",
          dir: "ltr",
          lang: "cs-CZ",
          vibrate: [100, 50, 200],
          tag: "confirm-notification",
          renotify: true,
        });
      });
    }
  };

  const oneSignalEnabled = computed(() =>
    isOnesignalConfigured ? true : false
  );

  return {
    setExtId,
    sendWelcomeNotification,
    removeExtIdAndTags,
    oneSignalEnabled,
  };
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useOnesignalStore, import.meta.hot));

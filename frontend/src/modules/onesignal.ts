import { UserModule } from "~/types";
import OneSignalVuePlugin from "@onesignal/onesignal-vue3";
import { i18n } from "./i18n";

const appId = import.meta.env.VITE_ONESIGNAL_APP_ID;
const localhost = import.meta.env.VITE_ONESIGNAL_LOCALHOST as boolean | false;

export const isOnesignalConfigured = appId ? true : false;

const appInit = localhost
  ? {
      appId,
      allowLocalhostAsSecureOrigin: true,
    }
  : {
      appId,
    };

export const install: UserModule = ({ app }) => {
  const { t } = i18n.global;

  if (isOnesignalConfigured) {
    app.use(OneSignalVuePlugin, {
      serviceWorkerPath: "onesignal/OneSignalSDKWorker.js",
      serviceWorkerParam: { scope: "/onesignal/" },
      ...appInit,
      persistNotification: false,
      promptOptions: {
        slidedown: {
          prompts: [
            {
              type: "push", // current types are "push" & "category"
              autoPrompt: false,
              text: {
                /* limited to 90 characters */
                actionMessage: t("onesignal.slidedown.actionMessage"),
                /* acceptButton limited to 15 characters */
                acceptButton: t("onesignal.slidedown.acceptButton"),
                /* cancelButton limited to 15 characters */
                cancelButton: t("onesignal.slidedown.cancelButton"),
              },
              delay: {
                pageViews: 1,
                timeDelay: 20,
              },
            },
            {
              type: "category",
              autoPrompt: false,
              text: {
                actionMessage: t("onesignal.slidedown.category.actionMessage"),
                acceptButton: t("onesignal.slidedown.category.acceptButton"),
                cancelButton: t("onesignal.slidedown.category.cancelButton"),

                /* CATEGORY SLIDEDOWN SPECIFIC TEXT */
                negativeUpdateButton: t(
                  "onesignal.slidedown.category.negativeUpdateButton"
                ),
                positiveUpdateButton: t(
                  "onesignal.slidedown.category.positiveUpdateButton"
                ),
                updateMessage: t("onesignal.slidedown.category.updateMessage"),
              },
              delay: {
                pageViews: 1,
                timeDelay: 20,
              },
              categories: [
                {
                  tag: "test1",
                  label: "Test 1",
                },
                {
                  tag: "test2",
                  label: "Test 2",
                },
              ],
            },
          ],
        },
      },
    });
  } else {
    console.log(t("onesignal.notConfigured"));
  }
};

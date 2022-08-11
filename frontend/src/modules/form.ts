import { BlitzForm, FormContext } from "blitzar";
import { QBtn } from "quasar";
// include Blitzar's CSS (kept at minimal and doesn't pollute global scope)
import "blitzar/dist/style.css";
import { UserModule } from "~/types";
import { i18n } from "./i18n";

export interface FormPayload {
  newData: Record<string, any>;
  oldData: Record<string, any>;
  formData: Record<string, any>;
}

export const useActionButtons = () => {
  const { t } = i18n.global;

  const actionButtonDefaults = () => ({
    // you can pass a class to adjust the look of the button:
    edit: {
      slot: t("form.edit"),
      component: QBtn,
      color: "primary",
    },
    // you can also directly adjust the style:
    cancel: {
      slot: `${t("form.cancel")}`,
      component: QBtn,
      color: "info",
    },
    save: {
      slot: t("form.save"),
      component: QBtn,
      color: "positive",
    },
    delete: {
      slot: `${t("form.delete")}`,
      component: QBtn,
      color: "negative",
      showCondition: (_: any, ctx: FormContext) => !!ctx.formData.id,
    },
  });

  return {
    actionButtonDefaults,
  };
};

export const actionButtonDefaults = () => {
  const { t } = i18n.global;
  return {
    // you can pass a class to adjust the look of the button:
    edit: {
      slot: t("form.edit"),
      component: QBtn,
      color: "primary",
    },
    // you can also directly adjust the style:
    cancel: {
      slot: `${t("form.cancel")}`,
      component: QBtn,
      color: "info",
    },
    save: {
      slot: t("form.save"),
      component: QBtn,
      color: "positive",
    },
    delete: {
      slot: `${t("form.delete")}`,
      component: QBtn,
      color: "negative",
      showCondition: (_: any, ctx: FormContext) => !!ctx.formData.id,
    },
  };
};

export const install: UserModule = ({ app }) => {
  app.component("BlitzForm", BlitzForm);
};

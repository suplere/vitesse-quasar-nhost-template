import { FormContext } from "blitzar";
import { QBtn } from "quasar";

export const useActionButtons = () => {
  const { t } = useI18n();

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

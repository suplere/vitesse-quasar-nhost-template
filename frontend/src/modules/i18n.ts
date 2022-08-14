import { createI18n } from "vue-i18n";
import { type UserModule } from "~/types";
// import cs from '../../locales/cs.yml'

const messages = Object.fromEntries(
  Object.entries(
    import.meta.glob<{ default: any }>("../../locales/*.y(a)?ml", {
      eager: true,
    })
  ).map(([key, value]) => {
    const yaml = key.endsWith(".yaml");
    return [key.slice(14, yaml ? -5 : -4), value.default];
  })
);

export const i18n = createI18n({
  legacy: false,
  locale: "cs",
  messages,
});

export const install: UserModule = ({ app }) => {
  app.use(i18n);
};

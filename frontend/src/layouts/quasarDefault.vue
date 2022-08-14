<script setup lang="ts">
import { useQuasar } from "quasar";
import cs from "quasar/lang/cs";
import en from "quasar/lang/en-US";
import { useAuthenticated, useUserData } from "@nhost/vue";
const { t, availableLocales, locale } = useI18n();
const leftDrawerOpen = ref<boolean>(false);
const q = useQuasar();
const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};

const onToggleDark = () => {
  toggleDark();
  q.dark.set(isDark.value);
};

const onesignal = useOnesignalStore();

const linksData = [
  {
    title: () => t("button.home"),
    caption: () => "",
    icon: "home",
    link: "/",
  },
  {
    title: () => t("menu.profileTitle"),
    caption: () => t("menu.profileDescription"),
    icon: "school",
    link: "/profile",
    auth: true,
    role: "user",
  },
  {
    title: () => t("button.about"),
    caption: () => "",
    icon: "description",
    link: "/about",
  },
  {
    title: () => t("menu.oneSignalTitle"),
    caption: () => t("menu.oneSignalDescription"),
    icon: "online_prediction",
    auth: true,
    link: "/onesignal",
    visible: () => onesignal.oneSignalEnabled,
  },
  {
    title: () => t("menu.loginTitle"),
    caption: () => t("menu.loginDescription"),
    icon: "login",
    link: "/auth/login",
    noAuth: true,
  },
  {
    title: () => t("menu.logoutTitle"),
    caption: () => t("menu.logoutDescription"),
    icon: "logout",
    link: "/auth/logout",
    auth: true,
  },
];
const essentialLinks = $ref(linksData);
const isAuthenticated = useAuthenticated();
const userData = useUserData();
const links = computed(() => {
  return essentialLinks
    .filter((l) => {
      if (!l.visible) {
        return true;
      } else {
        return l.visible();
      }
    })
    .filter((l) => {
      if (!l.auth) {
        return true;
      } else {
        return isAuthenticated.value;
      }
    })
    .filter((l) => {
      if (l.noAuth) {
        return !isAuthenticated.value;
      } else {
        return true;
      }
    })
    .filter((l) => {
      if (!l.role) {
        return true;
      } else {
        return (
          (l.role === "admin" && userData.value?.roles.includes("admin")) ||
          (l.role === "user" && userData.value?.roles.includes("user"))
        );
      }
    });
});
watch(locale, (val) => {
  switch (val) {
    case "cs":
      q.lang.set(cs);
      break;
    case "en":
      q.lang.set(en);
      break;
    default:
      break;
  }
});
</script>

<template>
  <q-layout view="lHh Lpr lFf" class="text-gray-700 dark:text-gray-200">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title to="/"> {{ t("layout.appName") }} </q-toolbar-title>
        <q-btn
          flat
          :icon="isDark ? 'dark_mode' : 'light_mode'"
          dense
          round
          @click="onToggleDark()"
        />
        <q-btn flat icon="translate" dense round @click="toggleLocales()" />
        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          {{ t("layout.mainMenu") }}
        </q-item-label>
        <EssentialLink v-for="link in links" :key="link.title" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <div class="py-2 mx-auto text-center text-sm">[Default Layout]</div>
      <router-view v-slot="{ Component, route }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" :key="route" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<style lang="scss">
.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-to {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

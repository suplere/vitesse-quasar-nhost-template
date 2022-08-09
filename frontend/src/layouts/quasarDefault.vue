<script setup lang="ts">
// import { RouteRecordRaw, useRouter } from "vue-router";
import {
  // LocalStorage,
  useQuasar,
} from "quasar";
import { useAuthenticated, useUserData } from "@nhost/vue";
const { t, availableLocales, locale } = useI18n();
// const router = useRouter();
// const useRoutes: RouteRecordRaw[] | null = LocalStorage.getItem("routes");
const leftDrawerOpen = ref<boolean>(false);

const toggleLocales = () => {
  // change to some real logic
  const locales = availableLocales;
  locale.value = locales[(locales.indexOf(locale.value) + 1) % locales.length];
};
const q = useQuasar();
const onToggleDark = () => {
  toggleDark();
  q.dark.set(isDark.value);
};

const linksData = [
  {
    title: () => t("menu.notAuthenticatedTitle"),
    caption: () => t("menu.notAuthenticatedDescription"),
    icon: "accessibility",
    link: "/home",
  },
  {
    title: () => t("menu.profileTitle"),
    caption: () => t("menu.profileDescription"),
    icon: "school",
    link: "/profile",
    auth: true,
    role: "user",
  },
  // {
  //   title: () => t("menu.trainerMainTitle"),
  //   caption: () => t("menu.trainerMainDescription"),
  //   icon: "eva-person-done-outline",
  //   link: null,
  //   role: "trainer",
  //   submenu: [
  //     {
  //       title: () => t("menu.trainerWorklogTitle"),
  //       caption: () => t("menu.trainerWorklogDescription"),
  //       icon: "eva-file-text-outline",
  //       link: "/trainer/worklog",
  //       role: "trainer",
  //     },
  //     {
  //       title: () => t("menu.playerStatsTitle"),
  //       caption: () => t("menu.playerStatsDescription"),
  //       icon: "eva-pantone-outline",
  //       link: "/trainer/attendance",
  //       role: "trainer",
  //     },
  //   ],
  // },
  // {
  //   title: () => t("menu.administrationTitle"),
  //   caption: () => t("menu.administrationDescription"),
  //   icon: "eva-people-outline",
  //   link: "/admin/",
  //   role: "admin",
  // },
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

        <q-toolbar-title> {{ t("layout.appName") }} </q-toolbar-title>
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
      <router-view v-slot="{ Component }">
        <transition name="slide-fade" mode="out-in">
          <component :is="Component" />
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

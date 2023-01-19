import { setupLayouts } from "virtual:generated-layouts";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import generatedRoutes from "~pages";
import { createHead } from "@vueuse/head";

import "@unocss/reset/tailwind.css";
import "./styles/main.css";
import "uno.css";
import { useAuthStore } from "./store/auth";
import { apolloClient, nhost } from "./modules/nhost";
import { ViteCreateApp } from "./createApp";

const routes = setupLayouts(generatedRoutes);

export const createApp = ViteCreateApp(
  App,
  { routes, base: import.meta.env.BASE_URL },
  (ctx) => {
    // install all modules under `modules/`
    Object.values(import.meta.globEager("./modules/*.ts")).forEach((i) =>
      i.install?.(ctx)
    );
    const authStore = useAuthStore();

    nhost.auth.isAuthenticatedAsync().then((state) => {
      // console.log(state);
      // if (state) {
      //   authStore.setAuth(nhost.auth.getSession());
      // }
    });
    // .then(() => app.mount("#app"));

    nhost.auth.onAuthStateChanged((event, session) => {
      if (event === "SIGNED_OUT") {
        console.log("clear store");
        apolloClient.clearStore();
      }
      authStore.setAuth(session);
    });
  }
);

/*
const router = createRouter({
  history: createWebHistory(), //import.meta.env.BASE_URL
  routes,
});

const app = createApp(App);
const head = createHead();

app.use(router);
app.use(head);

const initialState: Record<string, any> = {};

const modules = import.meta.glob<any>("/src/modules/*.ts", { eager: true });

Object.values(modules).forEach((module) =>
  module.install?.({ app, router, initialState, routes, head })
);
const authStore = useAuthStore();

nhost.auth
  .isAuthenticatedAsync()
  .then((state) => {
    // console.log(state);
    // if (state) {
    //   authStore.setAuth(nhost.auth.getSession());
    // }
  })
  .then(() => app.mount("#app"));

nhost.auth.onAuthStateChanged((event, session) => {
  if (event === "SIGNED_OUT") {
    console.log("clear store");
    apolloClient.clearStore();
  }
  authStore.setAuth(session);
});
*/
// app.mount("#app");

// https://github.com/antfu/vite-ssg
// export const createApp = ViteSSG(
//   App,
//   { routes, base: import.meta.env.BASE_URL },
//   (ctx) => {
//     // install all modules under `modules/`
//     Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
//       .forEach(i => i.install?.(ctx))
//   },
// )

import { NhostClient } from "@nhost/vue";
import { createApolloClient } from "@nhost/apollo";
import { DefaultApolloClient } from "@vue/apollo-composable";
// import VueApolloComponents from "@vue/apollo-components";
import { type Session, type User } from "@nhost/hasura-auth-js";
import { UserModule } from "~/types";

const backendUrl = import.meta.env.VITE_NHOST_URL;
const region = import.meta.env.VITE_NHOST_REGION;
const subdomain = import.meta.env.VITE_NHOST_SUBDOMAIN;

export const nhost = backendUrl
  ? new NhostClient({
      backendUrl,
    })
  : new NhostClient({
      region,
      subdomain,
    });

export const apolloClient = createApolloClient({ nhost });

export { Session, User };

export const install: UserModule = ({ app, router }) => {
  // console.log(router);
  app.use(nhost);
  app.provide(DefaultApolloClient, apolloClient);
  // app.use(VueApolloComponents);

  // AUTH GUARD
  router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
      await nhost.auth.isAuthenticatedAsync();
      const session = nhost.auth.getSession();
      if (session) {
        next();
      } else {
        next("/auth/login");
      }
    } else next();
  });
  // NOTAUTH GUARD
  router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresNotAuth) {
      await nhost.auth.isAuthenticatedAsync();
      const session = nhost.auth.getSession();
      if (session) {
        next("/profile");
      } else {
        next();
      }
    } else next();
  });
  // ROLES GUARD
  router.beforeEach(async (to, from, next) => {
    if (to.meta.roles && to.meta.roles.length > 0) {
      await nhost.auth.isAuthenticatedAsync();
      const session = nhost.auth.getSession();
      if (session) {
        const userRoles = session.user?.roles;
        // console.log('ROLES USER', userRoles)
        // console.log('REQUIRED ROLES', to.meta.roles)
        let userHasRole = false;
        to.meta.roles.forEach((r) => {
          if (userRoles?.includes(r)) userHasRole = true;
        });
        if (userHasRole) {
          next();
        } else {
          next("/");
        }
      } else {
        next();
      }
    } else next();
  });
};

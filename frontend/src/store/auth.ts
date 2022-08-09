import { type Session, type User } from "~/modules/nhost";

import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
// import { useOnesignalStore } from "./onesignal";

export interface IAuthResponse {
  data: any | null;
  error: any | null;
}

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: ref<User | undefined>(undefined),
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
    isAdmin: (state): boolean =>
      state.user ? state.user.roles.includes("admin") : false,
    isUser: (state): boolean =>
      state.user ? state.user.roles.includes("user") : false,
    getUserId: (state): string | null => (state.user ? state.user.id : null),
  },
  actions: {
    setAuth(session: Session | null) {
      // console.log(session);
      if (session) {
        this.user = session.user ? session.user : undefined;
      } else {
        this.user = undefined;
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));

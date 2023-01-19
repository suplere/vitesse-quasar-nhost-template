import { nhost, type Session, type User } from "~/modules/nhost";

import { acceptHMRUpdate, defineStore } from "pinia";
import { ref } from "vue";
import { useOnesignalStore } from "./onesignal";
// import { useOnesignalStore } from "./onesignal";

export interface IAuthResponse {
  data: any | null;
  error: any | null;
}

export interface OneSignalHash {
  emailHash: string | null;
  uidHash: string | null;
}

const USER_HASH = `
query getUserHash($userId: uuid!) {
  users_data(where: {user_id: {_eq: $userId}}) {
    os_idHash
    user_id
    os_emailHash
  }
}
`;

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    user: ref<User | undefined>(undefined),
    hash: ref<OneSignalHash>({
      emailHash: null,
      uidHash: null,
    }),
    uidHash: ref<string | null>(null),
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
    async getUserHash() {
      const res = await nhost.graphql.request(USER_HASH, {
        userId: this.getUserId,
      });
      if (res.data && res.data.users_data && res.data.users_data.length > 0) {
        this.hash.emailHash = res.data.users_data[0].os_emailHash;
        this.hash.uidHash = res.data.users_data[0].os_idHash;
      }
    },
    setAuth(session: Session | null) {
      // console.log(session);
      const oneSignal = useOnesignalStore();
      if (session) {
        this.user = session.user ? session.user : undefined;
        if (oneSignal.oneSignalEnabled) {
          this.getUserHash().then(() => {
            if (this.user?.id && this.hash.uidHash) {
              oneSignal.setExtId(this.user.id, this.hash.uidHash);
            }
          });
        }
      } else {
        if (this.hash.uidHash) {
          if (oneSignal.oneSignalEnabled) {
            oneSignal
              .removeExtIdAndTags(this.hash.uidHash)
              .then(() => (this.hash.uidHash = null));
          }
        }
        this.user = undefined;
      }
    },
  },
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));

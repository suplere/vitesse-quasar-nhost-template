<script setup lang="ts">
import { useSignOut } from "@nhost/vue";

const router = useRouter();
const { signOut } = useSignOut();

// const router = useRouter();
const logout = async () => {
  const { isSuccess } = await signOut();
  if (isSuccess) {
    router.push("/");
  }
};

onMounted(() => logout());
</script>
<template>
  <div></div>
</template>

<route lang="yaml">
meta:
  requiresAuth: true
  layout: quasarDefault
</route>

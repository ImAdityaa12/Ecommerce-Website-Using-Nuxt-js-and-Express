<template>
  <div class="" v-if="authStore.isAuthenticated" @click="handleLogout">
    Logout
  </div>
</template>
<script setup>
import { useStore } from "~/stores/store";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useToast } from "~/components/ui/toast/use-toast";
import { getCookie } from "../lib/utils.ts";
import { deleteCookie } from "../lib/utils.ts";
const cookie = getCookie("token");

const authStore = useStore();
const { toast } = useToast();
const router = useRouter();
console.log(authStore.isAuthenticated);

onMounted(() => {
  if (!cookie) {
    router.push("/");
  }
});

const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:7000/users/logout", {
      method: "POST",
      credentials: "include",
    });

    toast({
      description: "Logout successful",
      title: "Success",
      duration: 5000,
    });
    authStore.logout();

    router.push("/login");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
      duration: 5000,
    });
  }
};
</script>

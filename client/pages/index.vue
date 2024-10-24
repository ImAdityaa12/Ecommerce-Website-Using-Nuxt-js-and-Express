<template>
  <div class="" @click="handleLogout">Logout</div>
</template>
<script setup>
import { useStore } from "~/stores/store";

import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useToast } from "~/components/ui/toast/use-toast";
import { getCookie } from "../lib/utils.ts";

const authStore = useStore();
const { toast } = useToast();
const router = useRouter();

onMounted(() => {
  const cookie = getCookie("token");
  console.log(cookie);
  if (cookie) {
    router.push("/");
  } else {
    router.push("/login");
  }
});

const handleLogout = async () => {
  try {
    const res = await fetch("http://localhost:7000/users/logout", {
      method: "GET",
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

import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", () => {
  const isAuthenticated = ref(false);
  console.log(isAuthenticated.value);

  const login = () => {
    isAuthenticated.value = true;
  };
  const logout = () => {
    isAuthenticated.value = false;
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
});

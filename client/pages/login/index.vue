<template>
  <div
    class="font-sour-gummy relative h-screen w-screen flex items-center justify-start"
  >
    <img
      class="w-full h-full absolute object-fill"
      src="../../assets/css/images/bg.jpg"
      alt="Background Image"
    />
    <div
      class="bg-white m-8 p-4 gap-8 h-[90%] rounded-3xl absolute flex flex-col items-center w-1/3 z-10"
    >
      <h1
        class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-xl shadow-black/50 rounded-lg p-2 m-6 text-7xl text-gradient animate-bounce transform skew-x-12"
      >
        ChicMart
      </h1>
      <h2
        class="text-5xl from-green-400 via-blue-500 to-purple-600 text-center font-bold"
      >
        Log in and buy free
      </h2>
      <div class="flex flex-col gap-1 w-2/3">
        <input
          v-model="formData.email"
          class="border-2 border-purple-200 hover:border-purple-600 p-4 rounded-full"
          type="email"
          placeholder="email"
        />
        <input
          v-model="formData.password"
          class="border-2 border-purple-200 hover:border-purple-600 p-4 rounded-full"
          type="password"
          placeholder="password "
        />
      </div>

      <div class="flex flex-col w-full items-center justify-center">
        <div class="flex gap-2 p-2 items-center">
          <input type="checkbox" /> I accept terms and conditions
        </div>
        <button
          @click="handleLogin"
          class="bg-purple-500 hover:bg-purple-700 h-10 w-2/3 rounded-full text-white font-bold"
        >
          log in
        </button>
        <p>or</p>

        <button>Continue with Google</button>
        <div>
          New Here?
          <NuxtLink to="/register"
            ><span class="text-purple-950 font-bold hover:text-purple-500"
              >register</span
            ></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "../../../client/stores/store";
import { getCookie } from "~/lib/utils";

const authStore = useStore();
const { toast } = useToast();
const router = useRouter();

console.log(authStore.isAuthenticated);
console.log(authStore.login);

onMounted(() => {
  const cookie = getCookie("token");
  if (cookie) {
    router.push("/");
  }
});

const formData = ref({
  email: "",
  password: "",
});

const error = ref({
  email: "",
  password: "",
});

const validateForm = () => {
  let isValid = true;

  if (formData.value.email === "") {
    error.value.email = "Email is required";
    isValid = false;
  } else if (
    !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
      formData.value.email
    )
  ) {
    error.value.email = "Email is invalid";
    isValid = false;
  }
  if (formData.value.password === "") {
    error.value.password = "Password is required";
    isValid = false;
  } else if (formData.value.password.length < 6) {
    error.value.password = "Password must be at least 6 characters";
    isValid = false;
  }

  return isValid;
};

const handleLogin = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  try {
    const res = await fetch("http://localhost:7000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.value.email,
        password: formData.value.password,
      }),
      credentials: "include",
    });
    const data = await res.json();
    toast({
      description: "Login successful",
      title: "Success",
      duration: 5000,
    });
    authStore.login();

    router.push("/");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occurred during login",
      duration: 5000,
    });
  }
};
</script>

<style></style>

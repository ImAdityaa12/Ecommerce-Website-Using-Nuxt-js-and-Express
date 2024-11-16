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
      class="bg-white m-8 p-4 gap-4 h-[90%] rounded-3xl absolute flex flex-col items-center w-1/3 z-10"
    >
      <h1
        class="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 shadow-xl shadow-black/50 rounded-lg p-2 m-6 text-7xl text-gradient animate-bounce transform skew-x-12"
      >
        ChicMart
      </h1>
      <h2
        class="text-5xl from-green-400 via-blue-500 to-purple-600 text-center font-bold"
      >
        Sign Up and buy free
      </h2>
      <div class="flex flex-col gap-1 w-2/3">
        <input
          v-model="formData.username"
          class="border-2 border-purple-200 hover:border-purple-600 p-4 rounded-full"
          type="text"
          placeholder="username"
        />
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
          @click="registerUser"
          class="bg-purple-500 hover:bg-purple-700 h-10 w-2/3 rounded-full text-white font-bold"
        >
          Sign Up
        </button>
        <p>or</p>

        <button>Continue with Google</button>
        <div>
          Already have an account?
          <NuxtLink to="/login"
            ><span class="text-purple-950 font-bold hover:text-purple-500"
              >log in</span
            ></NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "@/components/ui/toast/use-toast";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { getCookie } from "~/lib/utils";

const { toast } = useToast();
const router = useRouter();
onMounted(() => {
  const cookie = getCookie("token");
  if (cookie) {
    router.push("/login");
  }
});

const formData = ref({
  username: "",
  email: "",
  password: "",
});

const registerUser = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`http://localhost:7000/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: formData.value.username,
        email: formData.value.email,
        password: formData.value.password,
      }),
      credentials: "include",
    });

    toast({
      title: "Success",
      description: "Registration successful",
      duration: 5000,
    });

    router.push("/login");
  } catch (error) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "An error occurred during registration",
      duration: 5000,
    });
  }
};
</script>

<style></style>

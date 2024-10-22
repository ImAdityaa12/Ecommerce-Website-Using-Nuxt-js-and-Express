<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Login to account</CardTitle>
        <CardDescription
          >Enter your details below to create your account</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form class="space-y-4">
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              type="email"
              v-model="formData.email"
              placeholder="Enter your email"
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              v-model="formData.password"
              id="password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button v-if="!isAuthenticated" @click="handleLogin" class="w-full"
            >Login</Button
          >
        </form>
      </CardContent>
    </Card>
  </div>
</template>

<script setup>
import Card from "~/components/ui/card/Card.vue";
import CardContent from "~/components/ui/card/CardContent.vue";
import CardDescription from "~/components/ui/card/CardDescription.vue";
import CardHeader from "~/components/ui/card/CardHeader.vue";
import CardTitle from "~/components/ui/card/CardTitle.vue";
import Input from "~/components/ui/input/Input.vue";
import Label from "~/components/ui/label/Label.vue";
import Button from "~/components/ui/button/Button.vue";
import { useToast } from "@/components/ui/toast/use-toast";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "~/stores/store";

const authStore = useStore();
const { toast } = useToast();
const router = useRouter();

console.log(authStore.isAuthenticated);

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
      description: error.message,
      duration: 5000,
    });
  }
};
</script>

<style></style>

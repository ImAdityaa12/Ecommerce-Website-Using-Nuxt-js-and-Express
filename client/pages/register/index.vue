<template>
  <div class="min-h-screen flex items-center justify-center bg-background p-4">
    <Card class="w-full max-w-md">
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription
          >Enter your details below to create your account</CardDescription
        >
      </CardHeader>
      <CardContent>
        <form class="space-y-4">
          <div class="space-y-2">
            <Label for="username">Username</Label>
            <Input
              id="username"
              v-model="formData.username"
              type="text"
              placeholder="Enter your username"
            />
          </div>
          <div class="space-y-2">
            <Label for="email">Email</Label>
            <Input
              id="email"
              v-model="formData.email"
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div class="space-y-2">
            <Label for="password">Password</Label>
            <Input
              id="password"
              v-model="formData.password"
              type="password"
              placeholder="Enter your password"
            />
          </div>
          <Button class="w-full" @click="registerUser">Register</Button>
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

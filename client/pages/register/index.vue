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
        <form @submit.prevent="handleSubmit" class="space-y-4">
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
          <Button @click="registerUser" type="submit" class="w-full"
            >Register</Button
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

const formData = ref({
  username: "",
  email: "",
  password: "",
});

const registerUser = async () => {
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
    });
  } catch (error) {
    console.error(error);
    return new Response("An error occurred while registering the user.", {
      status: 500,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
  }
};
</script>

<style></style>

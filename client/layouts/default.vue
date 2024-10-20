<template>
  <div>
    Hello
    <Toaster />
    <slot />
  </div>
</template>
<script setup>
import Toaster from "@/components/ui/toast/Toaster.vue";
</script>

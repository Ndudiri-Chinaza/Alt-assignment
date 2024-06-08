<script setup>
import { ref } from "vue";

const throwError = ref(false);

const triggerError = () => {
  throwError.value = true;
  if (throwError.value) {
    throw new Error("Intentional Error for Testing");
  }
};
</script>

<template>
  <button class="error" @click="triggerError">Trigger Error</button>
</template>

<style>

</style>
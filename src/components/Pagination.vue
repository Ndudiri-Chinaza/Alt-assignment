<script setup>
const props = defineProps({
  currentPage: Number,
  totalPages: Number,
  onPageChange: Function,
});
</script>

<template>
  <div>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="onPageChange(page)"
      :disabled="page === currentPage"
    >
      {{ page }}
    </button>
  </div>
</template>
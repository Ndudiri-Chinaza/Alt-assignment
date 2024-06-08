<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  repo: Object,
  onUpdate: Function,
});

const isModalOpen = ref(false);
const name = ref(props.repo.name || "");
const description = ref(props.repo.description || "");

const openModal = () => {
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
};

const handleSubmit = () => {
  props.onUpdate(props.repo.id, {
    name: name.value,
    description: description.value,
  });
  closeModal();
};

// Watch for prop changes and update local state accordingly
watch(
  () => props.repo,
  (newRepo) => {
    name.value = newRepo.name || "";
    description.value = newRepo.description || "";
  }
);
</script>

<template>
  <div>
    <button class="button-up" @click="openModal">Update Repo</button>
    <div v-if="isModalOpen" class="modal">
      <div class="modal-overlay" @click="closeModal"></div>
      <div class="modal-content">
        <div class="details-contain8">
          <div class="modal-header">
            <h2 class="text6">Update Repository</h2>
            <button class="modal-close-button" @click="closeModal">
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div class="form-control">
              <label class="texth">Update Repository Name</label>
              <input
                placeholder="Update Repository Name"
                class="input"
                v-model="name"
              />
            </div>
            <div class="form-control">
              <label class="text2">Update Description</label>
              <input
                placeholder="Update Repository Description"
                class="input"
                v-model="description"
              />
            </div>
          </div>
          <footer class="modal-footer">
            <button class="save1" @click="handleSubmit">Save</button>
            <button class="cancel1" @click="closeModal">Cancel</button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>


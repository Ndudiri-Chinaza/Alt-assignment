<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import axios from "axios";
import NotFound from "./NotFound.vue";
import ErrorBoundary from "./ErrorBoundary.vue";
import RepoUpdateModal from "./RepoUpdateModal.vue";
import Spinner from "./Spinner.vue";

const token =
  import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const repository = ref(null);
const isLoading = ref(true);
const error = ref(null);

const fetchRepository = async (id) => {
  try {
    const response = await axios.get(
      `https://api.github.com/repositories/${id}`
    );
    repository.value = response.data;
  } catch (err) {
    console.error("Error fetching repository:", error);
    error.value =
      "Failed to fetch details. Please check the repository ID or your network connection.";
    isLoading.value = false;
  }
};

onMounted(() => {
  fetchRepository(route.params.id);
});


const handleUpdate = async (repoId, data) => {
  try {
    const response = await axios.patch(
      `https://api.github.com/repos/Ndudiri-Chinaza/${repository.value.name}`,
      data,
      {
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    repository.value = response.data;
    console.log("Repository updated successfully:", response.data);
    alert(`Repository updated successfully.`);
  } catch (err) {
    console.error("Error updating repository:", err);
    alert(`Error updating repository.`);
  }
};
</script>

<template>
  <ErrorBoundary>
    <Box v-if="repository" class="details-container">
      <Text class="repository-name">{{ repository.name }}</Text>
      <Text class="repository-description">{{ repository.description }}</Text>
      <Box class="repository-details">
        <Text>Stars: {{ repository.stargazers_count }}</Text>
        <Text>Language: {{ repository.language }}</Text>
        <Text>Forks: {{ repository.forks_count }}</Text>
        <Text>Owner: {{ repository.owner.login }}</Text>
        <Text>ID: {{ repository.id }}</Text>
        <Text>Size: {{ repository.size }}</Text>
        <Text>Clone Url: {{ repository.clone_url }}</Text>
        <Text>Website: {{ repository.homepage || "N/A" }}</Text>
        <Text>Watchers: {{ repository.watchers }}</Text>
      </Box>
      <RouterLink to="/" class="go-home-link">HOME</RouterLink>
    </Box>

    <NotFound v-else-if="error" />

    <div v-else-if="!repository && !isLoading" class="details-container">
      <NotFound />
    </div>

    <Box-Spin top="50%" text-align="center" v-else="isLoading">
      <div class="details-container-spin">
        <Spinner top="50%" />
        <Text>Loading repository details...</Text>
      </div>
    </Box-Spin>
  </ErrorBoundary>
</template>

<style scoped>
@import "./RepositoryDetails.css";


</style>


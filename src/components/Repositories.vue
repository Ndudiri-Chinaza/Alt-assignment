<script setup>
import { onMounted, ref, computed } from "vue";
import { useQuery } from "vue-query";
import { useRouter } from "vue-router";
import axios from "axios";
import { RouterLink } from "vue-router";
import ErrorBoundary from "./ErrorBoundary.vue";
import ErrorThrower from "./ErrorThrower.vue";
import Paginate from "./Pagination.vue";



const token =
  import.meta.env.VITE_GITHUB_TOKEN || process.env.VITE_GITHUB_TOKEN;


const fetchUserProfile = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Ndudiri-Chinaza", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile:", error);
    throw new Error("Failed to fetch user profile");
  }
};


const fetchRepositories = async () => {
  try {
    const response = await axios.get(
      "https://api.github.com/users/Ndudiri-Chinaza/repos",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch repositories:", error);
    throw new Error("Failed to fetch repositories");
  }
};


const fetchRepositoryCount = async () => {
  try {
    const response = await axios.get("https://api.github.com/users/Ndudiri-Chinaza", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.public_repos;
  } catch (error) {
    console.error("Failed to fetch repository count:", error);
    throw new Error("Failed to fetch repository count");
  }
};


const currentPage = ref(1);
const perPage = ref(4);
const searchQuery = ref("");
const userProfile = ref(null);
const repositoryCount = ref(0);
const router = useRouter();
const isOpen = ref(false);

const {
  data: repositories,
  isLoading,
  isError,
} = useQuery(["repositories"], fetchRepositories);

onMounted(async () => {
  try {
    const [userData, repoCountData] = await Promise.all([
      fetchUserProfile(),
      fetchRepositoryCount(),
    ]);
    userProfile.value = userData;
    repositoryCount.value = repoCountData;
  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
});

const filteredRepositories = computed(() => {
  return (
    repositories.value?.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    ) || []
  );
});

const totalItems = computed(() => filteredRepositories.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / perPage.value));

const paginatedRepositories = computed(() => {
  const lastIndex = currentPage.value * perPage.value;
  const firstIndex = lastIndex - perPage.value;
  return filteredRepositories.value.slice(firstIndex, lastIndex);
});

const handlePageChange = (page) => {
  currentPage.value = page;
};

const navigateToInvalidUrl = () => {
  router.push("/Invalid_url");
};

</script>

<template>
  <ErrorBoundary>
    <div class="header">
      <section>
        <section class="RepositoriesList">
          <h2>My Repositories</h2>
          <input
            type="text"
            placeholder="Search repositories..."
            class="search-repo"
            v-model="searchQuery"
          />
          <ul>
            <li v-for="repo in paginatedRepositories" :key="repo.id">
              <span class="span-name">{{ repo.name.toUpperCase() }}</span>
              <button class="info">
                <RouterLink class="link" :to="`/repository/${repo.id}`"
                  >DETAILS</RouterLink
                >
              </button>
            </li>
          </ul>
          <div class="grid-box">
            <Paginate
              :currentPage="currentPage"
              :totalPages="totalPages"
              @pageChange="handlePageChange"
            />
            <div class="Test">
              <button class="T404" @click="navigateToInvalidUrl">
                Test 404 page
              </button>
              <ErrorThrower />
            </div>
          </div>
        </section>
      </section>
    </div>
  </ErrorBoundary>
</template>

<style scoped>

.RepositoriesList {
  max-width: 800px;
  margin: 50px auto;
  border: 5px solid #fff;
  border-radius: 20px;
  margin-left: 5rem;
}


.RepositoriesList > h2 {
  text-align: center;
  font-size: 30px;
}

.search-repo {
  width: 689px;
  margin-inline: 46px;
  margin-block: 10px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
}

.search-repo::placeholder {
  color: #999;
}


.T404 {
  background-color: #da1884;
  color: #f9f6ee;
  margin-right: 10px;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.T404:hover {
  color: #faf9f6;
}

.search-repo:focus {
  outline: none;
  border-color: #007bff;
}

.grid-box {
  display: grid;
  grid-template-columns: auto auto;
  gap: 3rem;
  padding: 1rem;
  color: white;
}

ul {
  list-style: none;
}
.info {
  display: block;
  background-color: #da1884;
  width: 100px;
  padding: 10px 15px;
  border-radius: 6px;
  border: none;
  margin: 20px auto;
}

.info:hover {
  color: #f4f4f4;
}

.link {
  color: white;
} 

.link:hover {
  color: #f4f4f4;
}
li {
  border: 2px solid;
  border-radius: 10px;
  margin-block: 30px;
  margin-right: 44px;
}

.user-details {
  flex-grow: 1;
}

span {
  display: block;
  width: max-content;
  margin: 20px auto;
  font-size: 20px;

}

/* .header {
  display: grid;
  grid-template-columns: 500px auto;
  gap: 1rem;
  padding: 1rem;
  color: white;
}  */

.header-desktop {
  font-size: 50px;
}
.header li {
  background-color: #f4f4f4;
  color: #2c3e50;
}
:link {
  text-decoration: none;
}
.name {
  font-size: 50px;
}
</style>
import { createRouter, createWebHistory } from "vue-router";
import Repositories from "../components/Repositories.vue";
import RepositoryDetails from "../components/RepositoryDetails.vue"
import NotFound from "../components/NotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Repositories",
      component: Repositories,
    },
    {
      path: "/repository/:id",
      name: "repositoryDetails",
      component: RepositoryDetails,
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: NotFound,
    },
    
  ],
});

export default router;

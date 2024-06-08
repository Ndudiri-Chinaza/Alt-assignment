<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="not-found-container">
    <h2>Oops! Page not found.</h2>
    <h1>404</h1>
    <p class="not-found-message">Something went wrong</p>
    <router-link  class="not-found-link" to="/">homepage</router-link>
  </div>
</template>

<style scoped>

body {
  margin: 0;
  padding: 0;
  background-color: aquamarine;
  /* height: 100vh; */
  font-family: "Arial"  sans-serif;
}

.not-found-container {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  text-align: center;
  color: #343434;
}

.not-found-container h1 {
  font-size: 5rem;
  margin: 0;
  font-weight: 900;
  letter-spacing: 10px;
}

.not-found-message {
  font-size: 2rem;
  font-weight: 500;
}

.not-found-link {
  font-size: 20px;
  text-decoration: none;
  background: #6a89cc;
  color: #fff;
  padding: 12px 25px;
  text-transform: capitalize;
  border-radius: 10px;

}
</style>
<template>
  <div id="app-container">
    <nav>
      <router-link :to="{ name: 'login' }">Login</router-link> |
      <router-link :to="{ name: 'lists' }">Todo Lists</router-link> |
      <router-link :to="{ name: 'addList' }">Add List</router-link>
    </nav>
    <main>
       <router-view />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
#app-container {
   max-width: 900px;
   margin: 20px auto;
   padding: 20px;
   background-color: #fff;
   border-radius: 8px;
   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
 }
 nav {
   padding-bottom: 15px;
   margin-bottom: 15px;
   border-bottom: 1px solid #eee;
   text-align: center;
 }
</style>
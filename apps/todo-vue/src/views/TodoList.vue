<template>
    <div>
      <h2>Todo Lists</h2>
      <div v-if="currentUser" class="user-info">
        Hi, {{ currentUser.firstName }} {{ currentUser.lastName }}
        <button @click="logout" style="margin-left: 15px;">Logout</button>
      </div>
       <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      <ul v-if="lists.length > 0">
        <li v-for="list in lists" :key="list.id">
          <router-link :to="{ name: 'editList', params: { id: list.id } }">
            {{ list.name }}
          </router-link>
          <button @click="deleteList(list.id)" class="delete">Delete</button>
        </li>
      </ul>
       <p v-else-if="!errorMessage">No lists found. <router-link :to="{ name: 'addList' }">Add one?</router-link></p>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import TodoServices from '@/services/TodoServices.js';
  
  const router = useRouter();
  const lists = ref([]);
  const currentUser = ref(null);
  const errorMessage = ref('');
  
  async function fetchLists() {
    errorMessage.value = '';
    try {
      const response = await TodoServices.getLists();
      lists.value = response.data.lists || [];
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Failed to load lists.';
      handleAuthError(error);
    }
  }
  
  async function fetchUser() {
     errorMessage.value = '';
    try {
      const response = await TodoServices.getUser();
       currentUser.value = response.data.user || null;
       if (!currentUser.value) logout();
    } catch (error) {
      console.error(error);
      currentUser.value = null;
      handleAuthError(error);
    }
  }
  
  async function deleteList(id) {
    errorMessage.value = '';
     if (!confirm('Are you sure?')) return;
    try {
      await TodoServices.deleteList(id);
      fetchLists();
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Failed to delete list.';
      handleAuthError(error);
    }
  }
  
  async function logout() {
    try {
       await TodoServices.logoutUser().catch(() => {});
    } finally {
       localStorage.removeItem('token');
       router.push({ name: 'login' });
    }
  }
  
  function handleAuthError(error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
           logout();
      }
  }
  
  onMounted(() => {
    if (!localStorage.getItem('token')) {
      router.push({ name: 'login' });
    } else {
      fetchUser();
      fetchLists();
    }
  });
  </script>
  
  <style scoped>
  .user-info {
    margin-bottom: 20px;
    font-weight: bold;
  }
  </style>
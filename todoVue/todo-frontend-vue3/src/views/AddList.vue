<template>
    <div>
      <h2>Add New Todo List</h2>
      <form @submit.prevent="handleAddList">
        <div>
          <label for="listName">List Name:</label>
          <input type="text" id="listName" v-model="newList.name" required />
        </div>
        <button type="submit">Save List</button>
         <router-link :to="{ name: 'lists' }" style="margin-left: 10px;">Cancel</router-link>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import TodoServices from '@/services/TodoServices.js';
  import { onMounted } from 'vue';
  
  const router = useRouter();
  const newList = reactive({
    name: ''
  });
  const errorMessage = ref('');
  
  async function handleAddList() {
    errorMessage.value = '';
    if (!newList.name.trim()) {
        errorMessage.value = 'List name cannot be empty.';
        return;
    }
    try {
      const response = await TodoServices.addList(newList);
      if (response.data && response.data.success) {
        router.push({ name: 'lists' });
      } else {
         errorMessage.value = 'Failed to add list.';
      }
    } catch (error) {
      console.error(error);
      errorMessage.value = 'An error occurred while adding the list.';
      handleAuthError(error);
    }
  }
  
   function handleAuthError(error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403 )) {
           localStorage.removeItem('token');
           router.push({ name: 'login' });
      }
  }
  
  onMounted(() => {
    if (!localStorage.getItem('token')) {
      router.push({ name: 'login' });
    }
  });
  </script>
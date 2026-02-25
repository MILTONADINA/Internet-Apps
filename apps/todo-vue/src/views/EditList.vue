<template>
    <div>
      <h2>Edit Todo List</h2>
      <div v-if="listData">
        <form @submit.prevent="handleUpdateList" class="list-name-form">
          <label for="listName">List Name:</label>
          <input type="text" id="listName" v-model="listData.name" required />
          <button type="submit">Update Name</button>
           <router-link :to="{ name: 'lists' }" style="margin-left: 10px;">Back to Lists</router-link>
        </form>
        <p v-if="listUpdateMessage" :class="{ error: listUpdateError }">{{ listUpdateMessage }}</p>
  
        <hr style="margin: 30px 0;">
  
        <h3>List Items</h3>
        <p v-if="itemErrorMessage" class="error">{{ itemErrorMessage }}</p>
        <table>
           <thead>
               <tr>
                   <th>Complete</th>
                   <th>Name</th>
                   <th>Description</th>
                   <th>Actions</th>
               </tr>
           </thead>
           <tbody>
              <tr v-for="item in items" :key="item.id">
                  <td><input type="checkbox" :checked="item.state === 'complete'" @change="toggleItemComplete(item)"></td>
                  <td><input type="text" v-model="item.name"></td>
                  <td><input type="text" v-model="item.description"></td>
                  <td>
                      <button @click="handleUpdateItem(item)">Save</button>
                      <button @click="handleDeleteItem(item.id)" class="delete">Delete</button>
                  </td>
              </tr>
              <tr>
                   <td></td>
                   <td><input type="text" placeholder="New item name" v-model="newItem.name"></td>
                   <td><input type="text" placeholder="New item description" v-model="newItem.description"></td>
                   <td><button @click="handleAddItem">Add Item</button></td>
               </tr>
           </tbody>
        </table>
  
      </div>
      <p v-else-if="errorMessage" class="error">{{ errorMessage }}</p>
       <p v-else>Loading list details...</p>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import TodoServices from '@/services/TodoServices.js';
  
  const props = defineProps({
    id: {
      type: [String, Number],
      required: true,
    }
  });
  
  const router = useRouter();
  const listData = ref(null);
  const items = ref([]);
  const newItem = reactive({ name: '', description: '' });
  
  const errorMessage = ref('');
  const listUpdateMessage = ref('');
  const listUpdateError = ref(false);
  const itemErrorMessage = ref('');
  
  
  async function fetchListDetails(listId) {
    errorMessage.value = '';
    listData.value = null;
    try {
      const response = await TodoServices.getList(listId);
       listData.value = response.data.list || null;
       if (!listData.value) errorMessage.value = 'List not found.';
    } catch (error) {
      console.error(error);
      errorMessage.value = 'Failed to load list details.';
      handleAuthError(error);
    }
  }
  
   async function fetchListItems(listId) {
      itemErrorMessage.value = '';
      items.value = [];
      try {
           const response = await TodoServices.getListItems(listId);
           items.value = response.data.items || [];
      } catch (error) {
           console.error(error);
           itemErrorMessage.value = 'Failed to load list items.';
           handleAuthError(error);
      }
   }
  
  async function handleUpdateList() {
      listUpdateMessage.value = '';
      listUpdateError.value = false;
      if (!listData.value || !listData.value.name.trim()) {
          listUpdateMessage.value = 'List name cannot be empty.';
          listUpdateError.value = true;
          return;
      }
      try {
          await TodoServices.updateList(props.id, { name: listData.value.name });
          listUpdateMessage.value = 'List name updated!';
          setTimeout(() => listUpdateMessage.value = '', 3000);
      } catch(error) {
           console.error(error);
           listUpdateMessage.value = 'Error updating list name.';
           listUpdateError.value = true;
           handleAuthError(error);
      }
  }
  
  async function handleUpdateItem(item) {
      itemErrorMessage.value = '';
      const itemData = {
          name: item.name,
          description: item.description,
          state: item.state
      };
       try {
           await TodoServices.updateListItem(props.id, item.id, itemData);
           
       } catch (error) {
           console.error(error);
           itemErrorMessage.value = `Failed to update item.`;
           handleAuthError(error);
           fetchListItems(props.id); 
       }
  }
  
   async function handleDeleteItem(itemId) {
      itemErrorMessage.value = '';
       if (!confirm('Are you sure?')) return;
       try {
           await TodoServices.deleteListItem(props.id, itemId);
           fetchListItems(props.id);
       } catch (error) {
           console.error(error);
           itemErrorMessage.value = 'Failed to delete item.';
           handleAuthError(error);
       }
   }
  
   async function handleAddItem() {
      itemErrorMessage.value = '';
       if (!newItem.name.trim()) {
          itemErrorMessage.value = 'New item name cannot be empty.';
          return;
       }
       const itemToAdd = {
          name: newItem.name,
          description: newItem.description || '',
          state: 'in-progress'
       };
       try {
          await TodoServices.addListItem(props.id, itemToAdd);
          newItem.name = '';
          newItem.description = '';
          fetchListItems(props.id);
       } catch (error) {
           console.error(error);
           itemErrorMessage.value = 'Failed to add item.';
           handleAuthError(error);
       }
   }
  
   function toggleItemComplete(item) {
      item.state = (item.state === 'complete') ? 'in-progress' : 'complete';
      handleUpdateItem(item); 
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
    } else {
       fetchListDetails(props.id);
       fetchListItems(props.id);
    }
  });
  </script>
  
  <style scoped>
   .list-name-form {
      margin-bottom: 20px;
      display: flex;
      align-items: center;
   }
    .list-name-form label {
       margin-right: 10px;
       margin-bottom: 0; 
    }
    table input[type="text"] {
        width: 95%;
    }
  </style>
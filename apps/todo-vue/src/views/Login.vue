<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <div>
          <label for="username">Username:</label>
          <input type="text" id="username" v-model="loginData.username" required />
        </div>
        <div>
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginData.password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="loginError" class="error">{{ loginError }}</p>
      </form>
  
      <hr style="margin: 30px 0;">
  
      <h2>Create Account</h2>
      <form @submit.prevent="handleAddUser">
         <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" v-model="newUser.firstName" />
        </div>
         <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" v-model="newUser.lastName" />
        </div>
        <div>
          <label for="newUsername">Username:</label>
          <input type="text" id="newUsername" v-model="newUser.username" required />
        </div>
        <div>
          <label for="newPassword">Password:</label>
          <input type="password" id="newPassword" v-model="newUser.password" required />
        </div>
        <button type="submit">Create Account</button>
         <p v-if="addUserMessage" :class="{ error: addUserError }">{{ addUserMessage }}</p>
      </form>
    </div>
  </template>
  
  <script setup>
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import TodoServices from '@/services/TodoServices.js';
  
  const router = useRouter();
  
  const loginData = reactive({
    username: '',
    password: '',
  });
  const loginError = ref('');
  
  const newUser = reactive({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  });
  const addUserMessage = ref('');
  const addUserError = ref(false);
  
  async function handleLogin() {
    loginError.value = '';
    try {
      const response = await TodoServices.loginUser(loginData);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        router.push({ name: 'lists' });
      } else {
        loginError.value = 'Login failed.';
      }
    } catch (error) {
      console.error(error);
      loginError.value = 'Login failed. Check credentials.';
      localStorage.removeItem('token');
    }
  }
  
  async function handleAddUser() {
      addUserMessage.value = '';
      addUserError.value = false;
      try {
          const response = await TodoServices.addUser(newUser);
          if (response.data.token) {
               addUserMessage.value = 'Account created successfully! Please log in.';
               newUser.firstName = '';
               newUser.lastName = '';
               newUser.username = '';
               newUser.password = '';
               setTimeout(() => { addUserMessage.value = '' }, 3000);
          } else {
               addUserMessage.value = 'Account creation failed.';
               addUserError.value = true;
          }
      } catch (error) {
          console.error(error);
          addUserMessage.value = 'Account creation failed. Username might be taken.';
          addUserError.value = true;
      }
  }
  </script>
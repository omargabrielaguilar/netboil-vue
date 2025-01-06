<template>
  <div>
    <h1>User</h1>

    <form @submit.prevent="createUser">
      <input v-model="newUser.firstName" type="text" placeholder="First Name" required />
      <input v-model="newUser.lastName" type="text" placeholder="Last Name" required />
      <input v-model="newUser.email" type="email" placeholder="Email" required />
      <button type="submit">Create User</button>
    </form>

    <div v-if="users.length > 0">
      <ul>
        <li v-for="user in users" :key="user.id">
          {{ user.firstName }} {{ user.lastName }} - {{ user.email }}
          <button @click="deleteUser(user.id)">Delete</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default defineComponent({
  setup() {
    const users = ref<User[]>([]);
    const newUser = ref<User>({ id: '', firstName: '', lastName: '', email: '' });

    // Fetch all users on mount
    onMounted(async () => {
      try {
        const response = await axios.get('/api/users');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });

    // Create a new user
    const createUser = async () => {
      try {
        const response = await axios.post('/api/users', newUser.value);
        users.value.push(response.data);
        newUser.value = { id: '', firstName: '', lastName: '', email: '' }; // reset form
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    // Delete user
    const deleteUser = async (id: string) => {
  try {
    await axios.delete(`/api/users/${id}`);
    users.value = users.value.filter(user => user.id !== id);
  } catch (error) {
    console.error('Error deleting user:', error);
  }
};

    return {
      users,
      newUser,
      createUser,
      deleteUser
    };
  }
});
</script>

<style scoped>
form {
  margin-bottom: 20px;
}
input {
  margin: 5px;
  padding: 8px;
}
button {
  margin: 5px;
  padding: 8px;
  cursor: pointer;
}
</style>

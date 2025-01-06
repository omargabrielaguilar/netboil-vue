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
          <button @click="editUser(user)">Edit</button>
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
      const response = await axios.get('/api/users');
      users.value = response.data;
    });

    // Create a new user
    const createUser = async () => {
      const response = await axios.post('/api/users', newUser.value);
      users.value.push(response.data);
      newUser.value = { id: '', firstName: '', lastName: '', email: '' }; // reset form
    };

    // Edit user (could open a modal for example)
    const editUser = (user: User) => {
      newUser.value = { ...user };
    };

    // Delete user
    const deleteUser = async (id: string) => {
      await axios.delete(`/api/users/${id}`);
      users.value = users.value.filter(user => user.id !== id);
    };

    return {
      users,
      newUser,
      createUser,
      editUser,
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

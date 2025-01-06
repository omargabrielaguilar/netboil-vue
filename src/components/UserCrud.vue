<template>
  <div class="container">
    <h1>Usuario Boilerplate</h1>

    <form @submit.prevent="createUser" class="user-form">
      <input v-model="newUser.firstName" type="text" placeholder="Nombre" required />
      <input v-model="newUser.lastName" type="text" placeholder="Apellidos" required />
      <input v-model="newUser.email" type="email" placeholder="Email" required />
      <button type="submit" class="btn btn-primary">Crear Usuario</button>
    </form>

    <div v-if="users.length > 0" class="user-list">
      <h2>Usuarios</h2>
      <ul>
        <li v-for="user in users" :key="user.id" class="user-item">
          <div class="user-info">
            <span class="user-name">{{ user.firstName }} {{ user.lastName }}</span>
            <span class="user-email">{{ user.email }}</span>
          </div>
          <button class="btn btn-danger" @click="deleteUser(user.id)">
            Eliminar
          </button>
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

    onMounted(async () => {
      try {
        const response = await axios.get('/api/users');
        users.value = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    });

    const createUser = async () => {
      try {
        const response = await axios.post('/api/users', newUser.value);
        users.value.push(response.data);
        newUser.value = { id: '', firstName: '', lastName: '', email: '' };
      } catch (error) {
        console.error('Error creating user:', error);
      }
    };

    const deleteUser = async (id: string) => {
      try {
        await axios.delete(`/api/users/${id}`);
        users.value = users.value.filter((user) => user.id !== id);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    };

    return {
      users,
      newUser,
      createUser,
      deleteUser,
    };
  },
});
</script>

<style scoped>
/* General Container */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
}

/* Header */
h1 {
  color: #333;
  font-size: 2rem;
  margin-bottom: 1rem;
}

/* Form Styles */
.user-form {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

.user-form input {
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

.user-form .btn {
  padding: 10px 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Button Styles */
.btn-primary {
  background-color: #4caf50;
  color: white;
}

.btn-danger {
  background-color: #f44336;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}

/* User List */
.user-list {
  margin-top: 20px;
  text-align: left;
}

.user-list h2 {
  font-size: 1.5rem;
  color: #555;
  margin-bottom: 10px;
}

.user-list ul {
  list-style: none;
  padding: 0;
}

.user-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: bold;
  font-size: 1.1rem;
  color: #333;
}

.user-email {
  font-size: 0.9rem;
  color: #666;
}

/* Hover Effect */
.user-item:hover {
  background-color: #f1f1f1;
}
</style>

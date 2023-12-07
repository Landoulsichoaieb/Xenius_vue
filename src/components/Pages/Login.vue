<template>
    <div class="login-container">
    <h1>Login</h1>
      <form @submit.prevent="login">
        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" v-model="credentials.email" placeholder="Email" required>
        </div>
        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" v-model="credentials.password" placeholder="Password" required>
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'Login',
    data() {
      return {
        credentials: {
          email: '',
          password: ''
        },
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8000/api/login', this.credentials);
          
          
          if (response.data.error) {
            this.errorMessage = response.data.error;
          } else {
            this.$router.push('/Dashboard');
            localStorage.setItem('token', response.data.token);
            
          }
        } catch (error) {
          console.error('Login error', error);
          this.errorMessage = 'Error occurred during login.';
        }
      }
    }
  };
  </script>
  
  
  
  <style scoped>

.login-container {
    background-color: #f5f5f5; 
    width: 300px;
    max-width: 500px;
    margin: auto;
    padding: 1em;
    border:solid 1px #aaa;
    border-radius:5px;
  }
  
  .form-group {
    margin-bottom: 1em;
  }
  
  label {
    display: block;
    margin-bottom: .5em;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: .5em;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    width: 100%;
    padding: .5em;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
  }
  </style>
  
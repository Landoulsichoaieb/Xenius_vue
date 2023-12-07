<template>
    <div class="container-fluid">
      <div class="row">
        <!-- Sidebar -->
        <div class="col-md-2 bg-light sidebar">
          <ul class="nav flex-column">
            <li class="nav-item"><router-link class="nav-link" to="/dashboard">Dashboard</router-link></li>
            <li class="nav-item">
                <button class="nav-link" @click="logout">Logout</button>
            </li>
            <!-- Add more sidebar items here -->
          </ul>
        </div>
  
        <!-- Main content -->
        <div class="col-md-10 main-content">
          <h1>Dashboard</h1>
          <ul v-if="offers.length > 0">
            <li v-for="offer in offers" :key="offer.id">
                <!-- Display properties of the offer as needed -->
                Offer owner: {{ offer.user.name }}, Offer title: {{ offer.title }}, Offer description: {{ offer.description }}
            </li>
        </ul>
        <p v-else>No offers available yet.</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
 import axios from 'axios';

export default {
  name: 'Dashboard',
  methods: {
    async logout() {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('No token found');
          return;
        }
        
        await axios.post('http://localhost:8000/api/logout', {}, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        localStorage.removeItem('token');
        this.$router.push('/login');
      } catch (error) {
        if (error.response) {
          console.error('Logout failed:', error.response.data);
        } else if (error.request) {
          console.error('Request made but no response:', error.request);
        } else {
          console.error('Error:', error.message);
        }
      }
    }
  },
  data() {
    return {
        offers: [],
    };
},
mounted() {
    console.log('Component mounted');
    this.fetchUserOffers(); 
},
methods: {
    fetchUserOffers() {
        const token = localStorage.getItem('token');

        
        if (token) {
            
            const headers = {
                'Authorization': `Bearer ${token}`,
            };

            axios.get('http://localhost:8000/api/fetchuseroffers', { headers })
                .then(response => {
                    console.log('API Response:', response.data);
                    this.offers = response.data.applies;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            
            console.error('Token not found in localStorage.');
        }
    },
},

};

  </script>
  
  <style scoped>
  .sidebar {
    min-height: 100vh;
    padding-top: 20px;
    border-right: 1px solid #ddd; /* subtle border line for the sidebar */
  }
  
  .nav-item {
    margin: 10px 0; /* Spacing between navigation items */
  }
  
  .nav-link {
    color: #333; /* Color of the navigation links */
    transition: color 0.3s ease;
  }
  
  .nav-link:hover {
    color: #007bff; /* Color of links on hover */
  }
  
  .main-content {
    padding: 20px;
    background-color: #f8f9fa; /* Light background for the content area */
  }
  
  .main-content h1 {
    color: #333; /* Color for the main header */
    margin-bottom: 20px; /* Spacing below the header */
  }
  </style>
  
<template>
  <div id="app" class="app-container">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
  
};
</script>

<style>
/* Global styles */
.app-container {
  padding: 20px;
  margin: auto;
  width:100vw;
  max-width: 90%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}


</style>

<template>
  <div id="app">
      <div v-if="$autenticado" id="nav">
        <a href="#" @click="logout" >Sair</a>
      </div>
      <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      autenticado: firebase.auth().currentUser
    };
  },
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace("login");
        });
    }
  }
};
</script>

<style>
html,
body,
#app {
  height: 100%;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}

#nav {
  padding-top: 20px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.active {
  font-weight: normal !important;
}
</style>

<template>
  <div id="app">
    <div id="nav">
      <vs-breadcrumb color="#000" align="center">
        <li>
          <router-link to="/" :class="setActive('login')">{{
            home
          }}</router-link>
          <span class="vs-breadcrum--separator" v-if="!setActive('login')"
            >/</span
          >
        </li>
        <li v-if="setActive('home')">
          <router-link to="/home" :class="setActive('home')"
            >Início</router-link
          >
          <span class="vs-breadcrum--separator" v-if="!setActive('home')"
            >/</span
          >
        </li>
      </vs-breadcrumb>
    </div>
    <router-view />
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      home: "Entrar"
    };
  },
  methods: {
    setActive(url) {
      if (url === window.location.hash.replace("#/", "")) return "active";
    }
  },
  updated() {
    this.home = firebase.auth().currentUser.uid ? "Sair" : "Entrar";
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

.active {
  font-weight: normal !important;
}
</style>

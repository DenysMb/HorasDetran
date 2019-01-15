<template>
  <div id="app">
    <div id="nav">
      <vs-breadcrumb
        color="#000"
        :items="
           [
             {
               title: 'Entrar',
               url: '/'
             },
             {
               title: 'Início',
               url: '/home',
               active: true
             }
           ]"
        ></vs-breadcrumb>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<template>
  <vs-row style="flex: 1; justify-content: center; align-items: center; display: flex; padding: 20px;">
    <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4" vs-sm="12">
      <vs-card>
      <div slot="header">
        <h3>Entrar</h3>
      </div>
      <div>
        <vs-input class="input fullWidth" placeholder="E-mail" color="dark" v-model="email" type="email" />
        <vs-input class="input fullWidth" placeholder="Senha" color="dark" v-model="password" type="password" />
        <vs-button class="button fullWidth" color="dark" type="filled" @click="login">Entrar</vs-button>
        <small>Não tem cadastro? <router-link to="/sign-up">Clique aqui para se cadastrar!</router-link></small>
      </div>
    </vs-card>
    </vs-col>
  </vs-row>
</template>

<script>
import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    login() {
      const { email, password } = this;
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(
          user => this.$router.replace("home"),
          err => alert("Oops. " + err.message)
        );
    }
  }
};
</script>

<style>
.input {
  margin-bottom: 10px;
}
.button {
  margin-bottom: 10px;
}
.fullWidth {
  width: 100% !important;
}
</style>

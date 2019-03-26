<template>
<vs-row style="flex: 1;">
  <vs-col vs-type="flex" vs-justify="center" vs-align="center" vs-w="4" vs-offset="4">
    <vs-card>
      <div slot="header">
        <h3>Registrar</h3>
      </div>
      <div>
        <vs-input class="input fullWidth" placeholder="E-mail" color="dark" v-model="email" type="email" />
        <vs-input class="input fullWidth" placeholder="Senha" color="dark" v-model="password" type="password" />
        <vs-button class="button fullWidth" color="dark" type="filled" @click="signUp">Registrar</vs-button>
        <small>Já tem cadastro? <router-link to="/login">Clique aqui para entrar!</router-link></small>
      </div>
    </vs-card>
  </vs-col>
</vs-row>
</template>

<script>
import firebase from "firebase";
import { db } from "../firebase.js";
export default {
  name: "SignUp",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    signUp() {
      const { email, password } = this;
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(
          user => {
            db.ref("alunos")
              .child(user.user.uid)
              .set({
                direcao: {
                  horasPagas: 0,
                  horasTotais: 16,
                  info: {
                    cor: "rgb(58, 33, 106)",
                    label: "Direção defensiva",
                    tamanho: 6
                  }
                },
                legislacao: {
                  horasPagas: 0,
                  horasTotais: 18,
                  info: {
                    cor: "rgb(198, 145, 66)",
                    label: "Legislação",
                    tamanho: 6
                  }
                },
                mecanica: {
                  horasPagas: 0,
                  horasTotais: 3,
                  info: {
                    cor: "rgb(94, 96, 74)",
                    label: "Mecânica básica",
                    tamanho: 4
                  }
                },
                meioAmbiente: {
                  horasPagas: 0,
                  horasTotais: 4,
                  info: {
                    cor: "rgb(78, 159, 45)",
                    label: "Meio ambiente",
                    tamanho: 4
                  }
                },
                primeirosSocorros: {
                  horasPagas: 0,
                  horasTotais: 4,
                  info: {
                    cor: "rgb(189, 42, 42)",
                    label: "Primeiros socorros",
                    tamanho: 4
                  }
                },
                aulaPratica: {
                  horasPagas: 0,
                  horasTotais: 25,
                  info: {
                    cor: "rgb(2,136,209)",
                    label: "Aula prática",
                    tamanho: 12
                  }
                }
              })
              .then(() => this.$router.replace("home"));
          },
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

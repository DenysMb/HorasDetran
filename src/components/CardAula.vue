<template>
  <vs-card>
    <div slot="header">
      <h3 :style="'color:' + color">{{ title }}</h3>
    </div>
    <div>
      <h3>{{ horasPagas }}h de {{ horasTotais }}h</h3>
      <div style="padding: 10px 0;">Última aula:</div>
      <small :style="'color:' + color" v-if="horasTotais - horasPagas === 0"
        >Parabéns, você terminou essa disciplina!</small
      >
      <small :style="'color:' + color" v-if="horasTotais - horasPagas === 1"
        >Falta {{ horasTotais - horasPagas }}h</small
      >
      <small :style="'color:' + color" v-else
        >Faltam {{ horasTotais - horasPagas }}h</small
      >
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
        <vs-button :color="color" icon="access_time"></vs-button>
        <vs-button
          color="#5b5b5b"
          icon="add"
          style="margin-left: 5px;"
          @click="open = true"
          vs-accept-text="Salvar"
        ></vs-button>
      </vs-row>
    </div>

    <vs-prompt
      @vs-accept="acceptAlert"
      @vs-cancel="open = false"
      :vs-active.sync="open"
      :vs-color="color"
      :vs-title="title"
      :vsButtonsHidden="true"
    >
      <div>
        <vs-input v-model="time" type="time" style="width: 100%;" />
        <vs-input
          v-model="date"
          type="date"
          style="width: 100%; margin-top: 10px;"
        />
        <vs-button
          @click="save"
          :color="color"
          style="margin: 10px 0; width: 100%;"
          >Salvar</vs-button
        >
      </div>
    </vs-prompt>
  </vs-card>
</template>

<script>
import { db } from "../firebase.js";
import firebase from "firebase";
export default {
  props: {
    chave: String,
    title: String,
    horasPagas: { default: 0, type: Number },
    horasTotais: { default: 0, type: Number },
    color: { default: "primary", type: String }
  },
  firebase: {
    alunos: db.ref("alunos")
  },
  data() {
    return {
      disciplinas: [],
      time: "",
      date: "",
      open: false,
      valueInput: ""
    };
  },
  methods: {
    acceptAlert() {
      this.$vs.notify({
        color: this.color,
        title: "Horário adicionado",
        text: "Horário adicionado com sucesso"
      });
    },
    save() {
      let disciplina = db.ref(
        "alunos/" + firebase.auth().currentUser.uid + "/" + this.chave
      );

      disciplina
        .child("aulas")
        .push({
          data: this.date,
          hora: this.time
        })
        .then(() =>
          disciplina.child("aulas").on("value", res => {
            disciplina.update({ horasPagas: Object.keys(res.val()).length });
            this.open = false;
            this.acceptAlert();
          })
        );
    }
  },
  created() {
    if (firebase.auth().currentUser.uid) {
      this.$firebaseRefs.alunos
        .child(firebase.auth().currentUser.uid)
        .on("value", res => {
          this.disciplinas = res.val();
        });
    }
  },
  updated() {
    if (document.getElementsByClassName("con-title-after")) {
      document.getElementsByClassName(
        "con-title-after"
      )[0].style.color = this.color;
      document.getElementsByClassName("con-title-after")[0].style[
        "font-family"
      ] =
        "'Avenir', Helvetica, Arial, sans-serif";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.content-noti {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>

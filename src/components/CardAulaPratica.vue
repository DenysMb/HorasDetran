<template>
  <vs-card>
    <div slot="header">
      <h3 :style="'color:' + color">{{ title }}</h3>
    </div>
    <div style="margin-bottom: 30px">
      <h3>{{ horasPagas }}h de {{ horasTotais }}h</h3>
      <small :style="'color:' + color" v-if="horasTotais - horasPagas <= 0"
      >Parabéns, você terminou essa disciplina! - 100%
      </small
      >
      <small :style="'color:' + color" v-if="horasTotais - horasPagas === 1"
      >Falta {{ horasTotais - horasPagas }}h -
        {{ Math.round((horasPagas * 100) / horasTotais) }}%
      </small
      >
      <small :style="'color:' + color" v-if="horasTotais - horasPagas > 1"
      >Faltam {{ horasTotais - horasPagas }}h
      </small
      >
      <div class="aulas" v-if="aulas">
        <div class="aula" v-for="(aula, key) in sortedAulas" :key="'aula-' + key">
          <div class="aula-title" :style="aula.complete && 'text-decoration-line:line-through;'">
            {{ formatDate(aula.date) }} - {{ aula.title }}
          </div>
          <vs-button @click="checkOrUncheck(aula.key, aula.complete)"
            class="aula-button"
            color="#616161"
            type="filled"
            :icon="aula.complete ? 'check_box' : 'check_box_outline_blank'"></vs-button>
          <vs-button @click="removeDate(aula.key)"
            class="aula-button"
            color="#D32F2F"
            type="filled"
            icon="delete"></vs-button>
        </div>
      </div>
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
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
        <vs-input v-model="time" type="time" style="width: 100%;"/>
        <vs-input
          v-model="date"
          type="date"
          style="width: 100%; margin-top: 10px;"
        />
        <vs-button
          @click="save"
          :color="color"
          style="margin: 10px 0; width: 100%;"
        >Salvar
        </vs-button
        >
      </div>
    </vs-prompt>
  </vs-card>
</template>

<script>
  import {db} from "../firebase.js";
  import firebase from "firebase";
  import moment from "moment";
  import sortBy from "lodash.sortby";

  export default {
    props: {
      aulas: Object,
      chave: String,
      title: String,
      horasPagas: {default: 0, type: Number},
      horasTotais: {default: 0, type: Number},
      ultimaAula: {default: 'Nunca', type: String},
      color: {default: "primary", type: String}
    },
    firebase: {
      alunos: db.ref("alunos")
    },
    data() {
      return {
        events: [],
        disciplinas: [],
        time: "",
        date: "",
        open: false,
        openCalendar: false
      };
    },
    computed: {
      sortedAulas() {
        Object.keys(this.aulas).map(key => (this.aulas[key].key = key))
        return sortBy(this.aulas, 'date');
      }
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
            title: this.title + " - " + this.time,
            date: this.date.replace(/-/g, "/"),
            complete: false
          })
          .then(() => {
            this.open = false;
            this.acceptAlert();
          });
      },
      removeDate(key) {
        let disciplina = db.ref(
          "alunos/" + firebase.auth().currentUser.uid + "/" + this.chave
        );

        key && disciplina
          .child("aulas")
          .child(key)
          .remove();
      },
      checkOrUncheck(key, complete) {
        let disciplina = db.ref(
          "alunos/" + firebase.auth().currentUser.uid + "/" + this.chave
        );

        key && disciplina
          .child("aulas")
          .child(key)
          .update({complete: !complete})
          .then(() => {
            if (!complete) {
              disciplina.update({horasPagas: this.horasPagas + 1});
            } else {
              if (this.horasPagas > 0)
                disciplina.update({horasPagas: this.horasPagas - 1});
            }
          });
      },
      formatDate(date) {
        moment.locale("pt-br");
        let momentDate = moment(date);
        if (momentDate.isValid())
          return momentDate.format("ll");
        else
          return false
      }
    },
    created() {
      Object.keys(this.aulas).map(key => (this.aulas[key].key = key))
      if (firebase.auth().currentUser.uid) {
        this.$firebaseRefs.alunos
          .child(firebase.auth().currentUser.uid)
          .on("value", res => {
            this.disciplinas = res.val();
          });
        this.$firebaseRefs.alunos
          .child(firebase.auth().currentUser.uid)
          .child(this.chave)
          .child("aulas")
          .on("value", res => {
            if (res.val()) {
              let arr = [];
              Object.keys(res.val()).map(key => {
                arr.push(Object.assign(res.val()[key], {key}));
              });
              this.events = arr.sort(function (a, b) {
                return new Date(a.date).getTime() - new Date(b.date).getTime();
              });
            }
          });
      }
    },
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .content-noti {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .vs-dialog {
    max-width: 1220px !important;
    max-height: 98% !important;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
  }

  .date-num {
    color: inherit !important;
  }

  .event-item {
    padding: 10px !important;
  }

  .aulas {
    padding-top: 10px;
    display: flex;
    flex-direction: column;
  }

  .aula {
    display: flex;
    background: #fafafa;
    border: 1px solid rgb(236, 239, 241);
    border-radius: 5px;
    padding: 10px;
    margin-bottom: 10px;
    align-items: center;
  }

  .aula-button {
    margin-left: 10px;
  }

  .aula-title {
    flex: 1;
  }

  .vs-card--content {
    margin-bottom: 0px !important;
  }

  @media only screen and (max-width: 600px) {
    .vs-dialog {
      overflow-y: auto !important;
    }
  }
</style>

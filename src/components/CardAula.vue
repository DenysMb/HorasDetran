<template>
  <vs-card>
    <div slot="header">
      <h3 :style="'color:' + color">{{ title }}</h3>
    </div>
    <div style="margin-bottom: 10px">
      <h3>{{ horasPagas }}h de {{ horasTotais }}h</h3>
      <div v-if="ultimaAula" style="padding: 10px 0;">
        <strong>Última aula:</strong> {{`${formatDate(ultimaAula.date)} às ${ultimaAula.title.split('-')[1]}h` || 'Nunca'}}
      </div>
      <small :style="'color:' + color" v-if="horasTotais - horasPagas <= 0"
        >Parabéns, você terminou essa disciplina! - 100%</small
      >
      <small :style="'color:' + color" v-if="horasTotais - horasPagas === 1"
        >Falta {{ horasTotais - horasPagas }}h -
        {{ Math.round((horasPagas * 100) / horasTotais) }}%</small
      >
      <small :style="'color:' + color" v-if="horasTotais - horasPagas > 1"
        >Faltam {{ horasTotais - horasPagas }}h -
        {{ Math.round((horasPagas * 100) / horasTotais) }}%</small
      >
      <vs-progress
        :percent="Math.round((horasPagas * 100) / horasTotais)"
        :color="color"
      ></vs-progress>
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
        <vs-button
          :color="color"
          icon="access_time"
          @click="openCalendar = true"
        ></vs-button>
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

    <vs-prompt
      @vs-cancel="openCalendar = false"
      :vs-active.sync="openCalendar"
      :vs-color="color"
      :vs-title="title"
      :vsButtonsHidden="true"
      style="overflow-y: auto;"
    >
      <vue-event-calendar :events="events" :title="title" :color="color">
        <template scope="props">
          <div v-for="(event, index) in props.showEvents" class="event-item">
            <div style="display: flex; align-items: center;">
              <small style="color: #999; margin-right: 8px;"
                >({{ formatDate(event.date) }})</small
              >
              <h3 style="flex: 1;">{{ event.title }}</h3>
              <vs-button
                @click="removeDate(event.key)"
                :color="color"
                icon="delete"
              ></vs-button>
            </div>
          </div>
        </template>
      </vue-event-calendar>
    </vs-prompt>
  </vs-card>
</template>

<script>
import { db } from "../firebase.js";
import firebase from "firebase";
import moment from "moment";
export default {
  props: {
    chave: String,
    title: String,
    ultimaAula: Object | Boolean,
    horasPagas: { default: 0, type: Number },
    horasTotais: { default: 0, type: Number },
    color: {default: "primary", type: String},
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
          date: this.date.replace(/-/g, "/")
        })
        .then(res => {
          // disciplina.child("aulas/" + res.key).set({ key: res.key });
          disciplina.child("aulas").on("value", res => {
            disciplina.update({ horasPagas: Object.keys(res.val()).length });
            this.open = false;
            this.acceptAlert();
          });
        });
    },
    removeDate(key) {
      let disciplina = db.ref(
        "alunos/" + firebase.auth().currentUser.uid + "/" + this.chave
      );

      disciplina
        .child("aulas")
        .child(key)
        .remove()
        .then(() => {
          disciplina.child("aulas").on("value", res => {
            disciplina.update(
              { horasPagas: Object.keys(res.val()).length } || 0
            );
            this.openCalendar = false;
          });
        });
    },
    formatDate(date) {
      moment.locale("pt-br");
      let momentDate = moment(date);
      if(momentDate.isValid())
        return momentDate.format("ll");
      else
        return false
    }
  },
  created() {
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
              arr.push(Object.assign(res.val()[key], { key }));
            });
            this.events = arr.sort(function(a, b) {
              return new Date(a.date).getTime() - new Date(b.date).getTime();
            });
          }
        });
    }
  },
  updated() {
    if (document.getElementsByClassName("con-title-after") && document.getElementsByClassName(
        "con-title-after"
      )[0]) {
      document.getElementsByClassName(
        "con-title-after"
      )[0].style.color = this.color;
      document.getElementsByClassName("con-title-after")[0].style[
        "font-family"
      ] =
        "'Avenir', Helvetica, Arial, sans-serif";
    }
    if (document.getElementsByClassName("events-wrapper") && document.getElementsByClassName("events-wrapper")[0]) {
      document.getElementsByClassName(
        "events-wrapper"
      )[0].style.backgroundColor = this.color;
    }
    if (document.getElementsByClassName("is-today") && document.getElementsByClassName("is-today")[0]) {
      document.getElementsByClassName(
        "is-today"
      )[0].style.backgroundColor = this.color;
    }
    if (document.getElementsByClassName("is-event") && document.getElementsByClassName("is-event")[0]) {
      [...document.getElementsByClassName("is-event")].map(el => {
        el.style.borderColor = this.color;
      });
    }
    if (document.getElementsByClassName("event") && document.getElementsByClassName("event")[0]) {
      [...document.getElementsByClassName("event")].map(
        el => (el.style.color = this.color)
      );
    }
  }
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

.vs-card--content {
  margin-bottom: 0px !important;
}

@media only screen and (max-width: 600px) {
  .vs-dialog {
    overflow-y: auto !important;
  }
}
</style>

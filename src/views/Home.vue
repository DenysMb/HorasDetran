<template>
  <div class="about" v-if="ready">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        :vs-w="disciplina.info.tamanho"
        vs-sm="12"
        class="column"
        v-for="(disciplina, chave) in disciplinas"
        :key="chave"
      >
        <CardAula
          :chave="chave"
          :title="disciplina.info.label"
          :color="disciplina.info.cor"
          :horasPagas="disciplina.horasPagas"
          :horasTotais="disciplina.horasTotais"
          :ultimaAula="disciplina.aulas && disciplina.aulas[Object.keys(disciplina.aulas)[Object.keys(disciplina.aulas).length-1]]"
        />
      </vs-col>
    </vs-row>
    <vs-prompt
      @vs-cancel="openSimulado = false"
      :vs-active.sync="openSimulado"
      vs-title="Simlado Detran"
      :vsButtonsHidden="true"
    >
      <iframe style="border: 0px; " src="http://simulado.detran.rj.gov.br/" width="100%" height="100%"></iframe>
    </vs-prompt>
  </div>
  <div v-else>{{ $vs.loading({ color: "#000" }) }}</div>
</template>

<script>
import firebase from "firebase";
import CardAula from "@/components/CardAula";
import { db } from "../firebase.js";
export default {
  name: "Home",
  components: {
    CardAula
  },
  firebase: {
    alunos: db.ref("alunos")
  },
  data() {
    return {
      disciplinas: [],
      ready: false,
      horasPagas: 0,
      horasTotais: 0
    };
  },
  created() {
    if (firebase.auth().currentUser.uid) {
      this.$firebaseRefs.alunos
        .child(firebase.auth().currentUser.uid)
        .on("value", res => {
          Object.values(res.val()).map(obj => {
            this.horasPagas += obj.horasPagas;
            this.horasTotais += obj.horasTotais;
          });
          this.disciplinas = res.val();
          this.$vs.loading.close();
          this.ready = true;
        });
    }
  }
};
</script>

<style>
.column {
  padding: 20px;
}
.vs-dialog {
  height: 90%;
  display: flex;
  flex-direction: column;
}
.vs-dialog-text {
  flex: 1;
}
@media only screen and (max-width: 600px) {
  .vs-dialog {
    height: 96%;
  }
  .button {
    width: 100%;
  }
}
</style>

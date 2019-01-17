<template>
  <div class="about" v-if="ready">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        :vs-w="disciplina.info.tamanho"
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
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col style="padding: 0px 20px;">
        <vs-progress
          :percent="Math.round((horasPagas * 100) / horasTotais)"
          color="#000"
        ></vs-progress>
        {{ horasPagas }}h de {{ horasTotais }}h -
        {{ Math.round((horasPagas * 100) / horasTotais) }}%
      </vs-col>
    </vs-row>
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
</style>

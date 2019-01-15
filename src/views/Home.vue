<template>
  <div class="about" v-if="ready">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        :vs-w="disciplina.info.tamanho"
        class="column"
        v-for="disciplina in disciplinas"
      >
        <CardAula
          :title="disciplina.info.label"
          :color="disciplina.info.cor"
          :horasPagas="disciplina.horasPagas"
          :horasTotais="disciplina.horasTotais"
        />
      </vs-col>
    </vs-row>
  </div>
  <div v-else>
    Carregando...
  </div>
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
  data() {
    return {
      disciplinas: [],
      ready: false
    };
  },
  created() {
    this.$bind("disciplinas", db.ref(firebase.auth().currentUser.uid)).then(
      res => {
        this.res === res;
        this.ready = true;
      }
    );
  }
};
</script>

<style>
.column {
  padding: 20px;
}
</style>

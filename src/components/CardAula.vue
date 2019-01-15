<template>
  <vs-card>
    <div slot="header">
      <h3 :style="'color:' + textColor">{{ title }}</h3>
    </div>
    <div>
      <h3>{{ horasPagas }}h de {{ horasTotais }}h</h3>
      <div style="padding: 10px 0;">Última aula:</div>
      <small :style="'color:' + textColor" v-if="horasTotais - horasPagas === 0"
        >Parabéns, você terminou essa disciplina!</small
      >
      <small :style="'color:' + textColor" v-if="horasTotais - horasPagas === 1"
        >Falta {{ horasTotais - horasPagas }}h</small
      >
      <small :style="'color:' + textColor" v-else
        >Faltam {{ horasTotais - horasPagas }}h</small
      >
    </div>
    <div slot="footer">
      <vs-row vs-justify="flex-end">
        <vs-button :color="btnColor" icon="access_time"></vs-button>
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
      :vs-color="textColor"
      :vs-title="title"
      vs-accept-text="Salvar"
      vs-cancel-text="Cancelar"
    >
      <div>
        <vs-input v-model="time" type="time" style="width: 100%;" />
        <vs-input
          v-model="date"
          type="date"
          style="width: 100%; margin-top: 10px;"
        />
      </div>
    </vs-prompt>
  </vs-card>
</template>

<script>
export default {
  props: {
    title: String,
    textColor: String,
    horasPagas: { default: 0, type: Number },
    horasTotais: { default: 0, type: Number },
    btnColor: { default: "primary", type: String }
  },
  data() {
    return {
      time: "",
      date: "",
      open: false,
      valueInput: ""
    };
  },
  methods: {
    acceptAlert() {
      this.$vs.notify({
        color: this.textColor,
        title: "Horário adicionado",
        text: "Horário adicionado com sucesso"
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>

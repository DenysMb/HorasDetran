<template>
  <div class="about">
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="6"
        class="column"
      >
        <CardAula
          title="Legislação"
          btnColor="#c69142"
          textColor="#c69142"
          :horasPagas="6"
          :horasTotais="18"
        />
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="6"
        class="column"
      >
        <CardAula
          title="Direção defensiva"
          btnColor="#3a216a"
          textColor="#3a216a"
          :horasPagas="9"
          :horasTotais="16"
        />
      </vs-col>
    </vs-row>
    <vs-row>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        class="column"
      >
        <CardAula
          title="Mecânica básica"
          btnColor="#5e604a"
          textColor="#5e604a"
          :horasPagas="3"
          :horasTotais="4"
        />
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        class="column"
      >
        <CardAula
          title="Primeiros socorros"
          btnColor="#bd2a2a"
          textColor="#bd2a2a"
          :horasPagas="0"
          :horasTotais="4"
        />
      </vs-col>
      <vs-col
        vs-type="flex"
        vs-justify="center"
        vs-align="center"
        vs-w="4"
        class="column"
      >
        <CardAula
          title="Meio ambiente"
          btnColor="#4e9f2d"
          textColor="#4e9f2d"
          :horasPagas="1"
          :horasTotais="4"
        />
      </vs-col>
    </vs-row>
  </div>
</template>

<script>
import CardAula from "@/components/CardAula";
export default {
  components: {
    CardAula
  }
};
</script>

<style>
.column {
  padding: 20px;
}
</style>

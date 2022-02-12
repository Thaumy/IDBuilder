<template>
  <div>
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field
          outlined
          label="SecTimeStamp"
          prepend-inner-icon="mdi-alpha-s-box"
          v-model="UUID"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          outlined
          label="MiliSecTimeStamp"
          prepend-inner-icon="mdi-alpha-m-box"
          v-model="Palaflake"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="2">
        <v-text-field outlined label="UTC+"></v-text-field>
      </v-col>
    </v-row>
  </div>
  <v-row justify="center">
    <v-btn width="50%" height="32px" v-on:click="INIT()">REGEN</v-btn>
  </v-row>
</template>

<script>
export default {
  name: "TimeView",
};
</script>

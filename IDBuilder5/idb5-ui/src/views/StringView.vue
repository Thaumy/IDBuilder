<template>
  <div>
    <v-textarea label="Src" prepend-inner-icon="mdi-alpha-p-box" v-model="Palaflake"></v-textarea>

    <v-row class="mt-n10" justify="center">
      <v-col cols="2">
        <v-checkbox v-model="to_upper" label="To Upper"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="to_lower" label="To Lower"></v-checkbox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn width="50%" class="mt-n6 mb-8" v-on:click="INIT()">PROCESS</v-btn>
    </v-row>
    <v-textarea label="Res" prepend-inner-icon="mdi-alpha-p-box" v-model="Palaflake"></v-textarea>
  </div>
</template>

<script>
export default {
  name: "StringView",
};
</script>

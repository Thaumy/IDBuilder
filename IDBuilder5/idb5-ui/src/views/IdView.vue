<template>
  <div>
    <v-row>
      <v-col cols="4">
        <v-text-field outlined label="UUID" prepend-inner-icon="mdi-alpha-u-box" v-model="UUID"></v-text-field>

        <v-text-field
          outlined
          label="Palaflake"
          prepend-inner-icon="mdi-alpha-p-box"
          v-model="Palaflake"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-text-field
          outlined
          label="YMD_XXXX"
          prepend-inner-icon="mdi-calendar-month"
          v-model="YMD_XXXX"
        ></v-text-field>
        <v-text-field outlined label="YMD" prepend-inner-icon="mdi-calendar-month" v-model="YMD"></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-text-field outlined label="RndNumber" prepend-inner-icon="mdi-tilde" v-model="RndNumber"></v-text-field>
        <v-text-field outlined label="RndString" prepend-inner-icon="mdi-tilde" v-model="RndString"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="3">
        <v-text-field
          outlined
          label="Palaflake Seed"
          prepend-inner-icon="mdi-alpha-s-box"
          v-model="Palaflake_seed"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="no_joiner_uuid" label="No Joiner UUID"></v-checkbox>
      </v-col>
    </v-row>
  </div>
  <v-row justify="center">
    <v-btn width="50%" height="32px" v-on:click="INIT()">REGEN</v-btn>
  </v-row>
</template>

<script>
export default {
  name: "IdView",
  data() {
    return {
      UUID: "",
      Palaflake: "",
      YMD_XXXX: "",
      YMD: "",
      RndNumber: "",
      RndString: "",
    };
  },
};
</script>

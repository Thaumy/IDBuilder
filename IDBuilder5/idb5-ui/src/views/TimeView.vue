<template>
  <div>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field
            outlined
            label="SecTimeStamp"
            prepend-inner-icon="mdi-alpha-s-box"
            v-model="UUID"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            outlined
            label="MiliSecTimeStamp"
            prepend-inner-icon="mdi-alpha-m-box"
            v-model="Palaflake"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-16">
      <v-col cols="6">
        <v-text-field
            outlined
            label="DB Time Format"
            prepend-inner-icon="mdi-alpha-s-box"
            v-model="UUID"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-n6">
      <v-col cols="2">
        <v-text-field outlined label="UTC+"></v-text-field>
      </v-col>
    </v-row>
    <!-- 微调使之与idView的REGEN按钮对齐  -->
    <v-row justify="center" style="margin-top: 2px">
      <v-btn width="50%" height="32px" v-on:click="INIT()">REGEN</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TimeView",
};
</script>

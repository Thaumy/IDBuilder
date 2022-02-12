<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-textarea outlined label="Text" prepend-inner-icon="mdi-alpha-t-box" v-model="Palaflake"></v-textarea>
      </v-col>
    </v-row>
    <v-row class="mt-n10" justify="center">
      <v-col cols="1">
        <v-checkbox v-model="use_md5" label="MD5"></v-checkbox>
      </v-col>
      <v-col cols="1">
        <v-checkbox v-model="use_sha1" label="SHA1"></v-checkbox>
      </v-col>
      <v-col cols="1">
        <v-checkbox v-model="use_sha256" label="SHA256"></v-checkbox>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-btn width="50%" class="mt-n6 mb-4" v-on:click="INIT()">ENCRYPT</v-btn>
    </v-row>
    <v-row justify="center">
      <v-col>
        <v-text-field label="Hash" prepend-inner-icon="mdi-alpha-h-box" v-model="Palaflake"></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "HashView",
};
</script>

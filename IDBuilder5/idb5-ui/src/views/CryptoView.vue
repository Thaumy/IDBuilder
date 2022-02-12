<template>
  <div>
    <v-row>
      <v-col cols="5">
        <v-textarea no-resize label="PKCS#1 Public Key" v-model="PubK"></v-textarea>
      </v-col>
      <v-col cols="2">
        <v-row justify="center" class="mt-10">
          <v-btn class="py-10" height="32px" v-on:click="INIT()">REGEN</v-btn>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-textarea no-resize label="PKCS#8 Private Key" v-model="PriK"></v-textarea>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="5">
        <v-textarea no-resize label="Plain Text" v-model="PubK"></v-textarea>
      </v-col>
      <v-col cols="2" class="mt-4">
        <v-row justify="center" class="py-5">
          <v-btn icon="mdi-arrow-right" v-on:click="INIT()"></v-btn>
        </v-row>
        <v-row justify="center" class="py-5">
          <v-btn icon="mdi-arrow-left" v-on:click="INIT()"></v-btn>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-textarea no-resize label="Cipher Text" v-model="PriK"></v-textarea>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="2">
        <v-checkbox v-model="use_no_padding" label="No Padding"></v-checkbox>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="use_pkcs1_padding" label="PKCS1 Padding"></v-checkbox>
      </v-col>
      <v-col cols="3">
        <v-checkbox v-model="use_pkcs1_oaep_padding" label="PKCS1 OAEP Padding"></v-checkbox>
      </v-col>

      <v-col cols="2">
        <v-text-field
          label="Bits"
          prepend-inner-icon="mdi-alpha-b-box"
          v-model="Palaflake"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "CryptoView",
};
</script>

<template>
  <div>
    <v-row class="mb-n12">
      <v-col cols="5">
        <v-textarea rows="3" no-resize label="PKCS#1 Public Key" v-model="pubKey"></v-textarea>
      </v-col>
      <v-col cols="2">
        <v-row justify="center" class="mt-4">
          <v-btn class="py-10" height="32px" v-on:click="regen_btn()">REGEN</v-btn>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-textarea rows="3" no-resize label="PKCS#8 Private Key" v-model="priKey"></v-textarea>
      </v-col>
    </v-row>

    <v-row class="mb-n10">
      <v-col cols="5">
        <v-textarea no-resize label="Plain Text" v-model="plainText"></v-textarea>
      </v-col>
      <v-col cols="2" class="mt-4">
        <v-row justify="center" class="py-5">
          <v-btn icon="mdi-arrow-right" v-on:click="encrypt()"></v-btn>
        </v-row>
        <v-row justify="center" class="py-5">
          <v-btn icon="mdi-arrow-left" v-on:click="decrypt()"></v-btn>
        </v-row>
      </v-col>
      <v-col cols="5">
        <v-textarea no-resize label="Cipher Text" v-model="cipherText"></v-textarea>
      </v-col>
    </v-row>
    <v-radio-group
        v-model="paddingMode"
        class="my-n8"
    >
      <v-row justify="center">

        <v-col cols="2">
          <v-radio label="No padding" value="no_padding"></v-radio>
        </v-col>
        <v-col cols="3">
          <v-radio label="PKCS1 OAEP padding" value="pkcs1_oaep_padding"></v-radio>
        </v-col>
        <v-col cols="3">
          <v-radio label="PKCS1 padding" value="pkcs1_padding"></v-radio>
        </v-col>
        <v-col cols="2">
          <v-text-field
              label="Bits"
              v-model="bits"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-radio-group>
  </div>
</template>

<script>
export default {
  name: "CryptoView",
  data() {
    return {
      pubKey: "",
      priKey: "",
      plainText: "",
      cipherText: "",
      paddingMode: "pkcs1_padding",
      bits: ""
    };
  },
  methods: {
    regen_btn() {
      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.data = JSON.parse(msg.data)
      }

      this.$ws.send(`get_crypto_view_data gen_key _`)
    },
    encrypt() {
      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.cipherText = JSON.parse(msg.data).result
      }

      this.$ws.send(`get_crypto_view_data encrypt ${this.plainText}`)
    }
    ,
    decrypt() {
      this.$ws.send(`get_crypto_view_data decrypt ${this.cipherText}`)

      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.plainText = JSON.parse(msg.data).result
      }
    },

  },
};
</script>

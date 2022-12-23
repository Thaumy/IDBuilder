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

        <v-col cols="3">
          <v-radio label="PKCS1 OAEP padding" value="pkcs1_oaep_padding"></v-radio>
        </v-col>
        <v-col cols="3">
          <v-radio label="PKCS1 padding" value="pkcs1_padding"></v-radio>
        </v-col>
        <v-col cols="2">
          <v-text-field
              label="Bits"
              type="number"
              v-model="bits"
              :error="bits_err"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-radio-group>
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"

const pubKey = ref("")
const priKey = ref("")
const plainText = ref("")
const cipherText = ref("")
const paddingMode = ref("pkcs1_padding")
const bits = ref("4096")
const bits_err = ref(false)

function regen_btn() {
  /*
    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      let data = JSON.parse(msg.data)
      this.pubKey = atob(data.pubKey)
      this.priKey = atob(data.priKey)
    }

    //检查合法性
    if (this.bits < 512 || this.bits > 8192) {
      this.palaflake_machine_id_err = true
      return
    } else
      this.palaflake_machine_id_err = false
    //为保证json格式，get_crypto_view_data的参数2和参数3均需要转base64
    this.$ws.send(`get_crypto_view_data gen_key ${btoa(this.bits)} Xw== Xw==`)
  */
}

function encrypt() {
  /*
    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.cipherText = atob(JSON.parse(msg.data).result)
    }

    this.$ws.send(`get_crypto_view_data encrypt ${btoa(this.plainText)} ${btoa(this.pubKey)} ${this.paddingMode}`)
  */
}

function decrypt() {
  /*
    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.plainText = atob(JSON.parse(msg.data).result)
    }

    this.$ws.send(`get_crypto_view_data decrypt ${btoa(this.cipherText)} ${btoa(this.priKey)} ${this.paddingMode}`)
  */
}

</script>

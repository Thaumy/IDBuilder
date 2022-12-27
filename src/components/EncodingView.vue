<template>

  <div>
    <v-textarea
        hide-details
        no-resize
        rows="4"
        label="decoded"
        v-model="decoded"
    />

    <v-radio-group
        class="mt-6"
        v-model="mode"
    >
      <v-row justify="center">
        <v-col cols="1">
          <v-btn
              size="40"
              icon="mdi-arrow-down"
              v-on:click="encode()"
          ></v-btn>
        </v-col>
        <v-col cols="2">
          <v-radio label="Upper" value="upper"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="Lower" value="lower"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="Base64" value="base64"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="Hex" value="hex"/>
        </v-col>
        <v-col cols="1">
          <v-btn
              size="40"
              icon="mdi-arrow-up"
              v-on:click="decode()"
          ></v-btn>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-textarea
        hide-details
        no-resize
        rows="5"
        label="encoded"
        v-model="encoded"
    />
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"
import {invoke} from "@tauri-apps/api/tauri"

const decoded = ref("")
const encoded = ref("")

const mode = ref("base64")

async function encode() {
  try {
    let result = await invoke('encoding_encode', {decoded: decoded.value, mode: mode.value})
    encoded.value = <string>result
  } catch (e) {
    encoded.value = <string>e
  }
}

async function decode() {
  try {
    let result = await invoke('encoding_decode', {encoded: encoded.value, mode: mode.value})
    decoded.value = <string>result
  } catch (e) {
    decoded.value = <string>e
  }
}

</script>

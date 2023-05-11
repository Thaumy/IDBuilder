<template>

  <div>
    <v-row>
      <v-col cols="12">
        <v-textarea
            hide-details
            rows="6"
            label="Text"
            prepend-inner-icon="mdi-alpha-t-box"
            v-model="text"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-radio-group
        v-model="hash_mode"
        class="mt-4 mb-2"
    >
      <v-row justify="center">
        <v-col cols="2">
          <v-radio label="MD5" value="md5"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="SHA1" value="sha1"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="SHA256" value="sha256"/>
        </v-col>
        <v-col cols="2">
          <v-radio label="BCrypt" value="bcrypt"/>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-row justify="center">
      <v-btn
          width="90%"
          height="60"
          v-on:click="compute()"
      >COMPUTE
      </v-btn>
    </v-row>

    <v-row justify="center">
      <v-col>
        <v-text-field
            hide-details
            label="Hash"
            prepend-inner-icon="mdi-alpha-h-box"
            v-model="hash"
        />
      </v-col>
    </v-row>
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"
import {invoke} from "@tauri-apps/api/tauri"

const text = ref("")
const hash = ref("")
const hash_mode = ref("md5")

const data = ref({})

async function compute() {
  try {
    let result = await invoke('hash_compute', {text: text.value, hashMode: hash_mode.value})
    hash.value = <string>result
  } catch (e) {
    hash.value = <string>e
  }
}

</script>

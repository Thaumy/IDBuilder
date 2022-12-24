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
        v-model="hash_algh"
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
      </v-row>
    </v-radio-group>

    <v-row justify="center">
      <v-btn
          width="90%"
          height="60"
          v-on:click="regen_btn()"
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

const text = ref("")
const hash = ref("")
const hash_algh = ref("md5")

const data = ref({})

function render() {
  /*
    this.hash = this.data.hash
  */
}

function regen_btn() {
  /*
    let base64str = btoa(this.text)

    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.data = JSON.parse(msg.data)
      this.render()
    }

    this.$ws.send(`get_hash_view_data ${this.hash_algh} ${base64str}`)
  */
}

</script>

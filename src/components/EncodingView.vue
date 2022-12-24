<template>

  <div>
    <v-textarea
        hide-details
        no-resize
        rows="4"
        label="Src"
        v-model="src"
    />

    <v-radio-group
        class="mt-6"
        v-model="algh"
    >
      <v-row justify="center">
        <v-col cols="1">
          <v-btn
              size="40"
              icon="mdi-arrow-down"
              v-on:click="src_to_dst()"
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
              v-on:click="dst_to_src()"
          ></v-btn>
        </v-col>
      </v-row>
    </v-radio-group>

    <v-textarea
        hide-details
        no-resize
        rows="5"
        label="Dst"
        v-model="dst"
    />
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"

const src = ref("")
const dst = ref("")

const algh = ref("base64")

function src_to_dst() {
  /*
    let base64str = btoa(this.src)

    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.dst = JSON.parse(msg.data).result
    }

    this.$ws.send(`get_encoding_view_data encode ${this.algh} ${base64str}`)
  */
}

function dst_to_src() {
  /*
    let base64str = btoa(this.dst)

    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.src = JSON.parse(msg.data).result
    }

    this.$ws.send(`get_encoding_view_data decode ${this.algh} ${base64str}`)
  */
}
</script>

<style lang="stylus" scoped>

.v-input__details {
  display: none !important;
}

</style>
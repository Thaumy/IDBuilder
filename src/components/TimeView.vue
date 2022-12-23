<template>

  <div>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field
            outlined
            label="SecTimeStamp"
            prepend-inner-icon="mdi-alpha-s-box"
            v-model="sec_timestamp"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            outlined
            label="MiliSecTimeStamp"
            prepend-inner-icon="mdi-alpha-m-box"
            v-model="mili_timestamp"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-16">
      <v-col cols="6">
        <v-text-field
            outlined
            label="DB Time Format"
            prepend-inner-icon="mdi-alpha-s-box"
            v-model="db_time_format"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-n6">
      <v-col cols="2">
        <v-text-field
            label="UTC+"
            type="number"
            v-model="utc_plus"
            :error="utc_plus_err"
        ></v-text-field>
      </v-col>
    </v-row>
    <!-- 微调使之与idView的REGEN按钮对齐  -->
    <v-row justify="center" style="margin-top: 2px">
      <v-btn width="50%" height="32px" v-on:click="regen_btn()">REGEN</v-btn>
    </v-row>
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"

const sec_timestamp = ref("")
const mili_timestamp = ref("")
const db_time_format = ref("")
const utc_plus = ref("0")
const utc_plus_err = ref(false)

const data = ref({})

function render() {
  this.sec_timestamp = this.data.sec_timestamp
  this.mili_timestamp = this.data.mili_timestamp
  this.db_time_format = this.data.db_time_format
}

function regen_btn() {
  //检查合法性
  if (this.utc_plus < -12 || this.utc_plus > 12) {
    this.utc_plus_err = true
    return
  } else
    this.utc_plus_err = false

  this.$ws.onmessage = (msg) => {
    console.log(msg.data)
    this.data = JSON.parse(msg.data)
    this.render()
  }

  this.$ws.send(`get_time_view_data ${this.utc_plus}`)

}

</script>

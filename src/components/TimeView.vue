<template>

  <div>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field
            outlined
            label="Sec Timestamp"
            prepend-inner-icon="mdi-alpha-s-box"
            v-model="sec_timestamp"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            outlined
            label="Milisec Timestamp"
            prepend-inner-icon="mdi-alpha-m-box"
            v-model="mili_timestamp"
        />
      </v-col>
    </v-row>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field
            outlined
            label="ISO8601 Time Format"
            prepend-inner-icon="mdi-alpha-i-box"
            v-model="iso8601_time_format"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            disabled
            outlined
            label="-"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
            disabled
            outlined
            label="-"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            disabled
            outlined
            label="-"
        />
      </v-col>
    </v-row>
    <v-row justify="center" class="mt-10">
      <v-col cols="2">
        <v-text-field
            label="UTC+"
            type="number"
            v-model="utc_plus"
            :error="utc_plus_err"
        />
      </v-col>
    </v-row>
    <!-- 微调使之与idView的REGEN按钮对齐  -->
    <v-row justify="center" class="mt-3">
      <v-btn
          width="90%"
          height="60px"
          v-on:click="regen_btn()"
      >GENERATE
      </v-btn>
    </v-row>
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"

const sec_timestamp = ref("")
const mili_timestamp = ref("")
const iso8601_time_format = ref("")
const utc_plus = ref("0")
const utc_plus_err = ref(false)

const data = ref({})

function render() {
  /*
    this.sec_timestamp = this.data.sec_timestamp
    this.mili_timestamp = this.data.mili_timestamp
    this.db_time_format = this.data.db_time_format
  */
}

function regen_btn() {
  /*
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
  */
}

</script>

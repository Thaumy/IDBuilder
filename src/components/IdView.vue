<template>

  <div>
    <v-row class="mb-n6">
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            v-model="uuid"
            label="UUID"
            prepend-inner-icon="mdi-alpha-u-box"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            label="Palaflake"
            prepend-inner-icon="mdi-alpha-p-box"
            v-model="palaflake"
        />
      </v-col>
    </v-row>
    <v-row class="mb-n6">
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            label="YMD_XXXX"
            prepend-inner-icon="mdi-calendar-month"
            v-model="ymd_xxxx"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            label="YMD"
            prepend-inner-icon="mdi-calendar-month"
            v-model="ymd"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            label="RndNumber"
            prepend-inner-icon="mdi-tilde"
            v-model="rnd_number"
        />
      </v-col>
      <v-col cols="6">
        <v-text-field
            hide-details
            outlined
            label="RndString"
            prepend-inner-icon="mdi-tilde"
            v-model="rnd_string"
        />
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-2">
      <v-col cols="4">
        <v-text-field
            hide-details
            outlined
            label="Palaflake Machine ID [0,255]"
            type="number"
            v-model="palaflake_machine_id"
            :error="palaflake_machine_id_err"
        />
      </v-col>
      <v-col cols="5">
        <v-text-field
            hide-details
            outlined
            label="Palaflake Start Year [0,now or 65535]"
            type="number"
            v-model="palaflake_start_year"
            :error="palaflake_start_year_err"
        />
      </v-col>
      <v-col cols="2">
        <v-checkbox
            v-model="no_joiner_uuid"
            label="UUID joiner"
        />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn
          class="position-absolute"
          style="bottom: 40px"
          width="90%"
          height="60px"
          @click="regen_btn()"
      >GENERATE
      </v-btn>
    </v-row>
  </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"

const uuid = ref("")
const palaflake = ref("")
const ymd_xxxx = ref("")
const ymd = ref("")
const rnd_number = ref("")
const rnd_string = ref("")
const palaflake_machine_id = ref(1)
const palaflake_start_year = ref(2022)

const palaflake_machine_id_err = ref(false)
const palaflake_start_year_err = ref(false)
const no_joiner_uuid = ref(true)

const data = ref({})

function render() {
  /*
    this.uuid = this.data.uuid
    this.palaflake = this.data.palaflake
    this.ymd = this.data.ymd
    this.ymd_xxxx = this.data.ymd_xxxx
    this.rnd_number = this.data.rnd_number
    this.rnd_string = this.data.rnd_string

    if (this.no_joiner_uuid)
      this.unjoin_uuid()
    else if (!this.uuid.includes('-') && this.uuid.length === 32) //未格式化
      this.join_uuid()
  */
}

function regen_btn() {
  /*
    //检查合法性
    if (this.palaflake_machine_id < 0 || this.palaflake_machine_id > 255) {
      this.palaflake_machine_id_err = true
      return
    } else
      this.palaflake_machine_id_err = false
    if (this.palaflake_start_year > (new Date()).getFullYear() || this.palaflake.palaflake_start_year > 65535) {
      this.palaflake_start_year_err = true
      return
    } else
      this.palaflake_start_year_err = false

    this.$ws.onmessage = (msg) => {
      console.log(msg.data)
      this.data = JSON.parse(msg.data)
      this.render()
    }

    this.$ws.send(`get_id_view_data ${this.palaflake_machine_id} ${this.palaflake_start_year}`)
  */
}

function join_uuid() {//restore joiner
  /*
    let arr = this.uuid.split('')
    //restore joiner
    arr.splice(8, 0, '-')
    arr.splice(13, 0, '-')
    arr.splice(18, 0, '-')

    this.uuid = arr.join('')
  */
}

function unjoin_uuid() {//remove joiner
  /*
    this.uuid = this.uuid.replace(/-/g, "")
  */
}

/*
watch: {
  no_joiner_uuid: function () {
    if (this.no_joiner_uuid)
      this.unjoin_uuid()
    else if (!this.uuid.includes('-') && this.uuid.length === 32) //未格式化
      this.join_uuid()
  },
},*/

</script>

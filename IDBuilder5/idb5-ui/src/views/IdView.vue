<template>
  <div>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field v-model="uuid" outlined label="UUID" prepend-inner-icon="mdi-alpha-u-box"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field
            outlined
            label="Palaflake"
            prepend-inner-icon="mdi-alpha-p-box"
            v-model="palaflake"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-n12">
      <v-col cols="6">
        <v-text-field
            outlined
            label="YMD_XXXX"
            prepend-inner-icon="mdi-calendar-month"
            v-model="ymd_xxxx"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field outlined label="YMD" prepend-inner-icon="mdi-calendar-month" v-model="ymd"></v-text-field>
      </v-col>
    </v-row>
    <v-row class="mb-n4">
      <v-col cols="6">
        <v-text-field outlined label="RndNumber" prepend-inner-icon="mdi-tilde" v-model="rnd_number"></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-text-field outlined label="RndString" prepend-inner-icon="mdi-tilde" v-model="rnd_string"></v-text-field>
      </v-col>
    </v-row>
    <v-row justify="center" class="mb-n6">
      <v-col cols="3">
        <v-text-field
            outlined
            label="Palaflake Machine ID"
            v-model="palaflake_machine_id"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            outlined
            label="Palaflake Start Year"
            v-model="palaflake_start_year"
        ></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-checkbox v-model="no_joiner_uuid" label="No Joiner UUID"></v-checkbox>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-btn width="50%" height="32px" @click="regen_btn()">REGEN</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "IdView",
  data() {
    return {
      uuid: "",
      palaflake: "",
      ymd_xxxx: "",
      ymd: "",
      rnd_number: "",
      rnd_string: "",
      palaflake_machine_id: 1,
      palaflake_start_year: 2022,
      no_joiner_uuid: true
    };
  },
  methods: {
    regen_btn() {

      this.$ws.send(`get_id_view_data ${this.palaflake_machine_id} ${this.palaflake_start_year}`)

      this.$ws.onmessage = (msg) => {
        console.log(msg.data)

        let data = JSON.parse(msg.data)
        this.uuid = data.uuid
        this.palaflake = data.palaflake
        this.ymd = data.ymd
        this.ymd_xxxx = data.ymd_xxxx
        this.rnd_number = data.rnd_number
        this.rnd_string = data.rnd_string
      }
    },
    format_uuid() {
      if (this.no_joiner_uuid)//remove joiner
        this.uuid = this.uuid.replace(/-/g, "")
      else {//restore joiner
        let arr = this.uuid.split('')

        arr.splice(8, 0, '-')
        arr.splice(13, 0, '-')
        arr.splice(18, 0, '-')

        this.uuid = arr.join('')
      }//TODO
    }
  },
  watch: {
    no_joiner_uuid: function () {
      this.format_uuid()
    },
    uuid: function () {
      this.format_uuid()
    }
  }
};
</script>

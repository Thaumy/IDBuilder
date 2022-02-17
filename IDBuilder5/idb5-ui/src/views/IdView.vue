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
            label="Palaflake Machine ID [0,255]"
            v-model="palaflake_machine_id"
            :error="palaflake_machine_id_err"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
            outlined
            label="Palaflake Start Year [0,now or 65535]"
            v-model="palaflake_start_year"
            :error="palaflake_start_year_err"
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
      palaflake_machine_id_err: false,
      palaflake_start_year_err: false,
      no_joiner_uuid: true,
      data: {}
    };
  },
  methods: {
    render() {
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
    },
    regen_btn() {
      //检查合法性
      if (this.palaflake_machine_id < 0 || this.palaflake_machine_id > 255) {
        this.palaflake_machine_id_err = true;
        return
      } else
        this.palaflake_machine_id_err = false;
      if (this.palaflake_start_year > (new Date()).getFullYear() || this.palaflake.palaflake_start_year > 65535) {
        this.palaflake_start_year_err = true;
        return
      } else
        this.palaflake_start_year_err = false;

      this.$ws.send(`get_id_view_data ${this.palaflake_machine_id} ${this.palaflake_start_year}`)

      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.data = JSON.parse(msg.data)
        this.render()
      }
    },
    join_uuid() {//restore joiner
      let arr = this.uuid.split('')
      //restore joiner
      arr.splice(8, 0, '-')
      arr.splice(13, 0, '-')
      arr.splice(18, 0, '-')

      this.uuid = arr.join('')
    }
    ,
    unjoin_uuid() {//remove joiner
      this.uuid = this.uuid.replace(/-/g, "")
    },

  },
  watch: {
    no_joiner_uuid: function () {
      if (this.no_joiner_uuid)
        this.unjoin_uuid()
      else if (!this.uuid.includes('-') && this.uuid.length === 32) //未格式化
        this.join_uuid()
    },
  },
};
</script>

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
        <v-text-field outlined label="UTC+" v-model="utc_plus"></v-text-field>
      </v-col>
    </v-row>
    <!-- 微调使之与idView的REGEN按钮对齐  -->
    <v-row justify="center" style="margin-top: 2px">
      <v-btn width="50%" height="32px" v-on:click="regen_btn()">REGEN</v-btn>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "TimeView",
  data() {
    return {
      sec_timestamp: "",
      mili_timestamp: "",
      db_time_format: "",
      utc_plus: "",
      data: {}
    };
  },
  methods: {
    render() {
      this.sec_timestamp = this.data.sec_timestamp
      this.mili_timestamp = this.data.mili_timestamp
      this.db_time_format = this.data.db_time_format
      this.utc_plus = this.data.utc_plus

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
  },
  watch: {
    /*no_joiner_uuid: function () {
      if (this.no_joiner_uuid)
        this.unjoin_uuid()
      else if (!this.uuid.includes('-') && this.uuid.length === 32) //未格式化
        this.join_uuid()
    },*/
  },
};
</script>

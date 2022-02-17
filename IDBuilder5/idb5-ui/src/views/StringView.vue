<template>
  <div>
    <v-textarea no-resize rows="5" label="Src" v-model="src"></v-textarea>

    <v-radio-group
        v-model="algh"
        class="my-n8"
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
          <v-radio label="Upper" value="upper"></v-radio>
        </v-col>
        <v-col cols="2">
          <v-radio label="Lower" value="lower"></v-radio>
        </v-col>
        <v-col cols="2">
          <v-radio label="Base64" value="base64"></v-radio>
        </v-col>
        <v-col cols="2">
          <v-radio label="Hex" value="hex"></v-radio>
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

    <v-textarea no-resize rows="5" label="Dst" v-model="dst"></v-textarea>
  </div>
</template>

<script>
export default {
  name: "StringView",
  data() {
    return {
      src: "",
      dst: "",

      algh: "base64",
    };
  },
  methods: {
    src_to_dst() {
      let base64str = btoa(this.src)

      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.dst = JSON.parse(msg.data).result
      }

      this.$ws.send(`get_string_view_data encode ${this.algh} ${base64str}`)
    },
    dst_to_src() {
      let base64str = btoa(this.dst)

      this.$ws.onmessage = (msg) => {
        console.log(msg.data)
        this.src = JSON.parse(msg.data).result
      }

      this.$ws.send(`get_string_view_data decode ${this.algh} ${base64str}`)
    }
  }
};
</script>

<style scoped>
.v-input__details {
  display: none !important;
}
</style>
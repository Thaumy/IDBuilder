<template>
  <v-app style="height: 1000px;">
    <v-item-group mandatory selected-class="bg-primary">
      <v-row style="margin: 0">
        <v-col
            v-for="it in tabs"
            :key="it.title"
            cols="2"
        >
          <v-item v-slot="{ selectedClass, toggle }">
            <v-card
                :class="['justify-center d-flex align-center', selectedClass]"
                @click="toggle"
                height="30"
                :to="it.path"
            >{{ it.title }}
            </v-card>
          </v-item>
        </v-col>
      </v-row>
    </v-item-group>
    <router-view class="px-2"/>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      tabs: require("./static/tabs.json"),
    };
  },
};
</script>



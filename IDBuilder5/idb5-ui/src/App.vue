<template>
  <v-app>
    <v-main>
      <v-item-group selected-class="bg-primary">
        <v-container>
          <v-row>
            <v-col v-for="it in tabs" :key="it.title" cols="12" md="2">
              <v-item v-slot="{ selectedClass, toggle }">
                <v-card
                  :class="['justify-center d-flex align-center', selectedClass]"
                  @click="toggle"
                  height="30"
                  :to="it.path"
                >{{ it.title }}</v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
      <router-view class="px-2"/>
      
    </v-main>
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

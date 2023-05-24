<template>

    <div>
        <v-row class="mb-n6">
            <v-col cols="6">
                <v-text-field
                        hide-details
                        outlined
                        label="Sec Timestamp"
                        prepend-inner-icon="mdi-alpha-s-box"
                        v-model="sec"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                        hide-details
                        outlined
                        label="Millisec Timestamp"
                        prepend-inner-icon="mdi-alpha-m-box"
                        v-model="milli"
                />
            </v-col>
        </v-row>
        <v-row class="mb-n6">
            <v-col cols="6">
                <v-text-field
                        hide-details
                        outlined
                        label="ISO8601 Time Format"
                        prepend-inner-icon="mdi-alpha-i-box"
                        v-model="iso8601"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                        hide-details
                        disabled
                        outlined
                        label="-"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="6">
                <v-text-field
                        hide-details
                        disabled
                        outlined
                        label="-"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                        hide-details
                        disabled
                        outlined
                        label="-"
                />
            </v-col>
        </v-row>

        <v-row justify="center" class="mt-2">
            <v-col cols="2">
                <v-text-field
                        hide-details
                        label="UTC+"
                        type="number"
                        v-model="offset"
                        :error="offset_err"
                />
            </v-col>
        </v-row>

        <v-row justify="center">
            <v-btn
                    class="position-absolute"
                    style="bottom: 40px"
                    width="90%"
                    height="60px"
                    v-on:click="generate()"
            >GENERATE
            </v-btn>
        </v-row>
    </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"
import {invoke} from "@tauri-apps/api/tauri"

const sec = ref("")
const milli = ref("")
const iso8601 = ref("")

const offset = ref("0")
const offset_err = ref(false)

const data = ref({})

async function generate() {
    //检查合法性
    if (Number(offset.value) < -12 || Number(offset.value) > 12) {
        offset_err.value = true
    } else {
        offset_err.value = false

        try {
            let result = <any>await invoke('time_generate', {offset: offset.value})
            sec.value = result.sec
            milli.value = result.milli
            iso8601.value = result.iso8601
        } catch (e) {
            sec.value = <string>e
            milli.value = <string>e
            iso8601.value = <string>e
        }
    }
}

</script>

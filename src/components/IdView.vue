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
                        label="YMD_RandNum"
                        prepend-inner-icon="mdi-calendar-month"
                        v-model="ymd_rand_num"
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
                        label="RandNum"
                        prepend-inner-icon="mdi-tilde"
                        v-model="rand_num"
                />
            </v-col>
            <v-col cols="6">
                <v-text-field
                        hide-details
                        outlined
                        label="RandStr"
                        prepend-inner-icon="mdi-tilde"
                        v-model="rand_str"
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
                        v-model="uuid_joiner"
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
                    @click="generate()"
            >GENERATE
            </v-btn>
        </v-row>
    </div>

</template>

<script lang="ts" setup>

import {ref, watch} from "vue"
import {invoke} from "@tauri-apps/api/tauri"

const uuid = ref("")
const palaflake = ref("")
const ymd_rand_num = ref("")
const ymd = ref("")
const rand_num = ref("")
const rand_str = ref("")

const palaflake_machine_id = ref("1")
const palaflake_start_year = ref("2022")

const palaflake_machine_id_err = ref(false)
const palaflake_start_year_err = ref(false)
const uuid_joiner = ref(true)

const data = ref({})

async function generate() {
    //检查合法性
    let pf_mid = Number(palaflake_machine_id.value)
    let pf_sy = Number(palaflake_start_year.value)

    let pf_mid_err = pf_mid < 0 || pf_mid > 255
    let pf_sy_err = pf_sy > (new Date()).getFullYear() || pf_sy > 65535

    if (pf_mid_err || pf_sy_err) {
        palaflake_machine_id_err.value = pf_mid_err
        palaflake_start_year_err.value = pf_sy_err
    } else {
        try {
            let result = <any>await invoke('id_generate', {
                pfMid: palaflake_machine_id.value,
                pfSy: palaflake_start_year.value
            })

            uuid.value = result.uuid
            if (!uuid_joiner.value)
                unjoin_uuid()
            palaflake.value = result.palaflake
            ymd.value = result.ymd
            ymd_rand_num.value = result.ymd_rand_num
            rand_num.value = result.rand_num
            rand_str.value = result.rand_str
        } catch (e) {
            uuid.value = <string>e
            palaflake.value = <string>e
            ymd.value = <string>e
            ymd_rand_num.value = <string>e
            rand_num.value = <string>e
            rand_str.value = <string>e
        }
    }
}

function join_uuid() {//restore joiner
    let arr = uuid.value.split('')
    //restore joiner
    arr.splice(8, 0, '-')
    arr.splice(13, 0, '-')
    arr.splice(18, 0, '-')

    uuid.value = arr.join('')
}

function unjoin_uuid() {//remove joiner
    uuid.value = uuid.value.replace(/-/g, "")
}

watch(uuid_joiner, async (next, _) => {
    if (!next)
        unjoin_uuid()
    else if (!uuid.value.includes('-') && uuid.value.length === 32) //unjoin
        join_uuid()
})

</script>

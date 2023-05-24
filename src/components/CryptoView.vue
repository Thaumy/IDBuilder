<template>

    <div>
        <v-row class="mb-n6">
            <v-col cols="5">
                <v-textarea
                        hide-details
                        rows="3"
                        no-resize
                        label="PKCS#1 Public Key"
                        v-model="pubKey"
                />
            </v-col>
            <v-col cols="2">
                <v-row justify="center" class="mt-4">
                    <v-btn
                            height="100px"
                            v-on:click="generate()"
                    >REGEN
                    </v-btn>
                </v-row>
            </v-col>
            <v-col cols="5">
                <v-textarea
                        hide-details
                        rows="3"
                        no-resize
                        label="PKCS#8 Private Key"
                        v-model="priKey"
                />
            </v-col>
        </v-row>

        <v-row class="mb-2">
            <v-col cols="5">
                <v-textarea
                        hide-details
                        no-resize
                        label="Plain Text"
                        v-model="plainText"
                />
            </v-col>
            <v-col cols="2" class="mt-4">
                <v-row justify="center" class="py-5">
                    <v-btn
                            icon="mdi-arrow-right"
                            v-on:click="encrypt()"
                    />
                </v-row>
                <v-row justify="center" class="py-5">
                    <v-btn
                            icon="mdi-arrow-left"
                            v-on:click="decrypt()"
                    />
                </v-row>
            </v-col>
            <v-col cols="5">
                <v-textarea
                        hide-details
                        no-resize
                        label="Cipher Text"
                        v-model="cipherText"
                />
            </v-col>
        </v-row>
        <v-radio-group v-model="paddingMode">
            <v-row justify="center">
                <v-col cols="4">
                    <v-radio
                            class="mt-2"
                            label="PKCS1 OAEP padding"
                            value="pkcs1_oaep_padding"
                    />
                </v-col>
                <v-col cols="3">
                    <v-radio
                            class="mt-2"
                            label="PKCS1 padding"
                            value="pkcs1_padding"
                    />
                </v-col>
                <v-col cols="2">
                    <v-text-field
                            hide-details
                            label="Bits"
                            type="number"
                            v-model="bits"
                            :error="bits_err"
                    />
                </v-col>
            </v-row>
        </v-radio-group>
    </div>

</template>

<script lang="ts" setup>

import {ref} from "vue"
import {invoke} from "@tauri-apps/api/tauri"

const pubKey = ref("")
const priKey = ref("")
const plainText = ref("")
const cipherText = ref("")

const paddingMode = ref("pkcs1_padding")
const bits = ref("4096")
const bits_err = ref(false)

async function generate() {
    //检查合法性
    bits_err.value = Number(bits.value) < 512 || Number(bits.value) > 8192
    if (!bits_err.value) {
        try {
            let result = <any>await invoke('crypto_generate', {
                bits: bits.value
            })

            pubKey.value = result.pub_key
            priKey.value = result.pri_key
        } catch (e) {
            pubKey.value = <string>e
            priKey.value = <string>e
        }
    }
}

async function encrypt() {
    try {
        let result = await invoke('crypto_encrypt', {
            plain: plainText.value,
            pubKey: pubKey.value,
            paddingMode: paddingMode.value
        })
        cipherText.value = <string>result
    } catch (e) {
        cipherText.value = <string>e
    }
}

async function decrypt() {
    try {
        let result = await invoke('crypto_decrypt', {
            cipher: cipherText.value,
            priKey: priKey.value,
            paddingMode: paddingMode.value
        })
        plainText.value = <string>result
    } catch (e) {
        plainText.value = <string>e
    }
}

</script>

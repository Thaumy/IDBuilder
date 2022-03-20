const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

<<<<<<< Updated upstream
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
=======
    pluginOptions: {
        vuetify: {
            // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
        },
        electronBuilder: {
            builderOptions: {
                beforeBuild: "scripts/modifyFontFilepath.js",
            }
        }
    }
>>>>>>> Stashed changes
})

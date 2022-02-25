const { defineConfig } = require('@vue/cli-service')



module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: config => {
  //   config.module
  //     .tap(options => {
  //       options.compilerOptions = '@vue/compiler-dom'
  //       // modify the options...
  //       return options
  //     })
  // },
  pluginOptions: {
    vuetify: {
			// https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
		}
  }
})

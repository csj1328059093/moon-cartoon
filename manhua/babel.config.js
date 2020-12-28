module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins: [["component", // 删掉[]
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]
}

module.exports = {
  presets: [
    '@vue/app'
  ],
  // vant引入：
  plugins: [
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: true
      },
      'vant'
    ]
  ]
}

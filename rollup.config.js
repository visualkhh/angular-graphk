export default {
  entry: 'dist/index.js',
  dest: 'dist/dist/index.js',
  sourceMap: false,
  format: 'umd',
  moduleName: 'ng.angular-graphk',
  globals: {
    '@angular/core': 'ng.core'
  }
}

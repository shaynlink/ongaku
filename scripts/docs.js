'use strict';

const Docma = require('docma');

Docma.create().build({
  src: [
    './src/**/*.js',
  ],
  dest: './docs',
}).catch(console.error).then(() => {
  console.log('Doc created !');
});

const { spawn } = require('child_process');
const fs = require('fs');
const gifsicle = require('gifsicle');
const { join } = require('path');

module.exports = (req, res) => {
  const child = spawn(gifsicle, ['--colors', '256', join(__dirname, '../public/input.gif')]);
  child.stdout.on('data', (data) => {
    res.write(data);
  })
  child.stderr.on('data', (data) => {
    console.log(data.toString());
  })
  child.on('close', (code) => {
    console.log('Image minified: ', code);
    res.end();
  });

  res.setHeader('content-type', 'image/gif');
}

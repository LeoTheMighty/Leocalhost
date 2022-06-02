const express = require('express');
const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');
const { response } = require('express');

const app = express();
const port = 3005;

const uploadPath = "/Users/leonid.belyi/personal/ArduinoLights/upload.sh"
const palletsPath = "/Users/leonid.belyi/personal/ArduinoLights/Palettes"

app.use(express.static(path.resolve(__dirname, 'client/build')));

const upload = (palletName) => {
  exec(`source ${uploadPath} ${palletName}`, function(error, stdout, stderr) {
    if (!error) {
      // things worked!
      console.log("yay?");
    } else {
      // things failed :(
      console.log("boo?");
    }
  });
};

app.get('/pallets', (req, res) => {
  // return list of available pallets
  let resp = '';

  fs.readdirSync(palletsPath).forEach((file) => {
    resp += file;
    resp += ','
  });
  resp = resp.slice(0, -1);

  res.send(resp);
});

app.get('/upload', (req, res) => {
    res.send(`Hello ${req.query.param}!`);
    upload(req.query.param);
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});


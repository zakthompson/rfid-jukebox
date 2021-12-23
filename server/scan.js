const Mfrc522 = require('mfrc522-rpi');
const SoftSPI = require('rpi-softspi');
const mpdapi = require('mpd-api');
const fs = require('fs');
const express = require('express');
const app = express();
const port = 4000;

const softSPI = new SoftSPI({
  clock: 23,
  mosi: 19,
  miso: 21,
  client: 24,
});
const mfrc522 = new Mfrc522(softSPI).setResetPin(22).setBuzzerPin(18);

const config = {
  path: '/run/mpd/socket',
};

let currentlyPlaying = '';

async function read() {
  const client = await mpdapi.connect(config);
  mfrc522.reset();

  let response = mfrc522.findCard();
  if (!response.status) {
    setTimeout(read, 250);
    return;
  }

  response = mfrc522.getUid();
  if (!response.status) {
    console.log('Error scanning UID');
    setTimeout(read, 250);
    return;
  }

  const uid = response.data;
  const d1 = uid[0].toString(16);
  const d2 = uid[1].toString(16);
  const d3 = uid[2].toString(16);
  const d4 = uid[3].toString(16);
  const uidString = `${d1}${d2}${d3}${d4}`;
  console.log(`Detected UID: ${uidString}`);

  switch (uidString) {
    case '371ebd1a':
      await client.api.playback.stop();
      await client.api.queue.clear();
      if (currentlyPlaying !== '01') {
        const albumPath = '/var/lib/mpd/music/albums/01';
        const tracks = fs.readdirSync(albumPath);
        await client.api.playback.stop();
        await client.api.queue.clear();
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      }
      break;
    default:
      await client.api.playback.stop();
      await client.api.queue.clear();
      return;
  }
  setTimeout(read, 5000);
}

app.listen(port, () => {
  console.log(`RFID scanner up on port ${port}`);

  read();
});

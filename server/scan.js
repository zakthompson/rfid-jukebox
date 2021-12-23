const Mfrc522 = require('mfrc522-rpi');
const SoftSPI = require('rpi-softspi');
const mpdapi = require('mpd-api');
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
  host: 'localhost',
  port: 6600,
};

const STATE = {
  READ: 'READ',
  WRITE: 'WRITE',
};

let currentState = STATE.READ;

function setState(state) {
  currentState = state;
}

async function read() {
  const client = await mpdapi.connect(config);
  mfrc522.reset();

  let response = mfrc522.findCard();
  if (!response.status) return;

  response = mfrc522.getUid();
  if (!response.status) {
    console.log('Error scanning UID');
    return;
  }

  const uid = response.data;
  console.log(
    'Detected UID: %s %s %s %s',
    uid[0].toString(16),
    uid[1].toString(16),
    uid[2].toString(16),
    uid[3].toString(16)
  );
  const uidString = `${uid[0].toString(16)}${uid[1].toString(
    16
  )}${uid[2].toString(16)}${uid[3].toString(16)}`;

  switch (uidString) {
    default:
      await client.api.queue.clear();
      await client.api.playback.stop();
      return;
  }
}

app.listen(port, () => {
  console.log(`RFID scanner up on port ${port}`);

  setInterval(function () {
    switch (currentState) {
      case STATE.READ:
        read();
        break;
      case STATE.WRITE:
        console.log('Write mode not implemented yet!');
        break;
      default:
        console.log('Server state invalid');
    }
  }, 250);
});

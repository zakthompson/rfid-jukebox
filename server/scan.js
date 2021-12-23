const Mfrc522 = require('mfrc522-rpi');
const SoftSPI = require('rpi-softspi');
const mpdapi = require('mpd-api');
const fs = require('fs');

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
let locked = false;

function unlock() {
  locked = false;
}

async function initClient() {
  const client = await mpdapi.connect(config);
  return client;
}

async function read(client) {
  if (locked) return;
  mfrc522.reset();

  let response = mfrc522.findCard();
  if (!response.status) {
    return;
  }

  response = mfrc522.getUid();
  if (!response.status) {
    console.log('Error scanning UID');
    return;
  }

  const uid = response.data;
  const d1 = uid[0].toString(16);
  const d2 = uid[1].toString(16);
  const d3 = uid[2].toString(16);
  const d4 = uid[3].toString(16);
  const uidString = `${d1}${d2}${d3}${d4}`;
  console.log(`Detected UID: ${uidString}`);

  await client.api.playback.stop();
  await client.api.queue.clear();

  switch (uidString) {
    case '371ebd1a':
      if (currentlyPlaying !== '01') {
        currentlyPlaying = '01';
        const albumPath = '/var/lib/mpd/music/albums/01';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '8722ae1a':
      if (currentlyPlaying !== '02') {
        currentlyPlaying = '02';
        const albumPath = '/var/lib/mpd/music/albums/02';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case 'e7739f1a':
      if (currentlyPlaying !== '03') {
        currentlyPlaying = '03';
        const albumPath = '/var/lib/mpd/music/albums/03';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case 'b755a91a':
      if (currentlyPlaying !== '04') {
        currentlyPlaying = '04';
        const albumPath = '/var/lib/mpd/music/albums/04';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '87849a1a':
      if (currentlyPlaying !== '05') {
        currentlyPlaying = '05';
        const albumPath = '/var/lib/mpd/music/albums/05';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case 'a75dcf19':
      if (currentlyPlaying !== '06') {
        currentlyPlaying = '06';
        const albumPath = '/var/lib/mpd/music/albums/06';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '77eb919':
      if (currentlyPlaying !== '07') {
        currentlyPlaying = '07';
        const albumPath = '/var/lib/mpd/music/albums/07';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '673dae19':
      if (currentlyPlaying !== '08') {
        currentlyPlaying = '08';
        const albumPath = '/var/lib/mpd/music/albums/08';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '2720b01a':
      if (currentlyPlaying !== '09') {
        currentlyPlaying = '09';
        const albumPath = '/var/lib/mpd/music/albums/09';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    case '17efa019':
      if (currentlyPlaying !== '10') {
        currentlyPlaying = '10';
        const albumPath = '/var/lib/mpd/music/albums/10';
        const tracks = fs.readdirSync(albumPath);
        tracks.forEach(async (track) => {
          if (track[0] !== '.') {
            console.log(`Queueing ${track}`);
            await client.api.queue.add(`file://${albumPath}/${track}`);
          }
        });
        await client.api.playback.play();
      } else {
        console.log('Stopped playback');
        currentlyPlaying = '';
      }
      break;
    default:
    // do nothing
  }
  mfrc522.stopCrypto();
  locked = true;
  setTimeout(unlock, 5000);
  return;
}

initClient().then((client) => {
  console.log('RFID scanner active');
  setInterval(read.bind(null, client), 500);
});

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

async function read() {
  console.log('Scanning...');
  const client = await mpdapi.connect(config);
  mfrc522.reset();

  let response = mfrc522.findCard();
  if (!response.status) {
    setTimeout(read, 300);
    return;
  }

  response = mfrc522.getUid();
  if (!response.status) {
    console.log('Error scanning UID');
    setTimeout(read, 300);
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
    default:
    // do nothing
  }
  mfrc522.stopCrypto();
  setTimeout(read, 5000);
  return;
}

read().catch((e) => {
  console.log('Something went wrong: ', e);
});

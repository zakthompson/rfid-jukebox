import Mfrc522 from 'mfrc522-rpi';
import SoftSPI from 'rpi-softspi';

console.log('Scanning...');

const softSPI = new SoftSPI({
  clock: 23,
  mosi: 19,
  miso: 21,
  client: 24,
});

const mfrc522 = new Mfrc522(softSPI).setResetPin(22).setBuzzerPin(18);

setInterval(function () {
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
}, 250);

#!/home/pi/.nvm/versions/node/v17.3.0/bin/node

const fs = require('fs-extra');
const { execSync } = require('child_process');

let folderToImport;

['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'].some((num) => {
  const albumPath = `/boot/albums/${num}`;
  const files = fs.readdirSync(albumPath);
  if (files.length > 0) {
    // remove spaces
    files.forEach((file) => {
      fs.renameSync(
        `${albumPath}/${file}`,
        `${albumPath}/${file.replace(/ /g, '_')}`
      );
    });
    folderToImport = num;
    return true;
  }
});

fs.rmSync(`/var/lib/mpd/music/albums/${folderToImport}`, {
  recursive: true,
  force: true,
});

fs.copySync(
  `/boot/albums/${folderToImport}`,
  `/var/lib/mpd/music/albums/${folderToImport}`
);

fs.rmSync(`/boot/albums/${folderToImport}`, { recursive: true, force: true });
fs.mkdirSync(`/boot/albums/${folderToImport}`);
execSync('chown -R mpd:audio /var/lib/mpd/music');

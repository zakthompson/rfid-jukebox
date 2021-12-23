#!/bin/bash

rm -r /var/lib/mpd/music/albums
mv /boot/albums /var/lib/mpd/music
for file in /var/lib/mpd/music/albums/**/*' '*
do
	mv -- "$file" "${file// /_}"
done
chown -R mpd:audio /var/lib/mpd/music
mkdir -p /boot/albums/01 /boot/albums/02 /boot/albums/03 /boot/albums/04 /boot/albums/05 /boot/albums/06 /boot/albums/07 /boot/albums/08 /boot/albums/09 /boot/albums/10

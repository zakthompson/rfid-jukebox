#!/bin/bash

rm -r /var/lib/mpd/music/albums
cp -r /boot/albums /var/lib/mpd/music
for file in /var/lib/mpd/music/albums/**/*' '* 
do 
	mv -- "$file" "${file// /_}"
done
chown -R mpd:audio /var/lib/mpd/music

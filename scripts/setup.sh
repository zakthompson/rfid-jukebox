#!/bin/bash

rm -r /var/lib/mpd/music/albums
cp -r /boot/albums /var/lib/mpd/music
chown -R mpd:audio /var/lib/mpd/music

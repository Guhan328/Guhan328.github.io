#!/bin/bash

# sudo apt install woff2

# sudo python3 -m pip install tomli
# sudo apt install fontforge python3-fontforge

cd fonts
woff2_compress academicicons.ttf
cd ..

./fontite/fontite conf.toml

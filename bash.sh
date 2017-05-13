npm install -g t2-cli
npm install climate-si7020
npm i --save fft-js

# wifi
t2 wifi -n "1871GUEST" -p "BunkerMuster2017\!"
#  working if the yellow light turns on
t2 wifi -n Kahasi -p cnnbicj5be7xb
#  security psk2
# Seems to get fixed with updating my security mode setting on router to WPA2PSK-TKIPAES
ip 172.20.10.2




t2 erase

t2 run textServer.js --slim
node textClient.js
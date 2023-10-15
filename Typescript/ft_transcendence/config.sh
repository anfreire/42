#!/bin/bash

OLD_INET_IP=$(cat .env | grep "IP" | awk -F '"' '{print $2}')

INET_IP=$(ifconfig | grep "inet" | grep -v "inet6" | sed -n 2p | awk '{print $2}')

sed -i "s/$OLD_INET_IP/$INET_IP/g" .env

xdg-open "https://console.cloud.google.com/apis/credentials/oauthclient/335037688539-ugj297pvn2a81u1o107bdqq9lq0vu2me.apps.googleusercontent.com?project=transcendence-396011" > /dev/null 2>&1 &
xdg-open "https://console.cloud.google.com/apis/credentials/consent/edit?project=transcendence-396011" > /dev/null 2>&1 &
xdg-open "https://profile.intra.42.fr/oauth/applications/15446/edit" > /dev/null 2>&1 &

echo -n $INET_IP | xclip -selection clipboard
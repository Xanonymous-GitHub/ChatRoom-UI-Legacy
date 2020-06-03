#!/bin/bash
sudo su
cd /home/wayne || return 1
rm -rf ./NPC-Mr.Coding-ChatRoom-UI
git clone git@github.com:Xanonymous-GitHub/NPC-Mr.Coding-ChatRoom-UI.git
cd NPC-Mr.Coding-ChatRoom-UI || return 1
#pip3 install -r requirements.txt
#export FLASK_APP=app.py
#mkdir certs
#mv ../certs/* ./certs
#screen -d -m sudo flask run --cert ./certs/server.pub --key ./certs/server.key --host=0.0.0.0 --port=443

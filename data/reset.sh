#!/bin/bash

url=http://127.0.0.1:5984
db=tests

clear

curl -X DELETE $url/$db
curl -X PUT $url/$db

for f in data*.json
do
    curl -X POST -d @$f  -H "Content-Type:application/json" $url/$db
done

#curl $url/$db

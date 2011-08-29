#!/bin/bash

url=http://127.0.0.1:5984
db=tests2

curl -X DELETE $url/$db
curl -X PUT $url/$db

curl -X POST --data @data1.json  -H "Content-Type:application/json" $url/$db

curl $url/$db

#!/bin/bash
if [ ! -e test.dissable ]; then
  java -jar ./test/lib/jstestdriver/JsTestDriver.jar --tests all $@
fi

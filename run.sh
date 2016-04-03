#!/bin/bash

cd musicApp
ionic plugin rm supercollider
ionic plugin add ../supercollider_plugin
ionic build android
ionic run android


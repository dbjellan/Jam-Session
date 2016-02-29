#!/bin/bash

cd musicApp
plugman uninstall --platform android --project platforms/android/ --plugin ../supercollider_plugin
plugman install --platform android --project platforms/android/ --plugin ../supercollider_plugin
ionic build android
cd ..


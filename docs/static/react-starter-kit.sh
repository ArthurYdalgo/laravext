#!/bin/bash
curl -s "https://raw.githubusercontent.com/ArthurYdalgo/laravext/main/base-install.sh?$(date +%s)" | bash -s "$1" react
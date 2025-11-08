#!/bin/bash
# From: https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity
shasum -b -a 384 "$1" | awk '{ print $1 }' | xxd -r -p | base64

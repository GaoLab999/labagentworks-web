#!/usr/bin/env python3
"""Upload only checksum-verified bytes to an already configured PRIVATE R2 bucket.
Uses CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN and NIH_R2_BUCKET from environment.
Does not create resources or enable public access. No credentials are printed.
"""
import hashlib
import os
import pathlib
import sys
import urllib.error
import urllib.parse
import urllib.request

expected = '229120f30b6906b0f5e0dbd1c1a01368f689ef334f6bce90e32e9f9d87fa080b'
if len(sys.argv) != 2:
    sys.exit('Usage: python3 scripts/upload-nih-installer.py /private/path/NIH-Download-Agent-Setup.exe')
data = pathlib.Path(sys.argv[1]).read_bytes()
if len(data) != 11512320 or hashlib.sha256(data).hexdigest() != expected:
    sys.exit('Installer verification failed; nothing uploaded.')
account = urllib.parse.quote(os.environ['CLOUDFLARE_ACCOUNT_ID'], safe='')
bucket = urllib.parse.quote(os.environ['NIH_R2_BUCKET'], safe='')
url = f'https://api.cloudflare.com/client/v4/accounts/{account}/r2/buckets/{bucket}/objects/nih-download-agent/v0.2.0-beta.1/NIH-Download-Agent-Setup.exe'
headers = {'Authorization': 'Bearer ' + os.environ['CLOUDFLARE_API_TOKEN'], 'Content-Type': 'application/octet-stream'}
try:
    with urllib.request.urlopen(urllib.request.Request(url, data=data, headers=headers, method='PUT')) as response:
        response.read()
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers)) as response:
        downloaded = response.read()
except urllib.error.URLError:
    sys.exit('R2 operation failed. Check account, private bucket, and token permissions; details suppressed to protect credentials.')
if hashlib.sha256(downloaded).hexdigest() != expected:
    sys.exit('R2 read-back verification failed; do not deploy.')
print('Private R2 upload and authenticated read-back SHA256 verified: ' + expected)

#!/usr/bin/env python3
"""Run locally with authenticated Wrangler; no secret files or terminal output."""
import getpass
import hashlib
import secrets
import subprocess
import sys

password = getpass.getpass('Owner-selected shared password (at least 16 characters): ')
if len(password) < 16 or len(password) > 256:
    sys.exit('Use 16–256 characters; prefer a password-manager-generated random value.')
if password != getpass.getpass('Confirm password: '):
    sys.exit('Passwords do not match.')
salt = secrets.token_hex(16)
values = {
    'NIH_PASSWORD_SALT': salt,
    'NIH_PASSWORD_VERIFIER': hashlib.pbkdf2_hmac('sha256', password.encode(), bytes.fromhex(salt), 100000).hex(),
    'NIH_TOKEN_SECRET': secrets.token_hex(32),
}
for name, value in values.items():
    result = subprocess.run(['wrangler', 'pages', 'secret', 'put', name, '--project-name', 'labagentworks-web'], input=value + '\n', text=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    if result.returncode:
        sys.exit('Secret configuration failed. Check Wrangler authentication and retry the entire script.')
print('Secrets configured. Redeploy after storage bindings are ready. No password was saved locally.')

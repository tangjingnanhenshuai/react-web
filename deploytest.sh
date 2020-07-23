#!/usr/bin/env bash
echo '====rm======'
rm -rf dist.zip
echo '====build======'
npm run build
echo '====zip======'
zip dist.zip -r dist/*
echo 'delete dist'
rm -rf dist
echo 'upload...'
scp dist.zip sanya@122.224.95.53:/home/sanya/web/sanya-agent-web.zip

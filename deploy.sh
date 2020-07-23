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
scp dist.zip sanyaAgentWeb@115.29.214.59:/home/sanyaAgentWeb

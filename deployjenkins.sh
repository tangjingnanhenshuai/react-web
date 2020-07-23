#!/usr/bin/env bash
# 删除旧的node_modules
rm -rf node_modules
# 根据package.json重新好安装node_modules
yarn install

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

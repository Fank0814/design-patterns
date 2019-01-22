#!/usr/bin/env sh

https="https://github.com/dongyuanxin/design-patterns.git"
git="git@github.com:dongyuanxin/design-patterns.git"

# 确保脚本抛出遇到的错误
set -e

# 生成静态文件
# vuepress build .

# 进入生成的文件夹
# cd .vuepress/dist/

# git init
# git add -A
# git commit -m 'deploy'

echo $1;

if [ $1 == "https" ]
then
  git push -f ${https} master:gh-pages
else if [ $1 == "ssh" ]
  git push -f ${ssh} master:gh-pages
then
  git push -f git@github.com:dongyuanxin/design-patterns.git master:gh-pages
fi

# git push -f https://github.com/dongyuanxin/design-patterns.git master:gh-pages

# cd -

# 开发
``yarn global add parcel-bundler
  parcel src/index.html
``
# 一键build
👇删除已存在的dist然后再次build（并且让SVG可以用）

``
yarn build
``
# 如何做到一键build的
在`package.json`里写一个`script`

``"scripts": {
    "build":" rm -rf dist; parcel build src/index.html --no-minify --public-url ./"
  }
``

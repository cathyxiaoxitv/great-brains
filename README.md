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
# 注意点
不知为何我修改后会出现取不到icon的情况，经过多次测试，解决方案就是
``
<script src="http://at.alicdn.com/t/font_1951378_gdeug8uqkoq.js"></script>
``
更新一下src前面的http前缀，然后再次yarn build。
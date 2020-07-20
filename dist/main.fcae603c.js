// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList'); //需要放前面，hashMap.forEach里无法访问到后面的变量

var $lastLi = $siteList.find('li.last'); //这样子写是不是更加具体？

var x = localStorage.getItem('x'); //把储存了hashMap的localStorage读取出来，是字符串，需要转成对象

var xObject = JSON.parse(x);
var hashMap = xObject || [{
  //第一次的时候是空的，需要我们初始化hashMap
  logo: 'D',
  url: 'http://sivers.org'
}, {
  logo: 'N',
  url: 'http://nav.al'
}, {
  logo: 'F',
  url: 'http://fs.blog'
}, {
  logo: 'T',
  url: 'http://tim.blog'
}, {
  logo: 'S',
  url: 'http://seths.blog'
}];

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www', '');
};

var render = function render() {
  $siteList.find('li:not(.last)').remove(); //找到除最后一项添加网址之外的所有，remove掉

  hashMap.forEach(function (node, index) {
    //遍历此hashMap，生成网站
    var $li = $("<li>    \n                <div class=\"siteWrapper\">\n                    <span class=\"tips\">\u7528\u952E\u76D8\u4E0A\u7684\u5B57\u6BCD\u6253\u5F00\u6211</span>\n                    <div class=\"close\">\n                            <svg class=\"icon\" aria-hidden=\"true\">\n                                <use xlink:href=\"#icon-close\"></use>\n                            </svg>\n                     </div>\n                    <div class=\"site\">\n                        <div class =\"logo\">\n                            ".concat(node.logo, "\n                        </div>\n                       \n                    </div>\n                    <div class=\"description\">").concat(simplifyUrl(node.url), "</div>\n                </div> \n</li>")).insertBefore($lastLi); //.on()的功能是在选定的元素上绑定一个或多个事件处理函数。

    $li.on('click', function () {
      window.open(node.url);
    }); //感知到click事件，执行函数【跳转url】

    $li.on('click', '.close', function (e) {
      // console.log('clicked') 测试看看
      e.stopPropagation(); //点击后代元素.close，执行"阻止click事件向上冒泡"
      // console.log(hashMap);//显示当前hashMap，如果能知道当前点击的site是数组里的第几个就好删除了

      hashMap.splice(index, 1);
      render();
    });
  });
};

render(); //一开始就render

$('.addButton') //indexOf返回string对象里出现制定值的索引
.on('click', function () {
  //首先把用户新输入的push进数组，再render一次
  var url = window.prompt('请问你要添加的网址是？');

  if (url.indexOf('http') !== 0) {
    //不是以'http'开头的话
    url = 'http://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    //储存简化的url
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  // console.log('页面要关闭了哟') preserve log方便查看
  var string = JSON.stringify(hashMap);
  localStorage.setItem('x', string); //把key的x和value的string存到localStorage里
};

$(document).on('keypress', function (e) {
  //const key = e.key;//变量名和属性名一样的时候可以简写如下
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (key.toUpperCase() === hashMap[i].logo) {
      window.open(hashMap[i].url);
    }
  }
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.fcae603c.js.map
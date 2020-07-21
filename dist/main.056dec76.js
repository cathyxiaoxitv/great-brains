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
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  }, {
    passive: false // 关闭被动监听

  });
  var lastTouchEnd = 0;
  document.addEventListener('touchend', function (event) {
    var now = new Date().getTime();

    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }

    lastTouchEnd = now;
  }, false);
};

var simplifyUrl = function simplifyUrl(url) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};

var xObject = JSON.parse(localStorage.getItem('userSite'));
var hashMap = xObject || [{
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
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');

var render = function render() {
  $siteList.find('li:not(.last)').remove();
  hashMap.forEach(function (node, index) {
    var $li = $("\n    <li>\n    <div class=\"siteWrapper\">\n        <span class=\"tips\">\u7528\u952E\u76D8\u4E0A\u7684\u5B57\u6BCD\u6253\u5F00\u6211</span>\n        <div class=\"close\">\n            <svg class=\"icon\" aria-hidden=\"true\">\n                <use xlink:href=\"#icon-close\"></use>\n            </svg>\n        </div>\n        <div class=\"site\">\n            <div class =\"logo\">\n                ".concat(node.logo, "\n            </div>\n        </div>\n        <div class=\"description\">").concat(simplifyUrl(node.url), "</div>\n    </div>\n</li>\n    ")).insertBefore($lastLi);
    $li.on('click', function () {
      window.open(node.url, '_self');
    });
    $li.on('click', '.close', function (e) {
      e.stopPropagation();
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();
$('.addButton').on('click', function () {
  console.log('hi');
  var url = window.prompt('请输入你要添加的网址');

  if (url.indexOf('http') !== 0) {
    url = 'http://' + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url
  });
  render();
});

window.onbeforeunload = function () {
  var string = JSON.stringify(hashMap);
  localStorage.setItem('userSite', string);
};

$(document).on('keypress', function (e) {
  var key = e.key;

  for (var i = 0; i < hashMap.length; i++) {
    if (key.toUpperCase() === hashMap[i].logo) {
      window.open(hashMap[i].url, '_self');
    }
  }
});
$(document).on('keypress', 'input', function (e) {
  e.stopPropagation();
});
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.056dec76.js.map
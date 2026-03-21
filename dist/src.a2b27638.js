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
})({"src/index.js":[function(require,module,exports) {
function displayWeather(response) {
  var temperatureElement = document.querySelector("#current-temperature");
  var feelsLikeElement = document.querySelector("#feels-like");
  currentTemperatureCelsius = Math.round(response.data.temperature.current);
  feelsLikeCelsius = Math.round(response.data.temperature.feels_like);
  temperatureElement.innerHTML = "".concat(currentTemperatureCelsius);
  feelsLikeElement.innerHTML = "".concat(feelsLikeCelsius, "\xB0");
  toggleButtons(true);
  var cityElement = document.querySelector("#current-city");
  var weatherIconElement = document.querySelector("#weather-icon");
  var humidityElement = document.querySelector("#humidity");
  var windSpeedElement = document.querySelector("#wind-speed");
  var weatherConditionElement = document.querySelector("#weather-condition");
  var currentDateElement = document.querySelector("#current-date");
  var date = new Date(response.data.time * 1000);
  cityElement.innerHTML = response.data.city;
  weatherIconElement.src = response.data.condition.icon_url;
  weatherIconElement.alt = response.data.condition.description;
  humidityElement.innerHTML = "".concat(response.data.temperature.humidity, "%");
  windSpeedElement.innerHTML = "".concat(response.data.wind.speed, " km/h");
  weatherConditionElement.innerHTML = response.data.condition.description;
  currentDateElement.innerHTML = formatDate(date);
  feelsLikeElement.innerHTML = "".concat(Math.round(response.data.temperature.feels_like), "\xB0");
}
function convertToCelsius() {
  if (currentTemperatureCelsius !== null) {
    var temperatureElement = document.querySelector("#current-temperature");
    temperatureElement.innerHTML = "".concat(currentTemperatureCelsius);
    convertForecastToCelsius();
    convertFeelsLikeToCelsius();
    toggleButtons(true);
  }
}
function convertToFahrenheit() {
  var temperatureElement = document.querySelector("#current-temperature");
  var temperature = parseInt(temperatureElement.innerHTML, 10);
  var fahrenheit = Math.round(temperature * 9 / 5 + 32);
  temperatureElement.innerHTML = "".concat(fahrenheit);
  convertForecastToFahrenheit();
  convertFeelsLikeToFahrenheit();
  toggleButtons(false);
}
function convertFeelsLikeToCelsius() {
  if (feelsLikeCelsius !== null) {
    var feelsLikeElement = document.querySelector('#feels-like');
    feelsLikeElement.innerHTML = "".concat(feelsLikeCelsius, "\xB0");
  }
}
function convertFeelsLikeToFahrenheit() {
  var feelsLikeElement = document.querySelector("#feels-like");
  var feelsLike = parseInt(feelsLikeElement.innerHTML, 10);
  var feelsLikeFahrenheit = Math.round(feelsLike * 9 / 5 + 32);
  feelsLikeElement.innerHTML = "".concat(feelsLikeFahrenheit, "\xB0");
}
function toggleButtons(isCelsius) {
  var celsiusButton = document.querySelector("#convert-to-celsius");
  var fahrenheitButton = document.querySelector("#convert-to-fahrenheit");
  celsiusButton.disabled = isCelsius;
  fahrenheitButton.disabled = !isCelsius;
}
function search(event) {
  event.preventDefault();
  var searchInputElement = document.querySelector("#search-input");
  var city = searchInputElement.value.trim();
  if (!city) {
    console.log("No city entered");
    return;
  }
  var apiKey = "10b545o25teaa28dd38fd076fc778f2c";
  var apiUrl = "https://api.shecodes.io/weather/v1/current?query=".concat(city, "&key=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(function (response) {
    displayWeather(response);
    getForecast(city);
  }).catch(function (error) {
    console.error("Failed to fetch weather data:", error);
  });
}
document.addEventListener('DOMContentLoaded', function () {
  var searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
});
document.addEventListener('DOMContentLoaded', function () {
  var celsiusButton = document.getElementById('convert-to-celsius');
  var fahrenheitButton = document.getElementById('convert-to-fahrenheit');
  if (celsiusButton) {
    celsiusButton.addEventListener('click', convertToCelsius);
  }
  if (fahrenheitButton) {
    fahrenheitButton.addEventListener('click', convertToFahrenheit);
  }
});
function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var dayOfWeek = daysOfWeek[date.getDay()];
  minutes = minutes < 10 ? "0".concat(minutes) : minutes;
  hours = hours < 10 ? "0".concat(hours) : hours;
  var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return "".concat(dayOfWeek, ", ").concat(monthNames[month], " ").concat(day, ", ").concat(year, " ").concat(hours, ":").concat(minutes);
}
function convertForecastToFahrenheit() {
  document.querySelectorAll(".weather-forecast-temperature-max, .weather-forecast-temperature-min").forEach(function (elem, index) {
    var isMax = elem.classList.contains("weather-forecast-temperature-max");
    var tempCelsius = isMax ? forecastTemperaturesCelsius[Math.floor(index / 2)].max : forecastTemperaturesCelsius[Math.floor(index / 2)].min;
    var tempFahrenheit = Math.round(tempCelsius * 9 / 5 + 32);
    elem.innerHTML = "<strong>".concat(tempFahrenheit, "\xB0</strong>");
  });
}
function convertForecastToCelsius() {
  document.querySelectorAll(".weather-forecast-temperature-max, .weather-forecast-temperature-min").forEach(function (elem, index) {
    var isMax = elem.classList.contains("weather-forecast-temperature-max");
    var tempCelsius = isMax ? forecastTemperaturesCelsius[Math.floor(index / 2)].max : forecastTemperaturesCelsius[Math.floor(index / 2)].min;
    elem.innerHTML = "<strong>".concat(tempCelsius, "\xB0</strong>");
  });
}
document.addEventListener('DOMContentLoaded', function () {
  var searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);
});
function loadDefaultCityWeather(defaultCity) {
  var apiKey = "10b545o25teaa28dd38fd076fc778f2c";
  var apiUrl = "https://api.shecodes.io/weather/v1/current?query=".concat(defaultCity, "&key=").concat(apiKey, "&units=metric");
  axios.get(apiUrl).then(displayWeather).catch(function (error) {
    console.error("Failed to fetch weather data:", error);
  });
}
function formatShortDate(time) {
  var date = new Date(time * 1000);
  var shortDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return shortDays[date.getDay()];
}
function getForecast(city) {
  var apiKey = "10b545o25teaa28dd38fd076fc778f2c";
  var apiUrl = "https://api.shecodes.io/weather/v1/forecast?query=".concat(city, "&key=").concat(apiKey, "&units=metric");
  axios(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  console.log(response.data);
  var forecastHtml = "";
  forecastTemperaturesCelsius = response.data.daily.map(function (day) {
    return {
      max: Math.round(day.temperature.maximum),
      min: Math.round(day.temperature.minimum)
    };
  });
  response.data.daily.forEach(function (day, index) {
    if (index > 0 && index < 6) {
      forecastHtml = forecastHtml + "<div class=\"container text-center\" id=\"weather-card\">\n              <div class=\"col\">\n                <div class=\"weather-forecast-date\">".concat(formatShortDate(day.time), "</div>\n                <img src=\"\n                 ").concat(day.condition.icon_url, "\n                  \"\n                  class=\"weather-icon\"\n                  id=\"weather-icon\"\n\n                  alt=\"sml weather-icon\"\n                />\n                <div class=\"weather-forecast-temperature\">\n                  <div class=\"weather-forecast-temperature-max\"><strong>").concat(Math.round(day.temperature.maximum), "\xB0</strong></div>\n                  <div class=\"weather-forecast-temperature-min\">").concat(Math.round(day.temperature.minimum), "\xB0</div>\n                </div>\n              </div>\n          </div>");
    }
  });
  var forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
loadDefaultCityWeather("Munich");
getForecast("Munich");
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "0.0.0.0" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "41151" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map
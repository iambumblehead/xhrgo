// Filename: xhrgo.js
// Timestamp: 2013.09.01-21:10:43 (last modified)  
// Author(s): Bumblehead (www.bumblehead.com), Joax
// Requires: 

// HTTP
// MS XMLHTTP instance calls from Flanagan, "Javascript The Definitive Guide"
// the xmlhttp object has a different name in different releases of mshtml
// library and so each of them is added here


var xhrgo = ((typeof module === 'object') ? module : {}).exports = (function (xhrgo) {

  xhrgo.factories = [
    function () { return new ActiveXObject("Microsoft.XMLHTTP"); },
    function () { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); },
    function () { return new ActiveXObject("MSXML2.XMLHTTP"); },
    function () { return new XMLHttpRequest(); }
  ];

  xhrgo.getHTTPObj = function (factory, i) {
    for (i = xhrgo.factories.length; i--;) {
      factory = xhrgo.factories[i];
      try {
        if (factory()) return factory;
      } catch (e) {
        continue;
      }
    }
    throw new Error("XMLHttpRequest not supported");
  };

  xhrgo.newRequest = (function (xhr) {
    return function () {
      return (xhr || (xhr = xhrgo.getHTTPObj()))();
    };
  }());

  xhrgo.getUriStrAsArgsObj = function (uri) {
    var key, val, arg, x, args, uriVals = {};
    
    uriVals.vanillaUri = uri.replace(/\?.*/, '');
    uriVals.hash = uri.replace(/.*#/, '');

    uri = uri.replace(/#.*$/, ''); // remove hash
    
    args = (uri.match(/\?/)) ? uri.replace(/^[^?]*\?/, '') : null;
    if (args && (args = args.split(/&/))) {
      for (x = args.length; x--;) {
        arg = args[x].split(/=/);
        key = arg[0];
        val = decodeURIComponent(arg[1]);
        uriVals[key + ''] = isNaN(+val) ? val : +val;
      }
    }
    return uriVals;
  };

  xhrgo.getArgsObjAsUriStr = function (uriVals) {
    var valArr = [], alphabetic = function (a, b) { return a > b; };

    if (uriVals) {
      for (var o in uriVals) {
        if (uriVals.hasOwnProperty(o)) {
          valArr.push(o + '=' + encodeURIComponent(uriVals[o]));
        }
      }
    }
    return valArr.sort(alphabetic).join('&');
  };

  xhrgo.addKeyVal = (function () {
    var kvStr = ":url:join:key=:value";

    return function (uri, k, v) {
      var j, newUri;

      if (uri.match(/\?$|&$/)) {
        j = '';
      } else if (uri.match(/\?/)) {
        j = '&';
      } else {
        j = '?';
      }

      return kvStr
        .replace(/:url/, uri)
        .replace(/:join/, j)
        .replace(/:key/, k)
        .replace(/:value/, v);
    };
  }());

  xhrgo.getUniqueIdNum = (function (uid) {
    return function () { return uid++; };
  }(0));

  xhrgo.getUriAsUnique = (function (d, uri, key) {
    d = Date.now();
    return function (uri) {
      key = d + xhrgo.getUniqueIdNum();
      return xhrgo.addKeyVal(uri, 'uid', d);
    };
  }());

  xhrgo.constructReadyState = function (xhr, fn) {
    return function() {
      if (xhr.readyState === 4) {
        fn(xhr);
      }
    };
  };

  xhrgo.getTextHTML = function (tpl, fn) {
    var xhr = xhrgo.newRequest();

    xhr.open("GET", tpl, true);

    xhr.onreadystatechange = xhrgo.constructReadyState(xhr, function (xhr) {
      if (xhr.status === 200) {
        fn(null, xhr.responseText);
      } else {
        fn(xhr);
      }
    });

    xhr.setRequestHeader("Content-Type", "text/html");
    xhr.send();
  };

  // type = 'POST|GET|PUT|DELETE'
  xhrgo.quickJSON = function (type, uri, data, token, fn, resWaitTime) {
    var xhr = xhrgo.newRequest(), 
        timeout = resWaitTime || 30000, 
        fullUri = uri.valueOf(),
        finData, timer,
        doneFn = function (err, res) { if (typeof fn === 'function') fn(err, res); };

    xhr.open(type, fullUri, true);

    xhr.setRequestHeader("Accept", "application/json, text/javascript");
    if (type.match(/PUT|POST/) && typeof data === 'object' && data) {
      finData = JSON.stringify(data);
    }

    if (token) {
      xhr.setRequestHeader("Authorization", token);
    }

    xhr.onreadystatechange = xhrgo.constructReadyState(xhr, function (xhr) {
      var err, res = 'success';

      clearTimeout(timer);
      if (xhr.status === 500) return doneFn('Internal Server Error');

      if (xhr.responseText) {
        try {
          res = JSON.parse(xhr.responseText);
        } catch(e) {
          res = xhr.responseText;
        }
      }

      if (xhr.status === 200) {
        doneFn(null, res);
      } else {
        doneFn(xhr, res);
      }

      err = (xhr.status === 200) ? null : xhr;
      doneFn(null, res);
    });

    xhr.send(finData);
    timer = setTimeout(function () { xhr.abort(); doneFn(xhr); }, timeout);
  };

  xhrgo.quickJSONU = function (type, uri, data, token, fn, resWaitTime) {
    xhrgo.quickJSON(type, xhrgo.getUriAsUnique(uri), data, token, fn, resWaitTime);
  };

  return xhrgo;

}({}));

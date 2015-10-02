xhrgo
=====
**(c)[Bumblehead][0], 2013-2015** [MIT-license](#license)

### overview

Simple/dumb `xhr` object for sending requests. xhrgo is not a comprehensive solution for xhr usage. It's perfect for the most common type of request using non-chunked json, html and [form-urlencoded][3] data formats. It assumes there is one 'success' response, `200`.

xhrgo uses the node.js callback convention.

[0]: http://www.bumblehead.com                            "bumblehead"
[3]: https://npmjs.org/package/form-urlencoded    "www-urlformencoded"

------------------------------------------------------------------------------
#### <a id="install"></a>install

xhrgo may be downloaded directly or installed through `npm`.

```bash
$ npm install form-urlencoded
```

to run tests, use `npm test` from a shell.

```bash
$ npm test
```
 
---------------------------------------------------------
#### <a id="usage">usage

The same parameters are used for each method:

**_type_**, REST type such as 'PUT', 'POST', 'DELETE', 'GET'.
**_url_**, the url at which the request is made
**_data_**, object to be stringified and sent with PUT and POST requests
**_token_** authorization token
**_fn_** callback function using node.js convention, passes err as first parameter
**_time_** number in milliseconds used with `setTimeout` to wait for a response


1. **xhrgo.quickJSON( _type_, _url_, _data_, _token_, _fn_, _time_ )**

   The first two parameters are required. Data is sent and received in JSON format but is passed to and returned from the method as an object.
   ```javascript
   xhrgo.quickJSON('POST', '/hi', {hi:'b'}, null, function (err, res) {
     if (err) return fn(new Error(err));
     fn(null, res);
   }, 1000);
   ```

2. **xhrgo.quickJSONU( _type_, _url_, _data_, _token_, _fn_, _time_ )**

   Calls `xhrgo.quickJSON`, adding a unique parameter to the url to avoid cached responses.

3. **xhrgo.getTextHTML( _url_, _fn_, _time_ )**

   Makes 'GET' requests with "Content-Type" "text/html". Useful for requesting static template and text files.
   ```javascript
   xhrgo.getTextHTML(htmlUrl, function (err, template) {
     if (err) return fn(new Error('failed load html: ' + htmlUrl));
     fn(null, template);
   });
   ```

4. **xhrgo.getTextHTMLU( _url_, _fn_, _time_ )**

   Calls `xhrgo.getTextHTML`, adding a unique parameter to the url to avoid cached responses.

5. **xhrgo.newRequest( )**

   Returns a browser-supported xhr object. The value returned is usually `new XMLHttpRequest()`

6. **xhrgo.getUriAsUnique( _url_ )**

   Returns a new url with a unique parameter added.
   ```javascript
   xhrgo.getUriAsUnique('/a.html'); // "/a.html?uid=1377988402490"
   ```

7. **xhrgo.addKeyVal( _url_, _k_, _v_ )**

   Returns a new url with key/val parameters added.
   ```javascript
   var url = '/resource';
   url = xhrgo.addKeyVal(url, 'a', '1'); // "/resource?a=1"
   url = xhrgo.addKeyVal(url, 'b', '2'); // "/resource?a=1&b=2"
   ```

8. **xhrgo.getArgsObjAsUriStr( _argsObj_ )**

   Top-level properties of the object are returned as a key/value string. Each value is encoded. The keys are joined in alphabetical order. For more comprehensive object serialization use [url-formencoded][2].
   ```javascript
   xhrgo.getArgsObjAsUriStr({
     modified : 137798840249,
     currency : 'usd'
   }); 
   // "currency=usd&modifed=137798840249"
   ```

9. **xhrgo.getUriStrAsArgsObj( _uriStr_ )**

   Retuns an object with properties named and defined with values from the url. `vanillaUri` and `hash` are always named properties on the object returned.
   ```javascript
   xhrgo.getUriStrAsArgsObj(
     "/resource/currency=usd&time=137798840249#hashvalue"
   }); 
   // {
   //   vanillaUri : '/resource/currency=usd&time=137798840249#val',
   //   hash : 'val',
   //   lastmodified : 137798840249,
   //   currency : 'usd'
   // }
   ```


[2]: http://github.com/iambumblehead/url-formencoded     "formencoded"


------------------------------------------------------------------------------
#### <a id="license">license

 ![scrounge](https://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2013-2015 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

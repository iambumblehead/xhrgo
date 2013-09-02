xhrgo
=====
**(c)[Bumblehead][0], 2013** [MIT-license](#license)  

### OVERVIEW:

Simple/dumb `xhr` object for sending requests. xhrgo is not a comprehensive solution for xhr usage. It's perfect for the most common type of request using non-chunked json, html and [form-urlencoded][3] data formats. It assumes there is one 'success' response, `200`.

xhrgo uses the node.js callback convention.

[0]: http://www.bumblehead.com                            "bumblehead"
[3]: https://npmjs.org/package/form-urlencoded    "www-urlformencoded"

------------------------------------------------------------------------------
#### <a id="install"></a>INSTALL:

xhrgo may be downloaded directly or installed through `npm`.

 * **npm**   

 ```bash
 $ npm install xhrgo
 ```

 * **Direct Download**
 
 ```bash  
 $ git clone https://github.com/iambumblehead/xhrgo.git
 $ cd xhrgo && npm install
 ```


------------------------------------------------------------------------------
#### <a id="test"></a>TEST:

 to run tests, use `npm test` from a shell.

 ```bash
 $ npm test
 ```
 
---------------------------------------------------------
#### <a id="usage">USAGE:

 There are [several methods](#methods) defined on `xhrgo`. One method would return 
 compare two objects to see if they have definition for the same members

---------------------------------------------------------
#### <a id="methods">METHODS:

The same parameters are used for each method:

 - **_type_**, REST type such as 'PUT', 'POST', 'DELETE', 'GET'.
 - **_url_**
 - **_data_**, object to be stringified and sent with PUT and POST requests.
 - **_token_** authorization token.
 - **_fn_** callback function used in the node.js convention -error is passed as the first parameter.
 - **_time_** number value in milliseconds -it is used with `setTimeout` to cancel a request that has not received a response during that timespan.



 - **xhrgo.JSON( _type_, _url_, _data_, _token_, _fn_, _time_ )**
 
   The first two parameters are required. Data is sent and received in the JSON format. Data is passed to and returned from the method in the form of an object.
 
   ```javascript
   xhrgo.JSON('POST', '/hi', {hi:'b'}, null, function (err, res) {
     if (err) return fn(new Error(err));     
     fn(null, res);
   }, 1000);
   ```

 - **xhrgo.JSONU( _type_, _url_, _data_, _token_, _fn_, _time_ )**

   Calls `xhrgo.JSON` after adding a unique parameter to the url. Used to avoid cached responses.

 - **xhrgo.getTextHTML( _url_, _fn_, _time_ )**
 
   This method makes 'GET' requests with "Content-Type" "text/html". Useful for requesting static template and text files.

   ```javascript
   xhrgo.getTextHTML(htmlUrl, function (err, template) {
     if (err) return fn(new Error('failed load html: ' + htmlUrl));        
     fn(null, template);
   });
   ```
   
 - **xhrgo.getTextHTMLU( _url_, _fn_, _time_ )**

   Calls `xhrgo.getTextHTML` after adding a unique parameter to the url. Used to avoid cached responses.

 - **xhrgo.newRequest( )**
 
   Returns a browser-supported xhr object. For most browser's the value returned by this method is `new XMLHttpRequest()`

 - **xhrgo.getUriAsUnique( _url_ )**
 
   Returns a new url with a unique parameter added.

   ```javascript
   xhrgo.getUriAsUnique('/a.html'); // "/a.html?uid=1377988402490"
   ```

 - **xhrgo.addKeyVal( _url_, _k_, _v_ )**
 
   Returns a new url with key/val parameters added.
   
   ```javascript
   var url = '/resource';
   url = xhrgo.addKeyVal(url, 'a', '1'); // "/resource?a=1"
   url = xhrgo.addKeyVal(url, 'b', '2'); // "/resource?a=1&b=2"
   ```

 - **xhrgo.getArgsObjAsUriStr( _argsObj_ )**
 
   Top-level properties of the object are returned as a key/value string. Each value is encoded. The keys are joined in alphabetical order. 

   For more comprehensive object serialization use [url-formencoded][2].

   ```javascript
   xhrgo.getArgsObjAsUriStr({
     modified : 137798840249,
     currency : 'usd'
   }); 
   // "currency=usd&modifed=137798840249"
   ```

 - **xhrgo.getUriStrAsArgsObj( _uriStr_ )**
 
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
#### <a id="license">License:

 ![scrounge](http://github.com/iambumblehead/scroungejs/raw/master/img/hand.png) 

(The MIT License)

Copyright (c) 2012 [Bumblehead][0] <chris@bumblehead.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

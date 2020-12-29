
    // Array to hold callback functions
    var callbacks = []; 
    var eventObject = [];
    /**
     * Credit
     * http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript/901144#901144
     */



     
    function getParameterByName( url, name ) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);

        if ( results === null ) {
            return '';
        } else {
            return decodeURIComponent(results[1].replace(/\+/g, " "));
        }
    }

    // This function is called onload in the popup code
    function getPageInfo(callback) 
    { 
        // Add the callback to the queue
        callbacks.push(callback); 

        // Injects the content script into the current page 
        chrome.tabs.executeScript(null, { file: "content_script.js" }); 
    }; 

    // Perform the callback when a request is received from the content script
    chrome.extension.onRequest.addListener(function(request) 
    { 
        // Get the first callback in the callbacks array
        // and remove it from the array
        var callback = callbacks.shift();

        // Call the callback function
        callback(request); 
    }); 
    
    chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
       console.log(details) 
        var referer, eventString, uacode;
        var category, action, label, val;

        for (var i = 0; i < details.requestHeaders.length; ++i) {
          if (details.requestHeaders[i].name === 'User-Agent') {
            details.requestHeaders.splice(i, 1);
            break;
          }
        }

        if(details.url.indexOf('google-analytics') > -1) {

            referer = tabid = eventString = uacode = category = action = label = val = '<i>null</i>';

            tabid = details.tabId;
            category = getParameterByName(details.url, 'ec');
            action = getParameterByName(details.url, 'ea');
            label = getParameterByName(details.url, 'el');
            val = getParameterByName(details.url, 'ev');
            uacode = getParameterByName(details.url, 'tid');
            referer = getParameterByName(details.url, 'dl');

            eventObject.push([referer, uacode, category, action, label, val, tabid]);
            if(eventObject.length > 25) eventObject.shift();
        }
       
        return {requestHeaders: details.requestHeaders};
      },
      {urls: ["<all_urls>"]},
      ["requestHeaders"]
    );

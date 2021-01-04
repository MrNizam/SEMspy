console.log('Background.js')
    // Array to hold callback functions
    var callbacks = []; 
    var eventObject = [];
    /**
     * Credit
     * http://stackoverflow.com/questions/901115/get-query-string-values-in-javascript/901144#901144
     */





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
        
        var requestData = {
          initiator : details.initiator,
          method : details.post,
          tabId : details.tabId,
          type:details.type,
          url:details.url
        }
        console.log('###', requestData)
        eventObject.push(requestData)
            

        return {requestHeaders: details.requestHeaders};
      },
      {urls: ["<all_urls>"]},
      ["requestHeaders"]
    );

    
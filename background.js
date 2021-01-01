
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
        console.log('callbacks' , callback)
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
        console.log('background.js','onrequest',request)
    }); 
    

    chrome.webRequest.onBeforeSendHeaders.addListener(
      function(details) {
        var requestData = {
          method : details.post,
          tabId : details.tabId,
          url:details.url
        }
        console.log('###', callbacks)
        eventObject.push(requestData)
            
        return {requestHeaders: details.requestHeaders};
      },
      {urls: ["<all_urls>"]},
      ["requestHeaders"]
    );


        // CMS DETECTION
      
    var _pageScripts = [].map.call( document.scripts , function(node){
      return node.textContent || node.innerText || "";
    }).join("");
    _pageScripts += document.documentElement
    // Build a string soup of the dom to run regex against. Regex has a 98% preformance advantage over js string search so this will be fast for everyone except I.E nerds, to extend, just collect data, then append it to the existing string, who cares about duplicates
    
    
    
    
    console.log(typeof _pageScripts)
    
    let cmsDetectiveCases = {
    'bigcommerce' :(_pageScripts.match(/bigcommerce/gi) || []).length,
    'wordpress' :(_pageScripts.match(/wordpress/gi) || []).length,
    'shopify' :(_pageScripts.match(/shopify/gi) || []).length,
    'magento' : (_pageScripts.match(/magento/gi) || []).length, // M2 https://www.oshamanual.com/
    'wix' : (_pageScripts.match(/wix/gi) || []).length, // https://www.animalmusicweb.com/
    'drupal' : (_pageScripts.match(/drupal/gi) || []).length, // https://www.drupal.org/
    'joomla' : (_pageScripts.match(/joomla/gi) || []).length, // https://www.lejourlepluscourt.be
    'prestashop' : (_pageScripts.match(/prestashop/gi) || []).length, // https://www.maniac-auto.com/fr/
    '3dcart' : (_pageScripts.match(/3dcart/gi) || []).length, // https://www.unicusdecor.com/
    'squarespace' : (_pageScripts.match(/squarespace/gi) || []).length, // https://www.curibio.com/
    }
    
    
    console.log(Object.keys(cmsDetectiveCases).reduce(function(a, b){ return cmsDetectiveCases[a] > cmsDetectiveCases[b] ? a : b }),cmsDetectiveCases // returm the CMS with the highest mentions
    )
    
        var currentTab;
        
        
        // This callback function is called when the content script has been 
        // injected and returned its results
        function onPageInfo(o) 
        { 
        } 

        // POST the data to the server using XMLHttpRequest
        function addBookmark(f)
        {
            return false;
        }

        function updateList() {
            var requestData = chrome.extension.getBackgroundPage().eventObject; // capture of all requests
            var newhtml = '';
            var requestDataForCurrentTab = requestData.filter(function(x){ return x.tabId === currentTab;}); // new array from all requests, but only requests sent by the current tab
            console.log(requestDataForCurrentTab)


            if(requestDataForCurrentTab.length ) {
                for(var i = requestDataForCurrentTab.length-1; i > 0; i--) {
                    // parse the request
                    var requestUrl = requestDataForCurrentTab[i].url;
                    console.log(requestUrl)

    
                    category = getParameterByName(requestUrl, 'ec');
                    action = getParameterByName(requestUrl, 'ea');
                    label = getParameterByName(requestUrl, 'el');
                    val = getParameterByName(requestUrl, 'ev');
                    uacode = getParameterByName(requestUrl, 'tid');
                    referer = getParameterByName(requestUrl, 'dl');
        
        










                    newhtml += '<tr class="entry">';
                        newhtml += '<td>' + requestDataForCurrentTab[i].initiator + '</td>';
                        newhtml += '<td class="uastring">' + requestDataForCurrentTab[i][1] + '</td>';
                        newhtml += '<td>' + requestDataForCurrentTab[i][2] + '</td>';
                        newhtml += '<td>' + requestDataForCurrentTab[i][3] + '</td>';
                        newhtml += '<td>' + requestDataForCurrentTab[i][4] + '</td>';
                        newhtml += '<td>' + requestDataForCurrentTab[i][5] + '</td>';
                    newhtml += '</tr>';
                }
                document.getElementById('event-list').innerHTML = newhtml;
            } else {
                newhtml += '<p><b>No events recorded yet.</b></p>';
                document.getElementById('event-list').innerHTML = newhtml;
            }

        }


        // Call the getPageInfo function in the background page, passing in 
        // our onPageInfo function as the callback
        window.onload = function() { 
          
                var table = document.getElementById('event-table');
                var tableClasses = table.classList;
                
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    // on popup load, query chrome to get the tabs ID, then save to currentID so we can filter all incoming requests to only store requests coming from the tab that the popup was opened on
                    currentTab = tabs[0].id;
                });


            updateList();
            setInterval(updateList, 500);
            document.getElementById('reset-list').onclick = function() {
                chrome.extension.getBackgroundPage().eventObject = [];
                updateList();
            };
        };

    


     
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
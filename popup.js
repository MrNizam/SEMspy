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
            var bgeo = chrome.extension.getBackgroundPage().eventObject;
            var newhtml = '';
            var dispURL = '';
            console.log(bgeo, chrome.tabs.query(
                {currentWindow: true, active : true},
                function(tabArray){console.log(tabArray)}
              ))
            if(bgeo.length) {
                var countUntil;
                if(bgeo.length > 15) {
                    countUntil = bgeo.length - 15;
                } else {
                    countUntil = -1;
                }
                for(var i = bgeo.length-1; i > countUntil; i--) {
                    if(bgeo[i][0].length > 37) {
                        dispURL = bgeo[i][0].substr(0, 32) + ' ...';
                    } else {
                        dispURL = bgeo[i][0];
                    }
                    newhtml += '<tr class="entry">';
                    newhtml += '<td>' + bgeo[i][2] + '</td>';
                        newhtml += '<td class="uastring">' + bgeo[i][1] + '</td>';
                        newhtml += '<td>' + bgeo[i][2] + '</td>';
                        newhtml += '<td>' + bgeo[i][3] + '</td>';
                        newhtml += '<td>' + bgeo[i][4] + '</td>';
                        newhtml += '<td>' + bgeo[i][5] + '</td>';
                    newhtml += '</tr>';
                }
                document.getElementById('event-list').innerHTML = newhtml;
            } else {
                newhtml += '<p><i>No events recorded yet.</i></p>';
                document.getElementById('event-list').innerHTML = newhtml;
            }

        }

        // Call the getPageInfo function in the background page, passing in 
        // our onPageInfo function as the callback
        window.onload = function() { 
          
                var table = document.getElementById('event-table');
                var tableClasses = table.classList;
                
            
            updateList();
            setInterval(updateList, 250);
            document.getElementById('reset-list').onclick = function() {
                chrome.extension.getBackgroundPage().eventObject = [];
                updateList();
            };
        };
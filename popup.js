console.log('popup.js')

// Call the getPageInfo function in the background page, passing in 
// our onPageInfo function as the callback
var currentTab;
var currentTabDom









function popupCore() {


cmsDetection()
updateList()


}



    // This callback function is called when the content script has been 
    // injected and returned its results
    function onPageInfo(o) {
        console.log(o)
    }

    // POST the data to the server using XMLHttpRequest
    function addBookmark(f) {
        return false;
    }



function cmsDetection(){
    console.log(typeof currentTabDom)

    let cmsDetectiveCases = {
        'bigcommerce': (currentTabDom.match(/bigcommerce/gi) || []).length,
        'wordpress': (currentTabDom.match(/wordpress/gi) || []).length,
        'shopify': (currentTabDom.match(/shopify/gi) || []).length,
        'magento': (currentTabDom.match(/magento/gi) || []).length, // M2 https://www.oshamanual.com/
        'wix': (currentTabDom.match(/wix/gi) || []).length, // https://www.animalmusicweb.com/
        'drupal': (currentTabDom.match(/drupal/gi) || []).length, // https://www.drupal.org/
        'joomla': (currentTabDom.match(/joomla/gi) || []).length, // https://www.lejourlepluscourt.be
        'prestashop': (currentTabDom.match(/prestashop/gi) || []).length, // https://www.maniac-auto.com/fr/
        '3dcart': (currentTabDom.match(/3dcart/gi) || []).length, // https://www.unicusdecor.com/
        'squarespace': (currentTabDom.match(/squarespace/gi) || []).length, // https://www.curibio.com/
    }

    console.log(Object.keys(cmsDetectiveCases).reduce(function (a, b) {
            return cmsDetectiveCases[a] > cmsDetectiveCases[b] ? a : b
        }), cmsDetectiveCases // returm the CMS with the highest mentions
    )
}


function updateList() {
    var requestData = chrome.extension.getBackgroundPage().eventObject; // capture of all requests
    var newhtml = '';
    var requestDataForCurrentTab = requestData.filter(function (x) {
        return x.tabId === currentTab;
    }); // new array from all requests, but only requests sent by the current tab id
    console.log(requestDataForCurrentTab)
    if (requestDataForCurrentTab.length) {
        for (var i = requestDataForCurrentTab.length - 1; i > 0; i--) {

            // parse the request
            var requestUrl = requestDataForCurrentTab[i].url;
            


            let adPlatformId = {
                'googleAnalytics': (requestUrl.match(/google-analytics/gi) || []).length,
                'facebookPixel': (requestUrl.match(/facebook/gi) || []).length,
                'microsoftAds': (requestUrl.match(/bing/gi) || []).length,
                'googleAds': (requestUrl.match(/googleads/gi) || []).length,
            }
        
           



            category = getParameterByName(requestUrl, 'ec');
            action = getParameterByName(requestUrl, 'ea');
            label = getParameterByName(requestUrl, 'el');
            event = getParameterByName(requestUrl, 'ev');
            uacode = getParameterByName(requestUrl, 'tid');
            referer = getParameterByName(requestUrl, 'dl');
var id = getParameterByName(requestUrl, 'tid') || getParameterByName(requestUrl, 'id');



            /*  
https://www.facebook.com/tr/?id=698287767460856&ev=Lead&dl=https%3A%2F%2Flp-code-sandbox.myshopify.com%2F&rl=&if=false&ts=1609458803598&sw=3840&sh=2160&v=2.9.31&r=stable&a=shopify&ec=2&o=30&fbp=fb.1.1609366203655.190668562&it=1609447235690&coo=false&rqm=GET&dt=wjtrv71mnecrrx5t9lc6wbcuwxj5uq7g
https://www.google-analytics.com/collect?v=1&_v=j87&a=1864738205&t=event&_s=7&dl=https%3A%2F%2Flp-code-sandbox.myshopify.com%2F&dp=%2F&ul=en-us&de=UTF-8&dt=lp-code-sandbox&sd=24-bit&sr=3840x2160&vp=1162x2017&je=0&ec=contact&ea=submit&el=form&_u=SCCAgUABBAAAAG~&jid=&gjid=&cid=936459019.1609366203&tid=UA-111111111-1&_gid=1985570343.1609366203&did=BwiEti&z=1516252613
https://bat.bing.com/action/0?ti=1111111111&Ver=2&mid=7c19bb9c-06b4-4616-b6e0-57b2d4b41048&sid=c40590804aeb11eb840eb12af8acc503&vid=342ceca03e4011eb92bb2d1a1c14bfe7&vids=0&ec=CATEGROY&ea=ACTION&el=LABEL&evt=custom&msclkid=N&rn=816721
https://www.google.com/pagead/1p-conversion/CONVERSION_ID/?random=665448285&cv=9&fst=1609458953085&num=1&currency_code=%7B%7B%20shop.currency%20%7D%7D&label=CONVERSION_LABEL&bg=ffffff&guid=ON&resp=GooglemKTybQhCsO&u_h=2160&u_w=3840&u_ah=2130&u_aw=3840&u_cd=24&u_his=2&u_tz=-480&u_java=false&u_nplug=3&u_nmime=4&gtm=2oabu0&sendb=1&ig=1&data=event%3Dconversion&frm=0&url=https%3A%2F%2Flp-code-sandbox.myshopify.com%2F&tiba=lp-code-sandbox&hn=www.googleadservices.com&async=1&fmt=3&ctc_id=CAIVAgAAAB0CAAAA&ct_cookie_present=false&eoid=CkIKEQiAirb_BRCZ-4nQ6K3QjO4BEi0AUIzDM-hK0-L_TV_8ljBqJM4r3DOt-Jz692etCK5DuhYkWA-OQcBTXOXtsaLw_wcB&sscte=1&crd=&is_vtc=1&ocp_id=CmXuX-CRHM-CkwOn_bSoBQ&dclk_oo=1&random=715789942&resp=GooglemKTybQhCsO
https://googleads.g.doubleclick.net/pagead/viewthroughconversion/CONVERSION_ID/?random=665448285&cv=9&fst=1609458953085&num=1&currency_code=%7B%7B%20shop.currency%20%7D%7D&label=CONVERSION_LABEL&bg=ffffff&guid=ON&resp=GooglemKTybQhCsO&u_h=2160&u_w=3840&u_ah=2130&u_aw=3840&u_cd=24&u_his=2&u_tz=-480&u_java=false&u_nplug=3&u_nmime=4&gtm=2oabu0&sendb=1&ig=1&data=event%3Dconversion&frm=0&url=https%3A%2F%2Flp-code-sandbox.myshopify.com%2F&tiba=lp-code-sandbox&hn=www.googleadservices.com&async=1&fmt=3&ctc_id=CAIVAgAAAB0CAAAA&ct_cookie_present=false&ocp_id=CmXuX-CRHM-CkwOn_bSoBQ&eoid=CkIKEQiAirb_BRCZ-4nQ6K3QjO4BEi0AUIzDM-hK0-L_TV_8ljBqJM4r3DOt-Jz692etCK5DuhYkWA-OQcBTXOXtsaLw_wcB&sscte=1&crd=
*/




            newhtml += '<tr class="entry">';
            newhtml += '<td>' + Object.keys(adPlatformId).reduce(function (a, b) {
                return adPlatformId[a] > adPlatformId[b] ? a : b
            })  + '</td>'; // Ad platform 
            newhtml += '<td class="uastring">' + id + '</td>'; // tracking code ID
            newhtml += '<td>' + requestDataForCurrentTab[i] + '</td>'; // Event Data
            
            newhtml += '</tr>';


        }
        document.getElementById('event-list').innerHTML = newhtml;
    } else {
        newhtml += '<p><b>No events recorded yet.</b></p>';
        document.getElementById('event-list').innerHTML = newhtml;
    }

}







function getParameterByName(url, name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);
    var results = regex.exec(url);

    if (results === null) {
        return '';
    } else {
        return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
}




// Start. 
window.onload = function () {

    var table = document.getElementById('event-table');
    var tableClasses = table.classList;

    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function (tabs) {
        // on popup load, query chrome to get the tabs ID, then save to currentID so we can filter all incoming requests to only store requests coming from the tab that the popup was opened on
        currentTab = tabs[0].id;
    });


    // have chrome return dom soup
    chrome.tabs.executeScript({
        code: `(${ inContent })()`
    }, function (result) {
        if (!chrome.runtime.lastError) {
            currentTabDom = result[0].html
            popupCore() // begin our evaluation of the page after chrome has sent back the dom & data
            console.log('core called')
        }
    });

    function inContent(params) {
        return {
            success: true,
            html: document.body.innerHTML
        };
    }


    updateList();
    setInterval(updateList, 500);
    document.getElementById('reset-list').onclick = function () {
        chrome.extension.getBackgroundPage().eventObject = [];
        updateList();
    };
};
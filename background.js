// background.js
var tab_callbacks = {};

// var segment = 26691809; //Sapiegine
var segment = 26805702; // Verkiai
var per_page = 200;
// var gender = "all"; // or "F"

chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];

        chrome.tabs.create({"url":"https://docs.google.com/spreadsheets/d/1ttiTDL2SQPeUeJzkE8V3ZJNO5-JwGk30Os9aouipOes/edit#gid=880484624"});

        var resultUrl = "https://www.strava.com/segments/"+ segment +"/leaderboard?filter=overall&gender=F&per_page="+ per_page +"&partial=true"
        console.log(resultUrl);
        chrome.tabs.create({"url": resultUrl}, function(newTab) {
            tab_callbacks[newTab.id] = function() {
                chrome.tabs.sendMessage(newTab.id, {"url": resultUrl, "test": "this is", "message": "clicked_browser_action"});
            }
        });

        var resultUrl = "https://www.strava.com/segments/"+ segment +"/leaderboard?filter=overall&gender=all&per_page="+ per_page +"&partial=true"
        console.log(resultUrl);
        chrome.tabs.create({"url": resultUrl}, function(newTab) {
            tab_callbacks[newTab.id] = function() {
                chrome.tabs.sendMessage(newTab.id, {"url": resultUrl, "test": "this is", "message": "clicked_browser_action"});
            }
        });
    });
});

chrome.tabs.onUpdated.addListener(function(tabid, info, tab) {
    // make sure the status is 'complete' and it's the right tab
    if (info.status != "complete") {
        return;
    }

    if (tab_callbacks[tabid]) {
        tab_callbacks[tabid]();
        delete tab_callbacks[tabid];
    }
});
  
  // This block is new!
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "open_new_tab" ) {

            // console.log("this is from new tab: " + request.url);
            // console.log(request.res);
            // chrome.tabs.create({"url": request.url});
        }
    }
  );

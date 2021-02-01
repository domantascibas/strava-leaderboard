// content.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if( request.message === "clicked_browser_action" ) {
            // console.log(request.url);

            var body = document.getElementsByTagName("body")[0];
            var content = document.getElementById("results").getElementsByTagName("tbody")[0];

            body.innerHTML = '<table style="font-family:Arial; margin-left: auto; margin-right: auto;"><tbody>'+ format(content).innerHTML +"</tbody></table>";
            document.querySelectorAll("a").forEach(a => a.outerHTML = a.innerHTML);
            // chrome.runtime.sendMessage({"message": "open_new_tab", "url": request.url});
        }
    }
);

function format(content) {
    content.querySelectorAll(".last-child").forEach(function(time) {
        // console.log(time.innerHTML);
        let givenStr = time.innerHTML;

        let ch = ':';
        let count = 0;
        
        for(let i = 0; i<givenStr.length; i++){
            if(givenStr.charAt(i) == ch){
                count ++;
            }
        }
        // console.log(count);
        
        if (count == 1) {
            time.innerHTML = "00:"+ givenStr;
        }
        // console.log(time.innerHTML);
    });
    return content;
}

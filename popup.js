document.getElementById("test").addEventListener('click', () => {
  function modifyDOM() {
      var tab_url = window.location.href;
      console.log(tab_url);
      // var nw = window.open(tab_url + "/leaderboard?filter=overall&gender=all&per_page=200&partial=true", "_blank");
      
      // nw.onload = function() {
        var content = document.getElementById("results");
        var res = content.getElementsByTagName("tbody")[0];
        console.log(res);
        // nw.window.close();
        return res.innerHTML;
  }

  chrome.tabs.executeScript({
      code: '(' + modifyDOM + ')();' //argument here is a string but function.toString() returns function's code
  }, (results) => {
      console.log(results[0]);
      var nw = window.open("");
      nw.document.write("<table><tbody>");
      nw.document.write(results[0]);
      nw.document.write("</tbody></table>");
      nw.document.close();
  });
});

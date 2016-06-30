$(document).ready(function() {
  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == variable) {
        return decodeURIComponent(pair[1]);
      }
    }
  }

  var appId = getQueryVariable("app_id");
  var apiKey = getQueryVariable("api_key");
  var segment = getQueryVariable("segment");

  var dashboard = new Dashboard(appId, apiKey, segment);
  dashboard.boot();
});

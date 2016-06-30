(function() {
  "use strict";

  var Dashboard = function() {
  };

  Dashboard.prototype.boot = function() {
    this.refresh();
    window.setInterval(this.refresh, 300000);
  };

  Dashboard.prototype.refresh = function() {

    var that = this;

    $.ajax({
      url: "/count",
      dataType: 'json',
      contentType: 'application/json',
      cache: false,
      success: function(data, status, xhr) {
        $('.loading').remove();
        $('.data').remove();

        var count = data.count;

        var container = $('<div class="data"></div>');

        var count = $('<div class="count">' + count + '</div>');
        container.append(count);

        container.append($('<div class="suffix">Active users</div>'));
        container.append($('<div class="micro-suffix">Last 28 days</div>'));

        $('.container').append(container);
      },
      error: function(xhr, status, error) {
        $('.loading').remove();
        $('.container').append('<div class="loading">There was a problem loading the dashboard, trying again shortly&hellip;</div>');
      }
    });
  };

  window.Dashboard = Dashboard;
})();

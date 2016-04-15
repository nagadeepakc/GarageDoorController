$(document).ready(function() {

  var status = false; // open is true, close is false

  var db = openDatabase('DATABASE_HISTORY', '1.0', 'DATABASE_HISTORY', 2 * 1024 * 1024);
  var t = (new Date()).getTime();
  // create the database if not already created
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS HISTORY (time, log)');
  });

  // populate table
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM HISTORY', [], function (tx, results) {
      var len = results.rows.length;
      for (var i = 1; i <= len; i++) {

        var table = document.getElementById("table");
        var row = table.insertRow(1);

        var callCell = row.insertCell(0);
        var statCell = row.insertCell(1);
        var timeCell = row.insertCell(2);

        callCell.innerHTML = (len - i == 0) ? "<b>Most recent</b>" : (len - i);
        if (len - i == 0) {
          if (results.rows.item(i - 1).log == "c") {
            statCell.innerHTML = '<span class="label label-success">Closed</span>';
          } else {
            statCell.innerHTML = '<span class="label label-danger">Opened</span>';
          }
        } else {
          if (results.rows.item(i - 1).log == "c") {
            statCell.innerHTML = '<span class="label label-default">Closed</span>';
          } else {
            statCell.innerHTML = '<span class="label label-default">Opened</span>';
          }
        }
        var d = new Date(results.rows.item(i - 1).time);
        var dateSplit = d.toString().split(" ");
        var timeSplit = dateSplit[4].toString().split(":");
        var ampm = (Math.trunc(timeSplit[0] / 12) == 0) ? "am" : "pm";
        timeCell.innerHTML = dateSplit[0] + ", " + dateSplit[1] + " " + dateSplit[2] + " at " + timeSplit[0] % 12 + ":" + timeSplit[1] + " " + ampm;
      }
    }, null);
  });

  $('#reset').click(function(e) {
    db.transaction(function (tx) {
      t = (new Date()).getTime();
      var query = 'DROP TABLE HISTORY';
      tx.executeSql(query);
    });
    var table = document.getElementById("table");
    while(table.rows.length > 1) {
      table.deleteRow(1);
    }
  });

});

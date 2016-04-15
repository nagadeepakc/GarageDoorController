$(document).ready(function() {

  var status = false; // open is true, close is false

  var db = openDatabase('DATABASE_HISTORY', '1.0', 'DATABASE_HISTORY', 2 * 1024 * 1024);
  var t = (new Date()).getTime();
  // create the database if not already created
  db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE IF NOT EXISTS HISTORY (time, log)');
  });

  // set up site with current variables
  db.transaction(function (tx) {
    tx.executeSql('SELECT * FROM HISTORY', [], function (tx, results) {
      var len = results.rows.length;
      var last = (len == 0) ? "c" : results.rows.item(len - 1).log;
      if (last == "c") {
        status = false;
        document.getElementById("status").innerHTML = "The garage is closed.";
        // document.getElementById("toggle").innerHTML = "Open";
      } else {
        status = true;
        document.getElementById("status").innerHTML = "The garage is <b>open</b>.";
        // document.getElementById("toggle").innerHTML = "Close";
      }
    }, null);
  });

  $('#open_toggle').click(function(e) {
    e.preventDefault();
    // $.get("trigger.php?trigger=1");
    $.get( "trigger.php", { trigger: 1, open_door: 1, close_door: 0} );
    status = !status;
    // var doorStatus = <?php echo json_encode(exec(`gpio -g read 17`)); ?>;
    // if (doorStatus=="1"){
    //   document.getElementById("monitor").innerHTML = "doorStatus is true";
    // }
    // if (doorStatus=="0"){
    //   document.getElementById("monitor").innerHTML = "doorStatus is false";
    // }
    if (status) {
      document.getElementById("status").innerHTML = "The garage is <b>open</b>.";
      
      // document.getElementById("toggle").innerHTML = "Close";
      db.transaction(function (tx) {
        t = (new Date()).getTime();
        var query = 'INSERT INTO HISTORY (time, log) VALUES (?, ?)';
        tx.executeSql(query, [t, "o"]);
      });
    } else {
      document.getElementById("status").innerHTML = "The garage is closed.";
      // document.getElementById("toggle").innerHTML = "Open";
      db.transaction(function (tx) {
        t = (new Date()).getTime();
        var query = 'INSERT INTO HISTORY (time, log) VALUES (?, ?)';
        tx.executeSql(query, [t, "c"]);
      });
    }
  });

  $('#close_toggle').click(function(e) {
    e.preventDefault();
    // $.get("trigger.php?trigger=1");
    $.get( "trigger.php", { trigger: 1, open_door: 0, close_door: 1 } );
    status = !status;
    // var doorStatus = <?php echo json_encode(exec(`gpio -g read 17`)); ?>;
    // if (doorStatus=="1"){
    //   document.getElementById("monitor").innerHTML = "doorStatus is true";
    // }
    // if (doorStatus=="0"){
    //   document.getElementById("monitor").innerHTML = "doorStatus is false";
    // }

    if (status) {
      document.getElementById("status").innerHTML = "The garage is <b>open</b>.";
      db.transaction(function (tx) {
        t = (new Date()).getTime();
        var query = 'INSERT INTO HISTORY (time, log) VALUES (?, ?)';
        tx.executeSql(query, [t, "o"]);
      });
    } else {
      document.getElementById("status").innerHTML = "The garage is closed.";
      db.transaction(function (tx) {
        t = (new Date()).getTime();
        var query = 'INSERT INTO HISTORY (time, log) VALUES (?, ?)';
        tx.executeSql(query, [t, "c"]);
      });
    }
  });
  // console.log("document before")
  // var doorStatus;
  // $.get("trigger.php", function(data) {
  // console.log("document middle")
  //   doorStatus=data;
  // });
  // console.log(doorStatus)
  // console.log("document after")
});

$(document).ready(function() {
  console.log("document before1")
  var doorStatus;
  $.get("trigger.php", function(data) {
  	console.log("document middle1")
    doorStatus=data;
  });
  console.log($doorStatus)
  console.log("document after1")
});

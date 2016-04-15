<?php

	if(isset($_GET['trigger']) && ($_GET['trigger'] == 1) && isset($_GET['open_door']) && ($_GET['open_door'] == 1) && isset($_GET['close_door']) && ($_GET['close_door'] == 0)) {
		$doorIsClosed = exec(`gpio -g read 17`);
		if($doorIsClosed==1) {
			error_reporting(E_ALL);
			exec('gpio write 7 0');
			usleep(1000000);
			exec('gpio write 7 1');
	        // header("Location: /GarageDoorController/index.html");
		}
		header("Location: /GarageDoorController/index.html");
	}

	if(isset($_GET['trigger']) && ($_GET['trigger'] == 1) && isset($_GET['open_door']) && ($_GET['open_door'] == 0) && isset($_GET['close_door']) && ($_GET['close_door'] == 1)) {
		$doorIsClosed = exec(`gpio -g read 17`);
		if($doorIsClosed==0) {
			error_reporting(E_ALL);
			exec('gpio write 7 0');
			usleep(1000000);
			exec('gpio write 7 1');
	        // header("Location: /GarageDoorController/index.html");
		}
		header("Location: /GarageDoorController/index.html");
	}

	function doorStatus() {
		$doorIsClosed = exec(`gpio -g read 17`);
    	console.log("$doorIsClosed");
    	echo $doorIsClosed;
	}

	$doorIsClosed = exec(`gpio -g read 17`);

	echo json_encode("deepak");
	echo htmlspecialchars("deepak2");

?>


(function() {

	function requestFullScreen() {
		var element = document.body; 
	    var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullscreen;

	    if (requestMethod) { 
	        requestMethod.call(element);
	    } 
	}


	$(document).on('keydown', function(e) {
        var key = e.keyCode || e.which;
        switch (key) {
            case 67: // c
                $body.toggleClass('has-cursor');
            break;

            case 70: // f
				requestFullScreen();
            break;
        }
    });


}());
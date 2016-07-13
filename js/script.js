/**
 *
 */

(function($){
	var map = null;
	$(document).ready(function(){
		// map
		console.log('abc');
		map = new GMaps({
			div: "#map",
			lat: -12.043333,
			lng: -77.028333,
   			scrollwheel: false,
		});
	});

})(jQuery);
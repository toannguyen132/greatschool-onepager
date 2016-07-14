/**
 *
 */

(function($){
	var map = null;
	$(document).ready(function(){
		// map
		map = new GMaps({
			div: "#map",
			lat: -12.043333,
			lng: -77.028333,
   			scrollwheel: false,
		});

		// tootip
		$('.tlp').tooltipster({
			maxWidth: 300,
			debug: false
		});

		// sidebar
		function sidebar_context(){
			$context = $('#context_hint');
			offset = $context.offset().top;
			anchor = offset + $context.outerHeight();
			// console.log(offset);
			$(window).scroll(function(){
				var top = $('body').scrollTop();
				if ( top > anchor ){
					console.log('over');
				}
			});	
		}
		sidebar_context();
	});

})(jQuery);
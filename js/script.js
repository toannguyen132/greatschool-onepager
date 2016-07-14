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

		var isMobile = $(window).width() <= 768;

		// sidebar
		function sidebar_context(){
			$context = $('#context_hint');
			offset = $context.offset().top;
			anchor = offset + $context.outerHeight();

			$context.css('width', $context.width() ); // 30 is padding
			// console.log(offset);
			$(window).scroll(function(){
				if ( isMobile ) return;

				var top = $('body').scrollTop();
				var pos_left = $context.parent().offset().left + 15; // 15 is padding
				var pos_top = 30;
				if ( top > anchor ){
					$context.removeClass('hided');
					$context.css({
						"position": 'fixed',
						"top": pos_top,
						"left": pos_left
					});
				} else{
					$context.addClass('hided');
					$context.css({
						"position": 'relative',
						"top": 'auto',
						"left": 'auto'
					});
				}
			});	
		}
		sidebar_context();
	});

})(jQuery);
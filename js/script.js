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

		$('.tooltip-chart').tooltipster({
			content: $('#tootip_1').detach(),
			contentCloning: true
		});

		var isMobile = $(window).width() <= 768;

		// sidebar
		var sidebar_context = function(){
			var $context = $('#context_hint');
			var offset = $context.offset().top;
			var anchor = offset + $context.outerHeight();

			$context.css('width', $context.width() ); // 30 is padding
			// console.log(offset);
			var updateSidebar = function(){
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
				} else {
					$context.addClass('hided');
					$context.css({
						"position": 'relative',
						"top": 'auto',
						"left": 'auto'
					});
				}
			}

			updateSidebar();
			$(window).scroll(function(){
				updateSidebar();
			});	
		}

		sidebar_context();
	});

})(jQuery);
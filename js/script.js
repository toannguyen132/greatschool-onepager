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
			debug: false,
		});
		var adjustTootip = function(){
			if (Modernizr.touchevents)	{
				$('.tlp').tooltipster('option', 'trigger', 'click');	
				console.log('tét');
			} else {
				$('.tlp').tooltipster('option', 'trigger', 'mouseenter');
			}
		};
		$(window).resize(function(){setTimeout(adjustTootip, 10)});
		setTimeout(adjustTootip, 10);
		$('.tlp').click(function(e){
			e.preventDefault();
		})
		$('.tooltip-chart').tooltipster({
			content: $('#tootip_1').detach(),
			contentCloning: true
		});
		// end tooltip

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

		// mobile
		$('.hamburger-menu').on('click', function(e){
			e.preventDefault();
			$('body').removeClass('search-opened');
			$('body').toggleClass('menu-opened');
		});
		$('.mobile-search a').on('click', function(e){
			e.preventDefault();
			$('body').removeClass('menu-opened');
			$('body').toggleClass('search-opened');
		});
		$('.mobile-menu-content > ul > .menu-item > a').on('click', function(e){
			e.preventDefault();
			$(e.currentTarget).parent().toggleClass('active');
		});
	});

})(jQuery);
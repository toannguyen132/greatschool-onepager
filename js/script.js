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

		// modal trigger
		$('.mobile-modal-trigger').click(function(e){
			e.preventDefault();
			var target = $($(e.currentTarget).attr('data-modal'));
			target.mobileModal();
		});
		$('.mobile-modal .close').click(function(e){
			e.preventDefault();
			var parent = $(e.currentTarget).closest('.mobile-modal');
			parent.mobileModal('close');
		});
		$('.mobile-modal .filter-trigger').click(function(e){
			e.preventDefault();
			var parent = $(e.currentTarget).closest('.modal-filter');
			parent.toggleClass('opened');
		})

		var isMobile = $(window).width() <= 768;

		// sidebar
		var sidebar_context = function(){
			var $context = $('#context_hint');
			var offset = $context.offset().top;
			var padding = 15;
			var anchor = offset - 15;
			var $body = $('body');
			var $contextParent = $context.closest('.row')

			$context.css('width', $context.width() ); // 30 is padding
			$('.floating-widget').css('width', $context.width() );
			// console.log(offset);
			var updateSidebar = function(){
				if ( isMobile ) return;
				console.log('abc');

				var top = $('body').scrollTop();
				var pos_left = $context.parent().offset().left; // 15 is padding
				var pos_top = 0;
				var ctxHeight = $context.height();
				var limit = $('')
				var bottom = top + $context.height(); 
				var limitAnchor = $('.end-of-context');
				var limitPadding = (limitAnchor.outerHeight() - limitAnchor.height()) / 2;
				var contextLimit = limitAnchor.offset().top + limitAnchor.outerHeight() - limitPadding;

				// console.log('********************');
				// console.log(contextLimit);

				if ( top > anchor && bottom < contextLimit ){
					$context.removeClass('hided');
					$context.css({
						"position": 'fixed',
						"top": pos_top,
						"left": pos_left
					});
					if ( !$body.hasClass('floated-widget') ){
						$body.addClass('floated-widget');
					}
				}else if ( bottom > contextLimit ){
					$context.css({
						"position": 'absolute',
						"top": contextLimit - $contextParent.offset().top - $context.height(),
						"left": 'auto'
					});
				} else {
					$context.addClass('hided');
					$context.css({
						"position": 'relative',
						"top": 'auto',
						"left": 'auto'
					});
					if ( $body.hasClass('floated-widget') ){
						$body.removeClass('floated-widget');
					}
				}

				var placeholder = ctxHeight + 40;

				// sidebar widget
				$('.floating-widget').each(function(){
					var element = $(this);
					var parent = element.closest('.row');
					var limit = parent.offset().top + parent.height();
					var anchor = $context.css('position') == 'fixed' ? parent.offset().top - placeholder : parent.offset().top;
					var eleHeight = element.height();
					var pos_top = parent.height() - eleHeight;  //parent.offset().top + ctxHeight + 70;
					var bottom = top + eleHeight + placeholder;

					// console.log('************************')
					// console.log('top:' + top);
					// console.log('anchor:' + anchor);
					// console.log('bottom:' + bottom);
					// console.log('limit:' + limit);
					// console.log('pos_top:' + pos_top);

					if ( top > anchor && bottom < limit){
						element.css({
							"position": 'fixed',
							"top": ctxHeight + 40,
							"left": pos_left
						});
						if ( !$body.hasClass('floated-widget') ){
							$body.addClass('floated-widget');
						}
					} else if (bottom > limit) {
						element.css({
							"position": 'absolute',
							"top": pos_top,
							"left": 'auto'
						});
					} else {
						element.css({
							"position": 'relative',
							"top": 'auto',
							"left": 'auto'
						});
					}
				});
			}

			updateSidebar();
			$(window).scroll(function(){
				updateSidebar();
			});	
		}

		sidebar_context();

		// show more
		$('.btn-more').on('click', function(){
			var $target = $(this).closest('.sum-section-list');
			$target.toggleClass('expand');
		});
		$('.btn-review-more').on('click', function(){
			var $target = $(this).prev();
			$(this).toggleClass('expand')
			$target.toggleClass('expand');
		})

		// review button
		$('.review-item .btn-like').each(function(){
			var element = $(this);
			var count = 0;
			if ( element.hasClass('has-count') ){
				count = parseInt(element.find('.count').text());
			}
			element.on('click', function(e){
				e.preventDefault();
				count += element.hasClass('liked') ? -1 : 1;

				element.toggleClass('liked');

				if ( count <= 0 ){
					element.find('.count').remove();
					element.removeClass('has-count');
				} else if ( element.find('.count').length > 0 ){
					element.find('.count').text(count);
				} else {
					element.append('<span class="count">'+count+'</span>');
					element.addClass('has-count');
				}
			});
		});

		// scroll 
		$('.scroll-trigger').click(function(e){
			e.preventDefault();
			var $this = $(this);
			var $target = $($this.attr('href'));

			$('html, body').animate({
			    scrollTop: $target.offset().top
			}, 600);
		});

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

	$.fn.mobileModal = function( action, option ){
		var action = action || 'open';
		var $this = $(this);
		if ( $this.hasClass('opened') ){
			action = 'close';
		}

		var open = function(){
			$this.addClass('opened');
		}
		var close = function(){
			$this.removeClass('opened');
		}

		if ( action == 'open' ){
			open();
		} else if ( action == 'close' ){
			close();
		}
	}

})(jQuery);
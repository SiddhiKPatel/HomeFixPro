(function ($) {
	'use strict';

	$(".editProfileBox .list-group a").on("click", function (event) {
		var $anchor = $(this);
		$("html, body")
		  .stop()
		  .animate(
			{
			  scrollTop: $($anchor.attr("href")).offset().top - 160,
			},
			10
		  );
		event.preventDefault();
	  });

	  $(".editProfileBox .list-group a").on("click", function () {
		$(".editProfileBox .list-group a").removeClass("active");
		$(this).addClass("active");
	  });

	/*---------------------
	tesimonila
	--------------------- */
	$('.tesimonial').slick({
		infinite: true,
		autoplay: true,
		dots: true,
		arrows: false,
		speed: 1500,
		slidesToShow: 1,
		pauseOnHover: false
	});

	/*---------------------
	blog tesimonila
	--------------------- */
	$('.b_slid_testi').slick({
		infinite: true,
		autoplay: true,
		dots: true,
		arrows: false,
		speed: 1500,
		slidesToShow: 1,
		pauseOnHover: false
	});

	/*---------------------
    sticky Top
    --------------------- */
	$("#sticker").sticky({
		topSpacing: 0,
		zIndex: 9999
	});

	/*---------------------
    mobile nav
    --------------------- */
	$('#main_menu').slicknav();

	/*---------------------
	service slide
	--------------------- */
	$('.service-slider').slick({
		infinite: true,
		autoplay: true,
		dots: false,
		arrows: true,
		speed: 1000,
		slidesToShow: 3,
		pauseOnHover: false,
		responsive: [{
				breakpoint: 992,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				}
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	});
 


	/*---------------------
    ScrollTo Top
    --------------------- */
	$(function () {
		$("#toTop").scrollToTop(1000);
	});

	// responsive menu
	$('.bar').click(function () {
		$('.main_menu').slideToggle();
		return false;
	});

	// menu arrow
	$(".main_menu ul").parent("li").children('a').append(' <i class="icofont-simple-down"></i>');

	// responsive menu
	$(".main_menu ul li").click(function () {
		$(this).children("ul").slideToggle();
		return false;
	});
 


})(jQuery);
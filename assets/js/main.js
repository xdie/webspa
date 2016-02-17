
	//Responsive Nav
	$('li.dropdown').find('.fa-angle-down').each(function(){
		$(this).on('click', function(){
			if( $(window).width() < 768 ) {
				$(this).parent().next().slideToggle();
			}
			return false;
		});
	});

	//Fit Vids
	if( $('#video-container').length ) {
		$("#video-container").fitVids();
	}

	//Initiat WOW JS
	new WOW().init();

	// portfolio filter
	$(window).load(function(){

		$('.main-slider').addClass('animate-in');
		$('.preloader').remove();
		//End Preloader

		if( $('.masonery_area').length ) {
			$('.masonery_area').masonry();//Masonry
		}

		var $portfolio_selectors = $('.portfolio-filter >li>a');
		
		if($portfolio_selectors.length) {
			
			var $portfolio = $('.portfolio-items');
			$portfolio.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows'
			});
			
			$portfolio_selectors.on('click', function(){
				$portfolio_selectors.removeClass('active');
				$(this).addClass('active');
				var selector = $(this).attr('data-filter');
				$portfolio.isotope({ filter: selector });
				return false;
			});
		}

	});


	$('.timer').each(count);
	function count(options) {
		var $this = $(this);
		options = $.extend({}, options || {}, $this.data('countToOptions') || {});
		$this.countTo(options);
	}
		
	// Search
	$('.fa-search').on('click', function() {
		$('.field-toggle').fadeToggle(200);
	});

	// Contact form
	var form = $('#main-contact-form');
	form.submit(function(event){
		event.preventDefault();
		var form_status = $('<div class="form_status"></div>');
		$.ajax({
			url: $(this).attr('action'),
			beforeSend: function(){
				form.prepend( form_status.html('<p><i class="fa fa-spinner fa-spin"></i> Email is sending...</p>').fadeIn() );
			}
		}).done(function(data){
			form_status.html('<p class="text-success">Thank you for contact us. As early as possible  we will contact you</p>').delay(3000).fadeOut();
		});
	});

	// Progress Bar
	$.each($('div.progress-bar'),function(){
		$(this).css('width', $(this).attr('data-transition')+'%');
	});


	/**
	 * Main AngularJS Web Application
	 */
	var app = angular.module('webMain', [
		'ngRoute', 'ngAnimate'
	]);

	/**
	 * Configure the Routes
	 */
	app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		// Home
			.when("/", {templateUrl: "templates/home.html", controller: "PageCtrl"})
			// Pages
			.when("/services", {templateUrl: "templates/services.html", controller: "PageCtrl"})
			.when("/about", {templateUrl: "templates/about.html", controller: "PageCtrl"})
			.when("/contact", {templateUrl: "templates/contact.html", controller: "PageCtrl"})
			// Blog
			.when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
			.when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
			// else 404
			.otherwise("/404", {templateUrl: "templates/404.html", controller: "PageCtrl"});
	}]);
	app.controller('PageCtrl', function ($scope) {
		console.log("Controlador de paginas cargado..");

		$('.main-slider').addClass('animate-in');
		$('.preloader').remove();

		$scope.pageClass = 'page-home';
		// Activates the Carousel
	/*	$('.main-slider').carousel({
			interval: 5000
		});

		// Activates Tooltips for Social Links
		$('.tooltip-social').tooltip({
			selector: "a[data-toggle=tooltip]"
		})*/

	});


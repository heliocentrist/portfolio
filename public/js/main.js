$(document).ready(function() {

	$('.menu li').removeClass('active');

	var url = window.location.pathname;

	$.each($('.menu li'), function(i, val) {
		
		var href = $(val).find('a').attr('href');

		if (url === href) {
			$(val).addClass('active');
		}
	});
});

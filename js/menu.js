// Navbar Mobile

$('.navbar-toggle').on('click', function (event) {
    $(this).toggleClass('open');
    $('#navigation').slideToggle(400);
});

$('.navigation-menu>li').slice(-2).addClass('last-elements');

$('.menu-arrow,.submenu-arrow').on('click', function (e) {
    if ($(window).width() < 992) {
        e.preventDefault();
        $(this).parent('li').toggleClass('open').find('.submenu:first').toggleClass('open');
    }
});

// Smooth scroll 
$('.navbar-nav a').on('click', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
        scrollTop: $($anchor.attr('href')).offset().top - 0
    }, 1500, 'easeInOutExpo');
    event.preventDefault();
});
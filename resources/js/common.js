(function ($) {
    $('.navbar ul.nav li').on('click', function (ev) {
        $(this).siblings('.active').removeClass('active');
        $(this).addClass('active');
    });
})(jQuery);
$(document).ready(function () {
    sana.init();
});

//Theme Functions
var sana = {
    init: function () {
        this.initNavbarResponsive();
        this.initNavbarSearch();
        this.initHeroSlider();
        this.initServicesParallaxBg();
        this.initTestimonialSwiper();
        this.initOurPortfolio();
        this.initStickyFooter();
        this.initBackToTop();
        new WOW().init();
    },
    initNavbarResponsive: function () {
        function checkNavbar() {
            var width = $(window).width();
            if (width <= 1199) {
                $('#navbar').removeClass('navbar-desktop');
                $('#navbar').addClass('navbar-mobile');
            } else {
                $('#navbar').addClass('navbar-desktop');
                $('#navbar').removeClass('navbar-mobile');
            }
        }

        checkNavbar();

        $('.navbar-hamburger').click(function() {
            $(this).toggleClass('is-opened');
            $('.navbar-mobile').toggleClass('is-opened');
            $('body').toggleClass('scroll-locked');
        });

        $('.navbar-mobile-close').click(function() {
            $('.navbar-hamburger').removeClass('is-opened');
            $('.navbar-mobile').removeClass('is-opened');            
            $('body').removeClass('scroll-locked');
        });

        $('.toggle-menu').click(function() {
            $(this).parent('li').toggleClass('is-expanded');
        });

        $(window).resize(function () {
            checkNavbar();
        });
    },
    initNavbarSearch: function () {

        var eventtype = jQuery.browser.mobile ? 'touchstart' : 'click';

        // Open Search Field
        $('.navbar-search-open').click(function () {
            $(this).parent().addClass('search-expanded')
        });

        // Close Search Field
        $('.navbar-search-close').click(function () {
            $(this).parent('form').parent('li').removeClass('search-expanded')
        })

        $(document).on(eventtype, function (ev) {
            if ($(ev.target).closest(".navbar-search").length === 0) {
                $('.navbar-search').removeClass('search-expanded');
            }
        });
    },
    initHeroSlider: function () {
        var heroSlider = new Swiper("#hero-slider", {
            // Optional parameters
            direction: "horizontal",
            loop: true,
            speed: 1200,
            grabCursor: true,
            effect: 'fade',

            // If we need pagination
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
                renderBullet: function (index, className) {
                    return '<span class="' + className + '">' + (index < 9 && '0') + (index + 1) + "</span>";
                },
            }
        });
    },
    initServicesParallaxBg: function () {
        var speed = 0.33;
        var st = $(window).scrollTop();

        var parallaxImages = [];
        function prlxUpdateValues() {
            parallaxImages = [];
            $('.parallax-image').each(function () {
                var parallaxImage = {};
                parallaxImage.element = $(this);
                parallaxImage.offset = parallaxImage.element.offset().top;
                parallaxImages.push(parallaxImage);
            });
            prlxDraw();
        }
        function prlxDraw() {
            $.each(parallaxImages, function (index, parallaxImage) {
                parallaxImage.element.css('background-position', 'center ' + ((st - parallaxImage.offset) * speed) + 'px');
            });
        }

        $(window).on('resize', function () {
            prlxUpdateValues();
        });

        prlxUpdateValues();
        $(window).on('scroll', function () {
            st = $(window).scrollTop();
            prlxDraw();
        });
    },
    initTestimonialSwiper: function () {
        var testimonialSwiper = new Swiper("#testimonials-swiper", {
            // Optional parameters
            direction: "horizontal",
            loop: true,
            speed: 1200,
            grabCursor: true,
            effect: 'slide',
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    },
    initOurPortfolio: function () {
        var lightbox = new PhotoSwipeLightbox({
            gallery: '.our-portfolio',
            children: '.portfolio-item a',
            // dynamic import is not supported in UMD version
            pswpModule: PhotoSwipe
        });
        lightbox.init();
    },
    initStickyFooter: function () {
        function getFooterHeight() {
            let footerHeight = $('footer').height();
            $('main.main-wrapper').css({ 'margin-bottom': footerHeight + 'px' });
        }

        getFooterHeight();

        $(window).on('resize', function () {
            getFooterHeight();
        });
    },
    initBackToTop: function () {
        // browser window scroll (in pixels) after which the "back to top" link is shown
        var offset = 300,
            //duration of the top scrolling animation (in ms)
            scroll_top_duration = 1200,
            //grab the "back to top" link
            $back_to_top = $('#back-to-top');

        //hide or show the "back to top" link
        $(window).scroll(function () {
            ($(this).scrollTop() > offset) ? $back_to_top.addClass('is-visible') : $back_to_top.removeClass('is-visible');
        });
        //smooth scroll to top
        $back_to_top.on('click', function (event) {
            event.preventDefault();

            $('body, html').animate({
                scrollTop: 0,
            }, scroll_top_duration);

            return false;
        });
    },
}
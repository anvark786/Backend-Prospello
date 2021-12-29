

(function ($) {

    "use strict";
    var wind = $(window);

    LoadingPage();
    data_overlay();
    background();
    parallax(wind);
    dsnHeroSection(wind);
    slider_project();
    slick_client(wind);
    slick_next_proj();
    services_tab();
    filter();
    dsn_slider();
    toggleButtonMap();
    mouseCirMove();
    ajaxLoad(false);
    effectBackForward();
    navBar(wind);
    initMap();
    dsnGrid.embedVideo('.play-button');
    gallery();
    contactValidator();
})(jQuery);


/**
 *
 *  - Create an high quality justified gallery
 *    of image
 *
 */
function gallery() {
    var galleryPortfolio = $('#gallery-portfolio');

    if (galleryPortfolio.length < 1)
        return;

    galleryPortfolio.justifiedGallery({
        rowHeight: 300,
        margins: 15
    });

    galleryPortfolio.magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: false,
        closeBtnInside: false,
        gallery: {
            enabled: true
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function (element) {
                return element.find('img');
            }
        }

    });
}

/***
 *
 *
 *  - Animate when scrolling
 *
 */
function aosInit() {
    var page_content = $('.page-content >  *:not("footer , .next-up")');
    page_content.attr('data-aos', 'fade-up');
    AOS.init({
        duration: 1000
    });
}

/**
 *
 * Function button Up page
 *
 */
function dsnGridProgressCircle() {
    var wind = $(window),
        e = $('[data-dsn-grid="progress-circle"]'),
        color = dsnGrid.removeAttr(e, 'data-dsn-grid-stroke');


    var stroke = color === undefined ? '' : 'stroke="' + color + '"';

    e.css({position: 'fixed', right: '-60px', bottom: '60px', width: '52px', height: '52px', 'z-index': '99999999'});
    e.append('<svg class="dsn-progress-circle-up" width="100%" height="100%" ' + stroke + ' viewBox="0 0 100 100" preserveAspectRatio="xMinYMin meet" fill="none">\n' +
        '        <path class="dsn-progress-path" d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" style="transition:  stroke-dashoffset 100ms linear 0s;stroke-dasharray: 307.919, 307.919; stroke-dashoffset: 309;"></path>' +
        '    </svg>');


    wind.on("scroll", function () {
        effectProgress();
    });
    effectProgress();

    /**
     * show and hidden right circle
     */
    function effectProgress() {
        var bodyScroll = wind.scrollTop(),
            height = $(document).height() - wind.height();

        if (bodyScroll > 70) {
            TweenMax.to(e, 1, {ease: Back.easeOut.config(4), right: 40});
            e.find('.dsn-progress-path').css('stroke-dashoffset', 300 - Math.round(bodyScroll * 300 / height) + '%');

        } else {
            TweenMax.to(e, 1, {ease: Back.easeIn.config(4), right: -60});
        }
    }

    e.on('click', function () {
        $('body,html').animate({scrollTop: 0}, 1600);
    })

}


/**
 *  Function Click Navigation Bar
 */
function navBar(wind) {

    var
        body = $('body'),
        menu = $('.menu-icon');


    $('.site-header .custom-drop-down > a').on('click', function () {
        return false;
    });

    wind.on('load', function () {
        var ul = $('.site-header nav > ul')[0].outerHTML;
        ul = $(ul);
        ul.attr('class', 'nav__list');
        ul.find('li.custom-drop-down').attr('class', 'nav__list-dropdown');
        ul.find('li').addClass('nav__list-item');
        var hedaerMobile = $('.header-top .nav .nav__content');
        if (hedaerMobile !== undefined) {
            hedaerMobile.prepend(ul);
        }

        menu.on('click', function () {
            body.toggleClass('nav-active');
        });

        $('.nav__list-item:not(.nav__list-dropdown) ').on("click", function () {
            body.removeClass('nav-active');
        });

        $(".nav__list-dropdown > a").on('click',
            function (e) {
                e.preventDefault();
                var _that = $(this).parent();
                var dispaly = _that.find('ul').css('display');
                $(".nav__list-dropdown").find("ul").slideUp("slow");
                if (dispaly !== 'block') {
                    _that.find("ul").slideDown("slow");
                }

            }
        );


    });
    wind.on("scroll", function () {

        var bodyScroll = wind.scrollTop(),
            headerSmall = $(".site-header , .header-top")

        ;
        var $ofContent = $('.page-content').offset();
        var $top = 70;
        if ($ofContent !== undefined) {
            $top = $ofContent.top;
        }
        if (bodyScroll > $top) {

            headerSmall.addClass("header-stickytop");
            $('.sections').addClass("body-pt");

        } else {

            headerSmall.removeClass("header-stickytop");
            $('body').css('paddingTop', 0);
        }
    });


}

/**
 *  -   event will be triggered by doing browser action such as
 *  a click on the back or forward button
 */
function effectBackForward() {
    $(window).on('popstate', function (e) {
        $("main.root").load(document.location + ' main.root > *', function () {
            refreshScript();
        });
    });
}


/**
 *  - the function that move the cursor of an input element to the end
 *
 * @param $off
 *      $off is true stop event listener
 *
 */
function mouseCirMove($off) {
    var $elemnet = '.global-cursor .custom-cursor';

    if ($off !== undefined && $off === true) {
        cursorEffect();
        return;
    }

    if ($('body').hasClass('dsn-large-mobile'))
        return;

    dsnGrid.mouseMove($elemnet, {
        onComplete: function (event, element) {
            if (!element.hasClass('effect-cursor')) {
                element.addClass('effect-cursor');
            }

        },
        onUpdate: function (event, x, y, element) {
            if (element.hasClass('effect-cursor')) {
                element.removeClass('effect-cursor');
            }
        }
    });

    cursorEffect();

    function cursorEffect() {
        dsnGrid.elementHover($elemnet, 'a , .to-prev , .to-next , .fas.fa-angle-right , .fas.fa-angle-left , .hero__down , .link-click , .filter-btn , .icon__fixed , .t-link , .button-next , .toggle , input', 'custom-cursor-link');
        dsnGrid.elementHover($elemnet, '.dsn-video , .projs-item-img-container , .close-filters', 'hidden');
    }


}


/***
 *  effect hide or show Box Info Wrapper
 */
function toggleButtonMap() {
    var toggle = document.getElementById('toggle');
    if (toggle === null || toggle === undefined) {
        return;
    }
    var toggleContainer = document.getElementById('toggle-container');
    var toggleNumber;

    toggle.addEventListener('click', function () {
        toggleNumber = !toggleNumber;
        if (toggleNumber) {
            toggleContainer.style.clipPath = 'inset(0 0 0 50%)';
            toggleContainer.style.backgroundColor = '#D74046';
            $('.location__address-container').css({
                opacity: 0,
                transform: 'translate3d(0,' + 30 + 'px , 0)'
            });
            $('.box-info-wrap').addClass('show-map');

        } else {
            toggleContainer.style.clipPath = 'inset(0 50% 0 0)';
            toggleContainer.style.backgroundColor = 'dodgerblue';
            $('.location__address-container').css({
                opacity: 1,
                transform: 'translate3d(0,0,0)'
            });
            $('.box-info-wrap').removeClass('show-map');
        }

    });
}


/***
 *  Ajax Loader
 * @param $refresh
 */
function ajaxLoad($refresh) {
    var main_root = $('main.root');
    var body = $('body');
    var wind = $(window);
    var projects__headline = $('.projects__headline-enter a');
    var link_menu = $('.site-header a , .next-proj-slider a , .next-up a , .portfolio .gallery > .projs-item a');
    var elemnt_ajax = '';
    var circlehold = $('.circlehold svg path');
    var tl = new TimelineLite();

    if ($refresh === true) {
        projects__headline.off('mousedown');
        projects__headline.off('mouseup');
        link_menu.off('click');
    }
    /***
     *
     * Ajax From Slider
     *
     */
    projects__headline.bind('mousedown touchstart', function (e) {
        e.preventDefault();
        if (e.type.toLowerCase() === 'mousedown') {
            if (e.which === 3) {
                return;
            }
        }

        var url = $('.sections-wrapper.dsn-parent-slide .dsn-active').data('url');
        if (!body.hasClass('ajax-slider')) {
            window.location = url;
            return;
        }

        if ($(window).width() < 992) {
            if (url !== undefined) {
                animate_ajax_start(url);
            }
            return;
        }

        tl = new TimelineLite();

        tl.fromTo(circlehold, 3, {
            'stroke-dashoffset': '309%'
        }, {
            'stroke-dashoffset': '0',
            onComplete: function () {
                if (url !== undefined) {
                    animate_ajax_start(url);
                }
            }
        });


    }).bind('mouseup touchend', function (e) {
        e.preventDefault();
        tl.pause();
        circlehold.css({'stroke-dashoffset': '309%'});

    });


    /**
     *
     * Ajax from Menu
     *
     */

    link_menu.on('click', function (e) {
        if (!body.hasClass('ajax-menu'))
            return;
        e.preventDefault();

        var _that = $(this);
        var url = _that.attr('href');


        var par = _that.parent();
        if (par.hasClass('item')) {
            if (!par.hasClass('slick-active')) {
                return;
            }
        }

        if (url.indexOf('#') >= 0) {
            return;
        }

        if (url !== undefined) {
            animate_ajax_start(url);
        }
    });


    function animate_ajax_start(url) {
        elemnt_ajax = $('<div></div>').addClass('class-ajax-loader');
        body.append(elemnt_ajax);
        TweenMax.fromTo(main_root, 1, {
            y: 0
        }, {
            y: -150,
            ease: Expo.easeIn
        });
        TweenMax.to(elemnt_ajax, 1, {
            y: 0,
            ease: Expo.easeIn,
            onComplete: function () {
                main_root.removeClass('dsn-animate');
                Loader(url);
            }
        });
    }

    function animate_ajax_end(elemnts) {
        var mouse = $('.global-cursor .custom-cursor');
        main_root.css({
            opacity: 1,
            transform: ''
        });
        var slider = $('body').find('.ui-nav-light');
        if (slider !== undefined && slider.length > 0) {
            slider.find('.dsn-nav-light').css({
                visibility: 'hidden'
            });
            mouse.removeClass('single-cursor');
        } else {
            mouse.addClass('single-cursor');
        }

        TweenMax.to(elemnt_ajax, 1, {
            y: '-100%',
            ease: Expo.easeIn,
            onComplete: function () {
                main_root.addClass('dsn-animate');
                refreshScript();
                TweenMax.fromTo($('.hero-img'), .5, {
                    y: 70
                }, {
                    y: 0
                });
                elemnt_ajax.remove();
            }
        });

        TweenMax.fromTo(slider, 3, {
            autoAlpha: 0
        }, {
            autoAlpha: 1
        });
    }

    function Loader(url) {
        main_root.load(url + ' main.root > *', function (responseText, textStatus, jqXHR) {
            if (textStatus === 'error') {
                window.location = url;
                return;
            }

            history.pushState(null, null, url);
            dsnGrid.scrollTop('body', '0');
            setTimeout(function () {
                animate_ajax_end($(responseText));
            }, 500);

        });
    }
}


/**
 *
 *  the main slider project
 *
 */
function dsn_slider() {
    var root_slid = $('.sections-wrapper.dsn-parent-slide'),
        section_slider_next = $('.sections-wrapper.dsn-next'),
        section_slider = root_slid.find('.section-slider'),
        wind_width = $(window).width();


    var footer_slid = root_slid.find('.section-footer');
    var button_next_slid = footer_slid.find('.boxnav-item.to-next');
    var button_prev_slid = footer_slid.find('.boxnav-item.to-prev');
    var tl = new TimelineLite();


    /**
     * init slider
     */
    var objectSlider = {};
    var objectSlider_re = {};

    if (section_slider.length > 0) {
        var index_number = 1;
        section_slider.each(function () {
            var that = $(this),
                content_subtitle = $(this).find('.subtitle'),
                content_name_title = $(this).find('.name-title h1');

            that.attr('data-number', dsnGrid.numberText(index_number));
            index_number++;
            var e_copy = $(this).find('.name-title').clone();

            e_copy.removeAttr('data-overlay').attr('data-id', $(this).data('id'));
            e_copy.find('span').css({'background-image': 'url("' + that.find('.cover-bg').data('image-src') + '")'});


            if (that.hasClass('dsn-active')) {
                e_copy.addClass('dsn-bg-text');
            }
            var light = root_slid.find('.dsn-nav-light');
            light.append(e_copy);

            objectSlider[e_copy.data('id')] = {
                width: e_copy.width(),
                left: e_copy.offset().left,
                top: e_copy.offset().top
            };
            objectSlider_re[e_copy.offset().left] = e_copy.data('id');
            dsnGrid.convertTextLine(content_subtitle, content_subtitle);
            dsnGrid.convertTextLine(content_name_title.find('span'), content_name_title);


        });
        var light = root_slid.find('.dsn-nav-light');
        light.css('width', light.width() + (wind_width * 4));

        section_slider.clone().removeClass('dsn-active').append('<div class="dsn-box-shadow"></div>').appendTo(section_slider_next);
        section_slider.removeClass('section-slider-next');


    } else {
        return;
    }

    navLight(root_slid, objectSlider, objectSlider_re);
    root_slid.removeClass('ui-nav-light');
    root_slid.find('.dsn-nav-light').css({
        opacity: '',
        visibility: ''
    });


    /**
     *
     * ========================
     *      mousewheel
     * ========================
     */


    dsnGrid.mouseWheel(root_slid, function (e) {
        if (!tl.isActive()) {
            tl = new TimelineLite();
            nextSlid(root_slid, tl);
        }
    }, function (e) {
        if (!tl.isActive()) {
            tl = new TimelineLite();
            prevSlid(root_slid, tl);
        }
    });


    var cureent = 0;
    root_slid.bind('mousedown touchstart', function (e) {
        if (e.type.toLowerCase() === "mousedown") {
            cureent = e.pageX;
        } else {
            cureent = e.originalEvent.touches[0].pageX;
        }

    }).bind('mouseup touchend', function (e) {

        if ($(window).width() > 991) {
            return;
        }

        var MoveX = cureent;
        if (e.type.toLowerCase() === 'mouseup') {
            MoveX = e.pageX;
        } else {
            MoveX = e.originalEvent.changedTouches[0].pageX;
        }

        if ((cureent + 30) < MoveX) {
            if (!tl.isActive()) {
                tl = new TimelineLite();
                nextSlid(root_slid, tl);
            }
        } else if ((cureent - 30) > MoveX) {
            if (!tl.isActive()) {
                tl = new TimelineLite();
                prevSlid(root_slid, tl);
            }
        }

    });


    /**
     *
     * ========================
     *      Click Mouse
     * ========================
     *
     * Next Icon , Prev Icon
     */
    button_next_slid.on('click', function () {
        if (!tl.isActive()) {
            tl = new TimelineLite();
            nextSlid(root_slid, tl);
        }
    });
    button_prev_slid.on('click', function () {
        if (!tl.isActive()) {
            tl = new TimelineLite();
            prevSlid(root_slid, tl);
        }
    });

}

/**
 *
 *
 *  move slider right or left
 *
 * @param root_slid
 *  - section of the main slider
 * @param next_slid
 *  - put the next slider
 * @param tl
 *  -  Time line Lite
 * @param target_prev
 *      the next or prev slider
 */
function setMoveSlider(root_slid, next_slid, tl, target_prev) {

    var section_slider_next = $('.sections-wrapper.dsn-next'),
        nextcurr_slid = section_slider_next.find('.section-slider-next'),
        nextSection = showNextSection(section_slider_next, section_slider_next.find('.section-slider[data-id="' + next_slid.data('id') + '"]')),
        curr_slid = root_slid.find('.dsn-active'),
        left_to = '0%',
        left_from = '110%',
        width_next_from = '100%',
        width_next_to = '25%',
        translatslideX = -300;

    PlayVideo(next_slid, true);


    if (target_prev) {
        translatslideX = translatslideX * -1;
        left_from = '-110%';
    }

    /**
     * animate the subtitle
     */
    tl.staggerFromTo(curr_slid.find('.inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper '), .05, {
        autoAlpha: 1,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        y: 0
    }, {
        autoAlpha: 0,
        scaleX: 1.8,
        y: -25,
    }, .05);

    /**
     * animate title
     */
    tl.staggerFromTo(curr_slid.find('.inner .name-title .dsn-word-wrapper .dsn-chars-wrapper '), .1, {
        autoAlpha: 1,
        scaleX: 1,
        skewY: 0,
        rotation: 0,
        x: 0
    }, {
        autoAlpha: 0,
        scaleX: 1.8,
        x: -25
    }, .05, '-=1');

    var t = next_slid.find('.inner .name-title .dsn-word-wrapper');

    /**
     * set active slid width 100vw ,
     * translate x
     *
     */
    tl
        /**
         * move next slide to out screen
         */
        .fromTo(nextcurr_slid, .7, {right: 0}, {right: '-30%', ease: Power2.easeIn}, '-=.5')
        .fromTo(next_slid, 1, {left: left_from}, {
            left: left_to,
            onStart: function () {
                root_slid.find('.section-slider').removeClass('section-slider-next').css({
                    zIndex: 1
                }).find('.cover-bg').css({
                    zIndex: ''
                });
                next_slid.css({
                    zIndex: 2
                }).find('.cover-bg').css({
                    zIndex: 0
                });
                PlayVideo(nextcurr_slid, true);

            },
            onComplete: function () {
                root_slid.find('.section-slider').removeClass('dsn-active');
                next_slid.addClass('dsn-active');
                var number = next_slid.data('number');
                $('.section-footer .number span').text(number);

            }

        })
        .fromTo(curr_slid, 1, {x: 0}, {x: translatslideX, ease: Power0.easeIn}, '-=1')
        .staggerFromTo(next_slid.find('.inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper'), .05, {
            autoAlpha: 0,
            scaleX: 1.8,
            y: -25
        }, {
            autoAlpha: 1,
            scaleX: 1,
            y: 0,
        }, .05)
        .staggerFromTo(t.find('.dsn-chars-wrapper'), .1, {
            autoAlpha: 0,
            scaleX: 1.7,
            skewY: 10,
            rotation: 2,
            x: -50,
        }, {
            autoAlpha: 1,
            scaleX: 1,
            skewY: 0,
            rotation: 0,
            x: 0,
        }, 0.09, '-=1')

        .fromTo(t, 1, {x: 100}, {x: 0}, '-=1')

        .fromTo(nextSection, .7, {right: '-30%', width: width_next_from}, {
            right: 0, width: width_next_to,
            onStart: function () {
                section_slider_next.find('.section-slider').removeClass('section-slider-next');
                nextSection.addClass('section-slider-next');

            }
        }, '-=.7')
        .call(function () {
            root_slid.find('.section-slider').css({left: '', transform: ''});
            PlayVideo(next_slid, false);
            PlayVideo(nextcurr_slid, false);


        });


}


function PlayVideo($elemnt, $next) {
    var vid = $elemnt.find('.dsn-video');
    var cover = $elemnt.find('div.cover-bg');
    if (vid.length > 0) {
        if ($next === true) {
            vid[0].pause();
            // cover.removeClass('hidden');
        } else {
            vid[0].play();
            // cover.addClass('hidden');
        }

    }
}


/**
 * Next Main Slider
 * @param root_slid
 * @param tl
 */
function nextSlid(root_slid, tl) {
    var next_slid = getSliderNext(root_slid);
    setMoveSlider(root_slid, next_slid, tl, true);
}

/**
 *
 * Prev Main slider
 * @param root_slid
 * @param tl
 */
function prevSlid(root_slid, tl) {
    var prev_slid = getSliderPrev(root_slid);
    setMoveSlider(root_slid, prev_slid, tl);
}

/***
 * Navigation List for Slider
 * @param root_slid
 * @param objectSlider
 * @param objectSlider_re
 */
function navLight(root_slid, objectSlider, objectSlider_re) {


    var holdDown = 0;
    var body = $('body');
    var dsn_nav_light = root_slid.find('.dsn-nav-light');
    var t2 = new TimelineMax();
    var move = false;
    var offset_list = null;
    var change = false;
    var global_cursor = $('.global-cursor .custom-cursor');

    root_slid.find('.popover-list-slid').on('mousedown', function (e) {

        if (e.which === 3) {
            root_slid.removeClass('ui-nav-light');
            return;
        }
        change = false;
        TweenMax.to(root_slid.find('.section-slider'), 2, {
            autoAlpha: 0
        });

        var active = root_slid.find('.dsn-active');
        dsn_nav_light.find('.name-title').removeClass('dsn-bg-text');
        var e_a_l = dsn_nav_light.find('.name-title[data-id="' + active.data('id') + '"]');
        offset_list = objectSlider[active.data('id')];
        dsn_nav_light.css({
            transform: 'translateX(' + offset_list.left * -1 + 'px)'
        });
        e_a_l.addClass('dsn-bg-text');
        root_slid.addClass('ui-nav-light');


        /**
         *
         *
         */
        // $('.popover-list-slid').css({backgroundColor: '#fff'});


        if (global_cursor.length > 0)
            $('.global-cursor .custom-cursor').addClass('ui-light');

        root_slid.find('.dsn-nav-light').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',
            function (event) {
                holdDown = e.pageX;
                move = true;
            });
    }).on('mouseup', function (e) {
        /**
         *
         *
         */
        // $('.popover-list-slid').css({backgroundColor: ''});


        TweenMax.to(root_slid.find('.section-slider'), 2, {
            autoAlpha: 1
        });
        root_slid.removeClass('ui-nav-light');
        var holdUp = e.pageX;
        holdDown = 0;


        move = false;
        if (global_cursor.length > 0)
            $('.global-cursor .custom-cursor').removeClass('ui-light');

        if (change) {
            setAnimateTextSlider();
        }

    }).on('mousemove', function (e) {
        if (move && offset_list !== null && offset_list !== undefined) {
            var tleft = (holdDown - e.pageX) + (offset_list.left * -1);
            var last_item = objectSlider[Object.keys(objectSlider)[Object.keys(objectSlider).length - 1]];

            if (tleft <= 0 && (last_item.left * -1) <= tleft) {

                for (var property in objectSlider) {
                    var cu_s = objectSlider[property];
                    if (((cu_s.left * -1) + 200) >= tleft) {
                        dsn_nav_light.find('.name-title').removeClass('dsn-bg-text');
                        dsn_nav_light.find('.name-title[data-id="' + property + '"]').addClass('dsn-bg-text');
                        setPositionSlider(root_slid, property);
                        change = true;
                    }
                }
                dsn_nav_light.css({
                    transform: 'translateX(' + (tleft) + 'px)'
                });
            }


        }

    });


}

/**
 * choose slider from nav light
 * @param root_slid
 * @param data_id
 */
function setPositionSlider(root_slid, data_id) {
    var section_slider_next = $('.sections-wrapper.dsn-next'),
        nextcurr_slid = section_slider_next.find('.section-slider-next'),
        nextSection = showNextSection(section_slider_next, section_slider_next.find('.section-slider[data-id="' + data_id + '"]')),
        next_slid = root_slid.find('.section-slider[data-id="' + data_id + '"]'),
        curr_slid = root_slid.find('.dsn-active'),
        width_next_to = 'calc(25vw + 5%)';


    curr_slid.find('.inner .name-title .dsn-word-wrapper .dsn-chars-wrapper').css({
        visibility: 'hidden',
        opacity: 0,
        transform: ''
    });
    nextcurr_slid.css({
        right: '30%'
    });
    root_slid.find('.section-slider').removeClass('section-slider-next').css({
        zIndex: 1
    }).find('.cover-bg').css({
        zIndex: ''
    });
    next_slid.css({
        zIndex: 2
    }).find('.cover-bg').css({
        zIndex: 0
    });
    // next_slid.css({
    //     width: '100vw'
    // });
    var t = next_slid.find('.inner .name-title .dsn-word-wrapper');
    t.find('.dsn-chars-wrapper').css({
        visibility: 'inherit',
        opacity: 1
    });
    curr_slid.css({
        left: '',
        transform: ''
    });
    curr_slid.removeClass('dsn-active');
    next_slid.addClass('dsn-active');
    nextSection.css({
        right: 0,
        width: width_next_to
    });
    section_slider_next.find('.section-slider').removeClass('section-slider-next');
    nextSection.addClass('section-slider-next');


}

/**
 * set animate for subtitle , title in slider
 */
function setAnimateTextSlider() {
    var root_slid = $('.sections-wrapper.dsn-parent-slide'),
        section_slider = root_slid.find('.section-slider');
    var tl = new TimelineLite();
    section_slider.each(function () {
        PlayVideo($(this), true);
    });
    if (section_slider.length > 0) {
        var curr_slid = root_slid.find('.dsn-active');
        PlayVideo(curr_slid, false);
        tl.staggerFromTo(curr_slid.find('.inner .subtitle .dsn-word-wrapper .dsn-chars-wrapper '), .05, {
            autoAlpha: 0,
            scaleX: 1.8,
            y: -25
        }, {
            autoAlpha: 1,
            scaleX: 1,
            y: 0,
            ease: Expo.easeIn
        }, .05)
            .staggerFromTo(curr_slid.find('.inner .name-title .dsn-word-wrapper .dsn-chars-wrapper'), .1, {
                autoAlpha: 0,
                scaleX: 1.7,
                skewY: 10,
                rotation: 2,
                x: -50,
                ease: Expo.easeIn
            }, {
                autoAlpha: 1,
                scaleX: 1,
                skewY: 0,
                rotation: 0,
                x: 0,
                ease: Expo.easeIn
            }, 0.09, '-=1');


        var number = curr_slid.data('number');
        $('.section-footer .number span').text(number);
    }
}

/**
 *
 *  Get Next Slider
 * @param root_slid
 * @returns {*}
 */
function getSliderNext(root_slid) {
    if (root_slid === undefined || root_slid === null) {
        return false;
    }

    var curr_slid = root_slid.find('.dsn-active');

    if (curr_slid !== undefined) {
        var $next = curr_slid.next();
        if ($next.length === 1 && $next.hasClass('section-slider') && $next[0].nodeName === 'SECTION') {
            return $next;
        } else {
            var slid = root_slid.find('section.section-slider');
            if (slid.length > 0) {
                return slid.first();
            }
        }

        return false;

    }


}

function showNextSection(root_slid, next_slid) {
    if (root_slid === undefined || root_slid === null) {
        return false;
    }

    if (next_slid !== undefined) {
        var $next = next_slid.next();
        if ($next.length === 1 && $next.hasClass('section-slider') && $next[0].nodeName === 'SECTION') {
            return $next;
        } else {
            var slid = root_slid.find('section.section-slider');
            if (slid.length > 0) {
                return slid.first();
            }
        }

        return false;

    }


}

/**
 * Get Prev Slider
 * @param root_slid
 * @returns {*}
 */
function getSliderPrev(root_slid) {
    if (root_slid === undefined || root_slid === null) {
        return false;
    }

    var curr_slid = root_slid.find('.dsn-active');

    if (curr_slid !== undefined) {
        var $next = curr_slid.prev();
        if ($next.length === 1 && $next.hasClass('section-slider') && $next[0].nodeName === 'SECTION') {
            return $next;
        } else {
            var slid = root_slid.find('section.section-slider');
            if (slid.length > 0) {
                return slid.last();
            }
        }

        return false;

    }


}


/***
 *
 * Loading Page
 *
 */
function LoadingPage() {
    var loading_page = $('.loading-page');
    var dsn_progress = loading_page.find('.dsn-progress');
    var progress_number = dsn_progress.find('.progress-number');
    var progress_left = dsn_progress.find('.progress-fill-left');
    var progress_right = dsn_progress.find('.progress-fill-right');
    var loading_logo = dsn_progress.find('.loading_logo');


    var timer = dsnGrid.pageLoad(0, 100, 200, function (val) {
        progress_number.text(val + '%');
        progress_left.css('width', (val / 2) + '%');
        progress_right.css('width', (val / 2) + '%');
    });


    $(window).on('load', function () {


        clearInterval(timer);
        TweenMax.to(progress_left, .5, {
            width: '50%',
            onUpdate: function ($p) {
                var f = progress_left.width() / progress_left.parent().width() * 100;
                progress_number.text((parseInt(f) * 2) + '%');
            },
            onComplete: function () {
                finshedLoad();
            }
        });
        TweenMax.to(progress_right, .5, {
            width: '50%'
        });


    });

    function finshedLoad() {
        FilteringISO();
        TweenMax.to([loading_logo], .5, {
            autoAlpha: 0
        });
        TweenMax.to(loading_page, 1, {
            
            onComplete: function () {
                scrollEvent();
                setAnimateTextSlider();
                $('main.root').addClass('dsn-animate');
                dsnGridProgressCircle();
                loading_page.css({
                    display: 'none',
                    width: '0'
                })

            }
        }).delay(.5);


    }


}


/***
 *  - technique in computer graphics where background images  ,
 *  move past the camera more slowly than foreground images
 * @param wind
 */
function parallax(wind) {

    var object_element_move = {};
    var dsn_parallax_move = $('[data-dsn-grid="move-section"]');
    var page_content = $('.page-content');
    var filter_btn = page_content.find('.filter-btn');

    dsn_parallax_move.each(function ($index) {
        var _that = $(this);

        dsnGrid.setPositionMoveSection(_that, 7, 200);
        _that.attr('data-dsn-order', $index);
        object_element_move[$index] = _that.offset();
    });

    wind.on('scroll', function () {
        scrollerIt();
    });
    scrollerIt();

    function scrollerIt() {

        /**
         * Move Section
         */
        dsn_parallax_move.each(function () {
            var _that = $(this);
            if ($(window).width() <= 991) {
                _that.css('transform', '');
                return;
            }


            var endTarget = object_element_move[_that.data('dsn-order')].top + (_that.innerHeight() / 2);

            var duration = dsnGrid.getUndefinedVal(_that.data('duration'), 350);
            if (wind.scrollTop() <= (endTarget - duration)) {
                var move = dsnGrid.getUndefinedVal(_that.data('move'), 7);

                dsnGrid.scrollerIt(wind, _that, {
                    duration: -1 * wind.height(),
                    action: function ($object) {

                        TweenMax.to(_that, .3, {
                            y: ($object.scroll / move),
                            ease: Power0.easeOut
                        });
                    }

                });
            }

        });

        /**
         * parallax Image
         */
        $('[data-dsn-grid="move-up"] ').each(function () {
            var _that = $(this);
            var img = $(this).find('.cover-bg');

            if (img !== undefined) {
                var endTarget = _that.offset().top + (_that.innerHeight());

                if (wind.scrollTop() <= (endTarget)) {
                    dsnGrid.scrollerIt(wind, _that, {
                        duration: -1 * wind.height(),
                        action: function ($object) {
                            img.css({
                                transform: 'translate3d(0px,' + ($object.scroll / 5) + 'px,0px)'
                            });
                        }

                    });
                }

            }

        });

        /**
         * show and hide button filter
         */


        if (filter_btn !== undefined && filter_btn.length > 0) {
            var offsettop_filter = page_content.offset().top;
            var next_up = $('section.next-up');
            if (next_up === undefined || next_up.length < 1) {
                next_up = $('footer');
            }
            var offsettop_footer = next_up.offset().top;


            if (wind.scrollTop() >= (offsettop_filter - 300) && wind.scrollTop() <= (offsettop_footer - next_up.outerHeight())) {
                filter_btn.css({
                    transform: 'translate3d(0px , 0px , 0px)',
                    opacity: 1
                });
            } else {
                filter_btn.css({
                    transform: 'translate3d(0px , -50% , 0px)',
                    opacity: 0
                });
            }
        }


    }

    /**
     *
     *
     * @type {jQuery|HTMLElement}
     *
     * - Mouse Parallax
     */


    var parallax = $('[data-dsn-grid="parallax"]');
    if (parallax.length === 0 || wind.width() < 992) {
        return;
    }
    parallax.each(function () {
        var _that = $(this),
            dsn_grid = dsnGrid.removeAttr(_that, 'data-dsn-grid'),
            speed = dsnGrid.removeAttr(_that, 'data-dsn-grid-speed'),
            move = dsnGrid.removeAttr(_that, 'data-dsn-grid-move');
        dsnGrid.parallaxMoveElemnt(_that, move, speed);

    });


    $('.gallery .projs-item a').each(function () {
        var _that = $(this);
        dsnGrid.parallaxMoveElemnt(_that.find('.projs-item-img-container'), 20, .3, _that.find('.projs-item-title'), true);
        dsnGridRelationImage(_that.find('.projs-item-img-container'), 6, .5);
    });
    dsnGridRelationImage($('.hero-img'), 2, .5);


}

/**
 * Parallax Image
 * @param wind
 */
function dsnHeroSection(wind) {

    var header = $('header.dsn-header-hero');
    var hero_img = header.find('.hero-img');
    var header_content = header.find('.header-content');
    var content_background = $('.content-background');
    var page_content = $('.page-content');
    var content_block_first = $('.content-block.block-first');

    wind.on('scroll', function () {
        scrollerIt();
        scrollerIt();
    });
    scrollerIt();

    function scrollerIt() {
        var num_background = dsnGrid.scaleIt(wind, content_background, {
            position: false,
            plus: 5500
        });


        if ((num_background + 0.91667) > 1) {
            page_content.addClass('bg-white');
            if (wind > 991) {
                content_block_first.css('width', '100%')
            }
        } else {
            page_content.removeClass('bg-white');
            var windowScrolled = wind.scrollTop(),
                num_hero = dsnGrid.scaleIt(wind, hero_img, {
                    position: true
                }),
                num_content = dsnGrid.scaleIt(wind, header_content, {
                    position: true,
                    plus: 200
                }),
                num_content_scal = dsnGrid.scaleIt(wind, header_content, {
                    position: true,
                    plus: 1300
                });

            var num_content_block_first = dsnGrid.scaleIt(wind, content_block_first, {
                position: false,
                plus: 2000
            });

            TweenMax.to(hero_img, .3, {
                scale: (num_hero + 1), opacity: (1 - num_hero)
            });


            if ($(window).width() > 991) {
                content_background.css({
                    transform: 'translate3d(0px,0px,0px) scale(' + (num_background + 0.91667) + ')'
                });
                content_block_first.css({
                    width: (num_content_block_first + 0.8) * 100 + '%'
                });

            }

            var opacityContent = 1;
            if ($(window).width() > 991 && !$('body').hasClass('dsn-large-mobile')) {
                opacityContent = (1 - num_content);
            } else {
                header_content.css('transition', 'all 400ms ease-out 0s');
                hero_img.css('transition', 'all 400ms ease-out 0s');
            }


            TweenMax.to(header_content, .3, {
                scale: (num_content_scal + 1),
                opacity: opacityContent,
                y: (windowScrolled / -2)
            });
        }


        /**
         *
         *  Next Up
         *
         */
        if (wind.width() < 992) {
            return;
        }
        var next_up = $('section.next-up'),
            headerSmall = $(".site-header , .header-top");
        if (next_up !== undefined && next_up.length > 0) {
            var offsettop_footer = next_up.offset().top - next_up.height();
            setTimeout(function () {
                if (wind.scrollTop() >= offsettop_footer) {
                    if (!next_up.hasClass('dsn-animate')) {
                        next_up.addClass('dsn-animate');
                        headerSmall.css('background-color', 'transparent');
                        dsnGrid.scrollTop('.next-up', 1500, 0);
                    }
                } else {
                    headerSmall.css('background-color', '');
                    next_up.removeClass('dsn-animate');
                }
            }, 500)

        }

    }


    /**
     *  animate scrollTop
     */
    animateScroller();

    function animateScroller() {
        var links = $('a[href*="#"]');
        links.on('click', function (e) {
            e.preventDefault();
        });
        $('a.hero__down').on('click', function () {
            dsnGrid.scrollTop('.page-content', 1200, 0);
        });
    }

}

/**
 * Filter Button In The Work Page
 */
function filter() {
    var filters_content = $('.filters-content');
    var filtering = filters_content.find('.filtering');
    var close_filtering = filters_content.find('.close-filters');
    var button_filter = filtering.find('button');
    var tl = new TimelineLite(),
        headerSmall = $(".site-header , .header-top");

    $('.filter-btn').on('click', function () {
        tl.fromTo(filters_content, .5, {
            force3D: true,
            autoAlpha: 0,
            ease: Power0.easeIn
        }, {
            autoAlpha: 1
        });
        tl.staggerFromTo(button_filter, .3, {
            force3D: true,
            autoAlpha: 0,
            y: -20
        }, {
            autoAlpha: 1,
            y: 0
        }, .2);
        headerSmall.slideUp();

    });

    close_filtering.on('click', function () {
        if (tl.isActive()) {
            tl.progress(1);
        }
        tl = new TimelineLite();
        tl.to(filters_content, .5, {
            autoAlpha: 0
        });
        tl.staggerTo(button_filter, .3, {
            autoAlpha: 0,
            y: 20
        }, .2, '-=.3');
        headerSmall.slideDown();


    });

    button_filter.on('click', function () {
        dsnGrid.scrollTop('.page-content', 1000, -200);
        close_filtering.click();
    });


}


/**
 * Slick Slider
 */
function slider_project() {
    var proj_slider_slick = $('.proj-slider-image');


    proj_slider_slick.each(function () {
        var slick = $(this);
        var span = dsnGrid.getUndefinedVal(slick.data('next-text'), '');

        slick.slick({
            speed: 700,
            infinite: true,
            slidesToScroll: 1,
            slidesToShow: 1,
            prevArrow: '',
            cssEase: 'cubic-bezier(.9, .03, .41, .49)',
            speed: 700,
            nextArrow: '<button class="button-next next-right">\n' +
                '                <svg viewBox="0 0 52 52"  xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">\n' +
                '                    <path d="M3 26.7h39.5v3.5c0 .3.1.5.4.6.2.1.5.1.7-.1l5.9-4.2c.2-.1.3-.3.3-.5s-.1-.4-.3-.5l-5.9-4.2c-.1-.1-.3-.1-.4-.1-.1 0-.2 0-.3.1-.2.1-.4.3-.4.6v3.5H3c-.4 0-.7.3-.7.7 0 .3.3.6.7.6z"></path>\n' +
                '                </svg>\n' +
                '                <span>' + span + '</span>\n' +
                '            </button>',
        });

    });
}


/**
 *
 * Function Page Load
 *
 */
function FilteringISO() {
    var $gallery = $('.gallery');
    var $filtering = $('.filtering');

    if (($gallery === undefined || $gallery.length < 1) || ($filtering === undefined || $filtering.length < 1)) {
        return;
    }

    /* isotope
      -------------------------------------------------------*/
    // $gallery.isotope({});
    $gallery = $gallery.isotope({
        // options
        itemSelector: '.projs-item',
        transitionDuration: '0.5s',
    });

    /* filter items on button click
    -------------------------------------------------------*/
    $filtering.on('click', 'button', function () {
        var filterValue = $(this).attr('data-filter');
        $gallery.isotope({
            filter: filterValue
        });
        $(this).addClass('active').siblings().removeClass('active');
    });


}

/**
 * smooth Scroll
 * @param locked
 */
function scrollEvent(locked) {

    var body = $('body'),
        isScroller = body.data('dsn-scroller');

    var wind = $(window);


    if (isScroller === undefined || isScroller !== true) {
        body.addClass('dsn-mobile');
        return;
    }

    scroller(wind);

    if (!body.hasClass('dsn-mobile')) {
        wind.on('resize', function () {
            if (wind.width() > 991) {
                if (body.hasClass('dsn-mobile')) {
                    body.removeClass('dsn-mobile');
                }
            } else {
                body.addClass('dsn-mobile');
            }
        });
    }


    /**
     *  Function init Mouse Scroll Time
     */
    function scroller(wind) {


        if (navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i)
            || navigator.userAgent.match(/Edge/i)
            || navigator.userAgent.match(/MSIE 10/i)
            || navigator.userAgent.match(/MSIE 9/i)
            || wind.width() <= 991
        ) {
            body.addClass('dsn-mobile').addClass('dsn-large-mobile');
            return;
        }


        wind.on('keydown', function (e) {
            var keyCode = e.keyCode ? e.keyCode : e.which;
            if ($('body').hasClass('nav-active') || wind.width() <= 991) {
                return;
            }
            if (keyCode === 38) {
                setPositionScroll(1, .1, 10);
            } else if (keyCode === 40) {
                setPositionScroll(-1, .1, 10);
            } else if (keyCode === 34) {
                setPositionScroll(-1, .5, 300);
            } else if (keyCode === 33) {
                setPositionScroll(1, .5, 300);
            } else if (keyCode === 36) {
                setPositionScroll(1, 2, wind.scrollTop());
            } else if (keyCode === 35) {
                setPositionScroll(-1, 2, $(document).height());
            }

        });

        const tl = new TweenMax(wind, 0.7, {scrollTo: {y: wind.scrollTop()}});
        //Distance. Use smaller value for shorter scroll and greater value for longer scroll
        wind.on("mousewheel DOMMouseScroll", function (event) {


            if ($('body').hasClass('nav-active') || wind.width() <= 991) {
                return;
            }
            // event.preventDefault();
            var delta = event.originalEvent.wheelDelta / 120 || -event.originalEvent.detail / 3;
            setPositionScroll(delta, .85, 350);

        });

        function setPositionScroll(delta, scrollTime, scrollDistance) {
            var scrollTop = wind.scrollTop();
            var finalScroll = scrollTop - parseInt(delta * scrollDistance);

            tl.updateTo({
                scrollTo: {y: finalScroll},
                overwrite: 10
            }, true);

        }

    }

}

/**
 * Attr data overlay
 */
function data_overlay() {
    $('[data-overlay-color]').each(function () {
        var _that = $(this);
        var _color = dsnGridRemoveAttr(_that, 'data-overlay-color');
        _that.addClass('dsn-overlay');
        $('body').append('<style>.dsn-overlay[data-overlay]:before{background: ' + _color + ';}</style>');

    });
}


/**
 *
 * Function set background image from data background
 *
 */
function background() {

    var cover = $(".cover-bg, section , [data-image-src]");
    cover.each(function () {
        var attr = $(this).attr('data-image-src');

        if (typeof attr !== typeof undefined && attr !== false) {
            $(this).css('background-image', 'url(' + attr + ')');
        }

    });
}


/**
 *
 * slick Slider Client
 *
 */
function slick_client(wind) {
    var client_curs = $('.client-curs');
    if (client_curs.length > 0) {
        client_curs.slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: true,
            infinite: true,
            nextArrow: '<i class="fas fa-angle-right"></i>',
            prevArrow: '<i class="fas fa-angle-left"></i>',
            cssEase: 'cubic-bezier(.9, .03, .41, .49)',
            speed: 700,
        });

        if (wind.width() > 991) {
            dsnGrid.parallaxMoveElemnt(client_curs.find('.fas.fa-angle-right'), 25);
            dsnGrid.parallaxMoveElemnt(client_curs.find('.fas.fa-angle-left'), 25);
        }


    }


}

/**
 * slick Slider next project
 */
function slick_next_proj() {
    var next_project_slid = $('.next-proj-slider');

    next_project_slid.slick({
        arrows: false,
    });

    // Manually refresh positioning of slick
    $('.next-proj button.button-next').on('click', function () {
        next_project_slid.slick('slickNext');
    });


}


/**
 *
 * servicestab
 *
 */
function services_tab() {
    $(".services").on("click", ".link-click", function () {

        var myID = $(this).attr("id");

        $(this).addClass("active").siblings().removeClass("active");


        $("#" + myID + "-content").fadeIn().siblings().hide();

    });
}


function initMap() {

    var map_id = document.getElementById('map');
    if (map_id === null) return;
    // Styles a map in night mode.
    try {
        var map = new google.maps.Map(map_id, {
            center: {
                lat: 34.0937458,
                lng: -118.3614978
            },
            zoom: 12,
            styles: [{
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "saturation": 36
                },
                    {
                        "color": "#000000"
                    },
                    {
                        "lightness": 40
                    }
                ]
            },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [{
                        "visibility": "on"
                    },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [{
                        "visibility": "off"
                    }]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [{
                        "color": "#000000"
                    },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]

        });
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(34.0937458, -118.3614978),
            animation: google.maps.Animation.BOUNCE,
            icon: 'assets/img/map-marker.png',
            title: 'ASL',
            map: map

        });
    } catch (e) {

    }

}

function contactValidator() {
    var contact_form = $('#contact-form');
    if (contact_form < 1) {
        return;
    }
    contact_form.validator();
    // when the form is submitted
    contact_form.on('submit', function (e) {
        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data) {
                    // data = JSON object that contact.php returns

                    // we recieve the type of the message: success x danger and apply it to the
                    var messageAlert = 'alert-' + data.type;
                    var messageText = data.message;

                    // let's compose Bootstrap alert box HTML
                    var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';

                    // If we have messageAlert and messageText
                    if (messageAlert && messageText) {
                        // inject the alert to .messages div in our form
                        contact_form.find('.messages').html(alertBox);
                        // empty the form
                        contact_form[0].reset();
                    }
                }
            });
            return false;
        }
    });
}

/**
 * Function Load Via Ajax
 */
function refreshScript() {

    var wind = $(window);

    dsn_slider();
    setAnimateTextSlider();
    background();
    data_overlay();
    parallax(wind);
    dsnHeroSection(wind);
    FilteringISO();
    slider_project();
    slick_client(wind);
    slick_next_proj();
    services_tab();
    filter();
    toggleButtonMap();
    initMap();
    dsnGrid.embedVideo('.play-button');
    gallery();
    ajaxLoad(true);
    mouseCirMove(true);
    contactValidator();


}
function show_loader(){
    $('.popup-bg').show();
    $('.popup-box').remove();
    $('body').append('<div class="popup-box"><div class="preloader pl-xxl"><svg viewBox="25 25 50 50" class="pl-circular"><circle r="20" cy="50" cx="50" class="plc-path"/></svg></div></div><span class="popup-bg"></span>');
}

function remove_popup(){
    $('.popup-box,.popup-bg').remove();
}

$(document).on('submit', 'form.ajax', function(e){  
        e.preventDefault();
        var $this = $(this);
        
        $this.validate({
            rules : {
                required_field : "required",
                password1: "required",
                password2: {
                    equalTo: "#id_password1"
                }
            }
        });
        var valid = $this.valid();
        if (valid){
            var url = $this.attr('action');
            var method = $this.attr('method');
            var isReload = $this.hasClass('reload');
            var isRedirect = $this.hasClass('redirect');
            var data = $this.serialize();
            
            show_loader();  
            
            jQuery.ajax({
                type : method,
                url : url,
                dataType : 'json',
                data : data,
                success : function(data) {
                    remove_popup(); 

                    var message = data['message'];
                    var status = data['status'];
                    var title = data['title'];  
                    var redirect = data['redirect'];
                    var redirect_url = data['redirect_url'];
                    var stable = data['stable'];
                    var pk = data['pk'];

                    if (status == 'true') {
                        if (title){
                            title = title;
                        }else{
                            title = "Success";
                        }

                        function  doAfter() {                   
                            if (isRedirect && redirect == 'true') {
                                window.location.href = redirect_url;
                            }
                            if (isReload) {
                                window.location.reload();
                            }  
                        }

                        swal({
                          title: title,
                          text: message,
                          type: "success"
                        }, function () {
                            doAfter();
                        });
                        
                                                
                    }else{          
                        if (title){
                            title = title;
                        }else{
                            title = "An Error Occurred";
                        }   
                        
                        swal(title, message, "error");
                                
                        if (stable != "true"){                  
                            window.setTimeout(function() {
                            }, 2000);   
                        }   
                    }   
                },
                error : function(data) {
                    remove_popup(); 
                            
                    var title = "An error occurred";
                    var message = "An error occurred. Please try again later."; 
                    swal(title, message, "error");
                }
            });     
        } 
});


/* form validation*/
(function(e){e.extend(e.fn,{validate:function(t){if(!this.length){if(t&&t.debug&&window.console){console.warn("Nothing selected, can't validate, returning nothing.")}return}var n=e.data(this[0],"validator");if(n){return n}this.attr("novalidate","novalidate");n=new e.validator(t,this[0]);e.data(this[0],"validator",n);if(n.settings.onsubmit){this.validateDelegate(":submit","click",function(t){if(n.settings.submitHandler){n.submitButton=t.target}if(e(t.target).hasClass("cancel")){n.cancelSubmit=true}if(e(t.target).attr("formnovalidate")!==undefined){n.cancelSubmit=true}});this.submit(function(t){function r(){var r;if(n.settings.submitHandler){if(n.submitButton){r=e("<input type='hidden'/>").attr("name",n.submitButton.name).val(e(n.submitButton).val()).appendTo(n.currentForm)}n.settings.submitHandler.call(n,n.currentForm,t);if(n.submitButton){r.remove()}return false}return true}if(n.settings.debug){t.preventDefault()}if(n.cancelSubmit){n.cancelSubmit=false;return r()}if(n.form()){if(n.pendingRequest){n.formSubmitted=true;return false}return r()}else{n.focusInvalid();return false}})}return n},valid:function(){if(e(this[0]).is("form")){return this.validate().form()}else{var t=true;var n=e(this[0].form).validate();this.each(function(){t=t&&n.element(this)});return t}},removeAttrs:function(t){var n={},r=this;e.each(t.split(/\s/),function(e,t){n[t]=r.attr(t);r.removeAttr(t)});return n},rules:function(t,n){var r=this[0];if(t){var i=e.data(r.form,"validator").settings;var s=i.rules;var o=e.validator.staticRules(r);switch(t){case"add":e.extend(o,e.validator.normalizeRule(n));delete o.messages;s[r.name]=o;if(n.messages){i.messages[r.name]=e.extend(i.messages[r.name],n.messages)}break;case"remove":if(!n){delete s[r.name];return o}var u={};e.each(n.split(/\s/),function(e,t){u[t]=o[t];delete o[t]});return u}}var a=e.validator.normalizeRules(e.extend({},e.validator.classRules(r),e.validator.attributeRules(r),e.validator.dataRules(r),e.validator.staticRules(r)),r);if(a.required){var f=a.required;delete a.required;a=e.extend({required:f},a)}return a}});e.extend(e.expr[":"],{blank:function(t){return!e.trim(""+e(t).val())},filled:function(t){return!!e.trim(""+e(t).val())},unchecked:function(t){return!e(t).prop("checked")}});e.validator=function(t,n){this.settings=e.extend(true,{},e.validator.defaults,t);this.currentForm=n;this.init()};e.validator.format=function(t,n){if(arguments.length===1){return function(){var n=e.makeArray(arguments);n.unshift(t);return e.validator.format.apply(this,n)}}if(arguments.length>2&&n.constructor!==Array){n=e.makeArray(arguments).slice(1)}if(n.constructor!==Array){n=[n]}e.each(n,function(e,n){t=t.replace(new RegExp("\\{"+e+"\\}","g"),function(){return n})});return t};e.extend(e.validator,{defaults:{messages:{},groups:{},rules:{},errorClass:"error",validClass:"valid",errorElement:"label",focusInvalid:true,errorContainer:e([]),errorLabelContainer:e([]),onsubmit:true,ignore:":hidden",ignoreTitle:false,onfocusin:function(e,t){this.lastActive=e;if(this.settings.focusCleanup&&!this.blockFocusCleanup){if(this.settings.unhighlight){this.settings.unhighlight.call(this,e,this.settings.errorClass,this.settings.validClass)}this.addWrapper(this.errorsFor(e)).hide()}},onfocusout:function(e,t){if(!this.checkable(e)&&(e.name in this.submitted||!this.optional(e))){this.element(e)}},onkeyup:function(e,t){if(t.which===9&&this.elementValue(e)===""){return}else if(e.name in this.submitted||e===this.lastElement){this.element(e)}},onclick:function(e,t){if(e.name in this.submitted){this.element(e)}else if(e.parentNode.name in this.submitted){this.element(e.parentNode)}},highlight:function(t,n,r){if(t.type==="radio"){this.findByName(t.name).addClass(n).removeClass(r)}else{e(t).addClass(n).removeClass(r)}},unhighlight:function(t,n,r){if(t.type==="radio"){this.findByName(t.name).removeClass(n).addClass(r)}else{e(t).removeClass(n).addClass(r)}}},setDefaults:function(t){e.extend(e.validator.defaults,t)},messages:{required:"This field is required.",remote:"Please fix this field.",email:"Please enter a valid email address.",url:"Please enter a valid URL.",date:"Please enter a valid date.",dateISO:"Please enter a valid date (ISO).",number:"Please enter a valid number.",digits:"Please enter only digits.",creditcard:"Please enter a valid credit card number.",equalTo:"Please enter the same value again.",maxlength:e.validator.format("Please enter no more than {0} characters."),minlength:e.validator.format("Please enter at least {0} characters."),rangelength:e.validator.format("Please enter a value between {0} and {1} characters long."),range:e.validator.format("Please enter a value between {0} and {1}."),max:e.validator.format("Please enter a value less than or equal to {0}."),min:e.validator.format("Please enter a value greater than or equal to {0}.")},autoCreateRanges:false,prototype:{init:function(){function r(t){var n=e.data(this[0].form,"validator"),r="on"+t.type.replace(/^validate/,"");if(n.settings[r]){n.settings[r].call(n,this[0],t)}}this.labelContainer=e(this.settings.errorLabelContainer);this.errorContext=this.labelContainer.length&&this.labelContainer||e(this.currentForm);this.containers=e(this.settings.errorContainer).add(this.settings.errorLabelContainer);this.submitted={};this.valueCache={};this.pendingRequest=0;this.pending={};this.invalid={};this.reset();var t=this.groups={};e.each(this.settings.groups,function(n,r){if(typeof r==="string"){r=r.split(/\s/)}e.each(r,function(e,r){t[r]=n})});var n=this.settings.rules;e.each(n,function(t,r){n[t]=e.validator.normalizeRule(r)});e(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, "+"[type='number'], [type='search'] ,[type='tel'], [type='url'], "+"[type='email'], [type='datetime'], [type='date'], [type='month'], "+"[type='week'], [type='time'], [type='datetime-local'], "+"[type='range'], [type='color'] ","focusin focusout keyup",r).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",r);if(this.settings.invalidHandler){e(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler)}},form:function(){this.checkForm();e.extend(this.submitted,this.errorMap);this.invalid=e.extend({},this.errorMap);if(!this.valid()){e(this.currentForm).triggerHandler("invalid-form",[this])}this.showErrors();return this.valid()},checkForm:function(){this.prepareForm();for(var e=0,t=this.currentElements=this.elements();t[e];e++){if(this.findByName(t[e].name).length!=undefined&&this.findByName(t[e].name).length>1){for(var n=0;n<this.findByName(t[e].name).length;n++){this.check(this.findByName(t[e].name)[n])}}else{this.check(t[e])}}return this.valid()},element:function(t){t=this.validationTargetFor(this.clean(t));this.lastElement=t;this.prepareElement(t);this.currentElements=e(t);var n=this.check(t)!==false;if(n){delete this.invalid[t.name]}else{this.invalid[t.name]=true}if(!this.numberOfInvalids()){this.toHide=this.toHide.add(this.containers)}this.showErrors();return n},showErrors:function(t){if(t){e.extend(this.errorMap,t);this.errorList=[];for(var n in t){this.errorList.push({message:t[n],element:this.findByName(n)[0]})}this.successList=e.grep(this.successList,function(e){return!(e.name in t)})}if(this.settings.showErrors){this.settings.showErrors.call(this,this.errorMap,this.errorList)}else{this.defaultShowErrors()}},resetForm:function(){if(e.fn.resetForm){e(this.currentForm).resetForm()}this.submitted={};this.lastElement=null;this.prepareForm();this.hideErrors();this.elements().removeClass(this.settings.errorClass).removeData("previousValue")},numberOfInvalids:function(){return this.objectLength(this.invalid)},objectLength:function(e){var t=0;for(var n in e){t++}return t},hideErrors:function(){this.addWrapper(this.toHide).hide()},valid:function(){return this.size()===0},size:function(){return this.errorList.length},focusInvalid:function(){if(this.settings.focusInvalid){try{e(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin")}catch(t){}}},findLastActive:function(){var t=this.lastActive;return t&&e.grep(this.errorList,function(e){return e.element.name===t.name}).length===1&&t},elements:function(){var t=this,n={};return e(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){if(!this.name&&t.settings.debug&&window.console){console.error("%o has no name assigned",this)}if(this.name in n||!t.objectLength(e(this).rules())){return false}n[this.name]=true;return true})},clean:function(t){return e(t)[0]},errors:function(){var t=this.settings.errorClass.replace(" ",".");return e(this.settings.errorElement+"."+t,this.errorContext)},reset:function(){this.successList=[];this.errorList=[];this.errorMap={};this.toShow=e([]);this.toHide=e([]);this.currentElements=e([])},prepareForm:function(){this.reset();this.toHide=this.errors().add(this.containers)},prepareElement:function(e){this.reset();this.toHide=this.errorsFor(e)},elementValue:function(t){var n=e(t).attr("type"),r=e(t).val();if(n==="radio"||n==="checkbox"){return e("input[name='"+e(t).attr("name")+"']:checked").val()}if(typeof r==="string"){return r.replace(/\r/g,"")}return r},check:function(t){t=this.validationTargetFor(this.clean(t));var n=e(t).rules();var r=false;var i=this.elementValue(t);var s;for(var o in n){var u={method:o,parameters:n[o]};try{s=e.validator.methods[o].call(this,i,t,u.parameters);if(s==="dependency-mismatch"){r=true;continue}r=false;if(s==="pending"){this.toHide=this.toHide.not(this.errorsFor(t));return}if(!s){this.formatAndAdd(t,u);return false}}catch(a){if(this.settings.debug&&window.console){console.log("Exception occurred when checking element "+t.id+", check the '"+u.method+"' method.",a)}throw a}}if(r){return}if(this.objectLength(n)){this.successList.push(t)}return true},customDataMessage:function(t,n){return e(t).data("msg-"+n.toLowerCase())||t.attributes&&e(t).attr("data-msg-"+n.toLowerCase())},customMessage:function(e,t){var n=this.settings.messages[e];return n&&(n.constructor===String?n:n[t])},findDefined:function(){for(var e=0;e<arguments.length;e++){if(arguments[e]!==undefined){return arguments[e]}}return undefined},defaultMessage:function(t,n){return this.findDefined(this.customMessage(t.name,n),this.customDataMessage(t,n),!this.settings.ignoreTitle&&t.title||undefined,e.validator.messages[n],"<strong>Warning: No message defined for "+t.name+"</strong>")},formatAndAdd:function(t,n){var r=this.defaultMessage(t,n.method),i=/\$?\{(\d+)\}/g;if(typeof r==="function"){r=r.call(this,n.parameters,t)}else if(i.test(r)){r=e.validator.format(r.replace(i,"{$1}"),n.parameters)}this.errorList.push({message:r,element:t});this.errorMap[t.name]=r;this.submitted[t.name]=r},addWrapper:function(e){if(this.settings.wrapper){e=e.add(e.parent(this.settings.wrapper))}return e},defaultShowErrors:function(){var e,t;for(e=0;this.errorList[e];e++){var n=this.errorList[e];if(this.settings.highlight){this.settings.highlight.call(this,n.element,this.settings.errorClass,this.settings.validClass)}this.showLabel(n.element,n.message)}if(this.errorList.length){this.toShow=this.toShow.add(this.containers)}if(this.settings.success){for(e=0;this.successList[e];e++){this.showLabel(this.successList[e])}}if(this.settings.unhighlight){for(e=0,t=this.validElements();t[e];e++){this.settings.unhighlight.call(this,t[e],this.settings.errorClass,this.settings.validClass)}}this.toHide=this.toHide.not(this.toShow);this.hideErrors();this.addWrapper(this.toShow).show()},validElements:function(){return this.currentElements.not(this.invalidElements())},invalidElements:function(){return e(this.errorList).map(function(){return this.element})},showLabel:function(t,n){var r=this.errorsFor(t);if(r.length){r.removeClass(this.settings.validClass).addClass(this.settings.errorClass);r.html(n)}else{r=e("<"+this.settings.errorElement+">").attr("for",this.idOrName(t)).addClass(this.settings.errorClass).html(n||"");if(this.settings.wrapper){r=r.hide().show().wrap("<"+this.settings.wrapper+"/>").parent()}if(!this.labelContainer.append(r).length){if(this.settings.errorPlacement){this.settings.errorPlacement(r,e(t))}else{r.insertAfter(t)}}}if(!n&&this.settings.success){r.text("");if(typeof this.settings.success==="string"){r.addClass(this.settings.success)}else{this.settings.success(r,t)}}this.toShow=this.toShow.add(r)},errorsFor:function(t){var n=this.idOrName(t);return this.errors().filter(function(){return e(this).attr("for")===n})},idOrName:function(e){return this.groups[e.name]||(this.checkable(e)?e.name:e.id||e.name)},validationTargetFor:function(e){if(this.checkable(e)){e=this.findByName(e.name).not(this.settings.ignore)[0]}return e},checkable:function(e){return/radio|checkbox/i.test(e.type)},findByName:function(t){return e(this.currentForm).find("[name='"+t+"']")},getLength:function(t,n){switch(n.nodeName.toLowerCase()){case"select":return e("option:selected",n).length;case"input":if(this.checkable(n)){return this.findByName(n.name).filter(":checked").length}}return t.length},depend:function(e,t){return this.dependTypes[typeof e]?this.dependTypes[typeof e](e,t):true},dependTypes:{"boolean":function(e,t){return e},string:function(t,n){return!!e(t,n.form).length},"function":function(e,t){return e(t)}},optional:function(t){var n=this.elementValue(t);return!e.validator.methods.required.call(this,n,t)&&"dependency-mismatch"},startRequest:function(e){if(!this.pending[e.name]){this.pendingRequest++;this.pending[e.name]=true}},stopRequest:function(t,n){this.pendingRequest--;if(this.pendingRequest<0){this.pendingRequest=0}delete this.pending[t.name];if(n&&this.pendingRequest===0&&this.formSubmitted&&this.form()){e(this.currentForm).submit();this.formSubmitted=false}else if(!n&&this.pendingRequest===0&&this.formSubmitted){e(this.currentForm).triggerHandler("invalid-form",[this]);this.formSubmitted=false}},previousValue:function(t){return e.data(t,"previousValue")||e.data(t,"previousValue",{old:null,valid:true,message:this.defaultMessage(t,"remote")})}},classRuleSettings:{required:{required:true},email:{email:true},url:{url:true},date:{date:true},dateISO:{dateISO:true},number:{number:true},digits:{digits:true},creditcard:{creditcard:true}},addClassRules:function(t,n){if(t.constructor===String){this.classRuleSettings[t]=n}else{e.extend(this.classRuleSettings,t)}},classRules:function(t){var n={};var r=e(t).attr("class");if(r){e.each(r.split(" "),function(){if(this in e.validator.classRuleSettings){e.extend(n,e.validator.classRuleSettings[this])}})}return n},attributeRules:function(t){var n={};var r=e(t);var i=r[0].getAttribute("type");for(var s in e.validator.methods){var o;if(s==="required"){o=r.get(0).getAttribute(s);if(o===""){o=true}o=!!o}else{o=r.attr(s)}if(/min|max/.test(s)&&(i===null||/number|range|text/.test(i))){o=Number(o)}if(o){n[s]=o}else if(i===s&&i!=="range"){n[s]=true}}if(n.maxlength&&/-1|2147483647|524288/.test(n.maxlength)){delete n.maxlength}return n},dataRules:function(t){var n,r,i={},s=e(t);for(n in e.validator.methods){r=s.data("rule-"+n.toLowerCase());if(r!==undefined){i[n]=r}}return i},staticRules:function(t){var n={};var r=e.data(t.form,"validator");if(r.settings.rules){n=e.validator.normalizeRule(r.settings.rules[t.name])||{}}return n},normalizeRules:function(t,n){e.each(t,function(r,i){if(i===false){delete t[r];return}if(i.param||i.depends){var s=true;switch(typeof i.depends){case"string":s=!!e(i.depends,n.form).length;break;case"function":s=i.depends.call(n,n);break}if(s){t[r]=i.param!==undefined?i.param:true}else{delete t[r]}}});e.each(t,function(r,i){t[r]=e.isFunction(i)?i(n):i});e.each(["minlength","maxlength"],function(){if(t[this]){t[this]=Number(t[this])}});e.each(["rangelength","range"],function(){var n;if(t[this]){if(e.isArray(t[this])){t[this]=[Number(t[this][0]),Number(t[this][1])]}else if(typeof t[this]==="string"){n=t[this].split(/[\s,]+/);t[this]=[Number(n[0]),Number(n[1])]}}});if(e.validator.autoCreateRanges){if(t.min&&t.max){t.range=[t.min,t.max];delete t.min;delete t.max}if(t.minlength&&t.maxlength){t.rangelength=[t.minlength,t.maxlength];delete t.minlength;delete t.maxlength}}return t},normalizeRule:function(t){if(typeof t==="string"){var n={};e.each(t.split(/\s/),function(){n[this]=true});t=n}return t},addMethod:function(t,n,r){e.validator.methods[t]=n;e.validator.messages[t]=r!==undefined?r:e.validator.messages[t];if(n.length<3){e.validator.addClassRules(t,e.validator.normalizeRule(t))}},methods:{required:function(t,n,r){if(!this.depend(r,n)){return"dependency-mismatch"}if(n.nodeName.toLowerCase()==="select"){var i=e(n).val();return i&&i.length>0}if(this.checkable(n)){return this.getLength(t,n)>0}return e.trim(t).length>0},email:function(e,t){return this.optional(t)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(e)},url:function(e,t){return this.optional(t)||/^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(e)},date:function(e,t){return this.optional(t)||!/Invalid|NaN/.test((new Date(e)).toString())},dateISO:function(e,t){return this.optional(t)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(e)},number:function(e,t){return this.optional(t)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(e)},digits:function(e,t){return this.optional(t)||/^\d+$/.test(e)},creditcard:function(e,t){if(this.optional(t)){return"dependency-mismatch"}if(/[^0-9 \-]+/.test(e)){return false}var n=0,r=0,i=false;e=e.replace(/\D/g,"");for(var s=e.length-1;s>=0;s--){var o=e.charAt(s);r=parseInt(o,10);if(i){if((r*=2)>9){r-=9}}n+=r;i=!i}return n%10===0},minlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||i>=r},maxlength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||i<=r},rangelength:function(t,n,r){var i=e.isArray(t)?t.length:this.getLength(e.trim(t),n);return this.optional(n)||i>=r[0]&&i<=r[1]},min:function(e,t,n){return this.optional(t)||e>=n},max:function(e,t,n){return this.optional(t)||e<=n},range:function(e,t,n){return this.optional(t)||e>=n[0]&&e<=n[1]},equalTo:function(t,n,r){var i=e(r);if(this.settings.onfocusout){i.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){e(n).valid()})}return t===i.val()},remote:function(t,n,r){if(this.optional(n)){return"dependency-mismatch"}var i=this.previousValue(n);if(!this.settings.messages[n.name]){this.settings.messages[n.name]={}}i.originalMessage=this.settings.messages[n.name].remote;this.settings.messages[n.name].remote=i.message;r=typeof r==="string"&&{url:r}||r;if(i.old===t){return i.valid}i.old=t;var s=this;this.startRequest(n);var o={};o[n.name]=t;e.ajax(e.extend(true,{url:r,mode:"abort",port:"validate"+n.name,dataType:"json",data:o,success:function(r){s.settings.messages[n.name].remote=i.originalMessage;var o=r===true||r==="true";if(o){var u=s.formSubmitted;s.prepareElement(n);s.formSubmitted=u;s.successList.push(n);delete s.invalid[n.name];s.showErrors()}else{var a={};var f=r||s.defaultMessage(n,"remote");a[n.name]=i.message=e.isFunction(f)?f(t):f;s.invalid[n.name]=true;s.showErrors(a)}i.valid=o;s.stopRequest(n,o)}},r));return"pending"}}});e.format=e.validator.format})(jQuery);(function(e){var t={};if(e.ajaxPrefilter){e.ajaxPrefilter(function(e,n,r){var i=e.port;if(e.mode==="abort"){if(t[i]){t[i].abort()}t[i]=r}})}else{var n=e.ajax;e.ajax=function(r){var i=("mode"in r?r:e.ajaxSettings).mode,s=("port"in r?r:e.ajaxSettings).port;if(i==="abort"){if(t[s]){t[s].abort()}t[s]=n.apply(this,arguments);return t[s]}return n.apply(this,arguments)}}})(jQuery);(function(e){e.extend(e.fn,{validateDelegate:function(t,n,r){return this.bind(n,function(n){var i=e(n.target);if(i.is(t)){return r.apply(i,arguments)}})}})})(jQuery)
/* form validation*/



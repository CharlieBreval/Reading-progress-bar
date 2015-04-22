$.fn.readingProgressBar = function(options) {

    var defaults = {
        "scrollRatio" : 0.2,
        "bgImgWidth" : 2000,
        "viewportWidth" : 2000,
    }

    container = $(this);

    var options            = $.extend(defaults, options);
    var nav                = container.find('.bar')
    var currentBgPosition  = 0;
    var itemCollection     = [];
    var navItems           = nav.children();
    var currentId          = null;
    var scrollRatio        = options.scrollRatio;


    // INITIALIZATION
    var navItemWidth = navItems.first().width();
    var navWidth     = nav.width();
    var sideWidth    = ( options.viewportWidth - navWidth ) / 2;
    var initialPosition = ( options.bgImgWidth - sideWidth ) - ( navItemWidth / 2 );

    container.css('background-position-x', '-' + initialPosition +'px');

    navItems.each(function(idx, val) {
        var target = $(this).children('a').attr('href');
        if ($(target).length > 0) {

            itemCollection[target] = $(target).height();
            new Waypoint({
                element: document.getElementById(target.replace('#', '')),
                handler: function(direction) {
                    var navItem = navItems.find('a[href="#'+this.element.id+'"]').parent();
                    currentBgPosition = '-' + (initialPosition - navItem.index() * navItemWidth);
                    container.css('background-position-x', currentBgPosition +'px');
                    navItem.toggleClass('active');

                },
                offset: "30%",
            })
        }
    })

    // SCROLL EVENT
    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var st = $(this).scrollTop();
        ratio = (st - lastScrollTop) * scrollRatio;

        currentBgPosition = parseInt(container.css('background-position-x').replace('px', '')) + ratio;
        container.css('background-position-x', currentBgPosition +'px');
        lastScrollTop = st;
    });

    // CLIC ON A NAV LINK
    $('.bar a').smoothScroll({
        offset: -150,
        afterScroll: function() {
            // Apres le scroll, on vient correctement positionner notre curseur
            var navItem = $(this).parent();
            currentBgPosition = '-' + (initialPosition - (navItem.index() * navItemWidth));
            container.css('background-position-x', currentBgPosition +'px');
        }
    });
};
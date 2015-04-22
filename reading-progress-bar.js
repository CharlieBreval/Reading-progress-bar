$.fn.readingProgressBar = function(options) {

    var defaults = {
        "scrollRatio" : 0.2,
        "bgImgWidth" : 2000,
        "viewportWidth" : 2000,
    }

    container = $(this);

    var options            = $.extend(defaults, options);
    var nav                = container.find('nav')
    var currentBgPosition  = 0;
    var itemCollection     = [];
    var waypoints     = [];
    var navItems           = nav.children();
    var currentId          = null;
    var scrollRatio        = options.scrollRatio;
    var trackScroll        = true;


    // INITIALIZATION OF THE PLUGIN
    var navItemWidth = navItems.first().width();
    var navWidth     = nav.width();
    var sideWidth    = ( options.viewportWidth - navWidth ) / 2;
    var initialPosition = ( options.bgImgWidth - sideWidth ) - ( navItemWidth / 2 );

    container.css('background-position-x', '-' + initialPosition +'px');

    navItems.each(function(idx, val) {
        var target = $(this).children('a').attr('href');
        if ($(target).length > 0) {

            itemCollection[target] = $(target).height();
            if (!window.Waypoint) {
                window.alert('The readingProgressBar Plugin need the Waypoint library, you can download to : http://imakewebthings.com/waypoints/');
            } else {

            waypoints.push(new Waypoint({
                    element: document.getElementById(target.replace('#', '')),
                    handler: function(direction) {
                        if (trackScroll == true) {
                            var navItem = navItems.find('a[href="#'+this.element.id+'"]').parent();
                            currentBgPosition = '-' + (initialPosition - navItem.index() * navItemWidth);
                            container.css('background-position-x', currentBgPosition +'px');
                            navItem.toggleClass('active');
                        }

                    },
                    offset: "30%",
                }));
            }
        }
    })


    // SCROLL EVENT ON WINDOW
    var lastScrollTop = 0;
    $(window).scroll(function(event){
        var st        = $(this).scrollTop();
        ratio         = (st - lastScrollTop) * scrollRatio;
        lastScrollTop = st;

        if (trackScroll == true) {
            currentBgPosition = parseInt(container.css('background-position-x').replace('px', '')) + ratio;
            container.css('background-position-x', currentBgPosition +'px');
        }
    });

    // BINDING CLICK EVENT ON LINKS
    navItems.each(function(idx, val) {
        $(val).children('a').on('click', function(e) {
            trackScroll = false;
            waypoints[idx].disable();

            var section = $($(this).attr('href'));
            var navItem = $(this).parent();

            currentBgPosition = '-' + (initialPosition - (navItem.index() * navItemWidth));
            $(container).css('background-position-x', currentBgPosition +'px');

            $('html, body').animate( { scrollTop: section.offset().top }, 300, function(){
                trackScroll = true;
            });
            waypoints[idx].enable();
        })
    });
};